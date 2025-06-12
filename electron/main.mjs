import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { initialGameData } from '../src/types/gameData.js';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let displayWindow;
let controlWindow;
let gameData = { ...initialGameData };
let currentTheme = 'black'; // デフォルトのテーマ
let showBackground = false;  // 背景表示の状態

const isDev = process.env.NODE_ENV === 'development';

// 勝率を計算する関数
const calculateWinRate = (wins, total) => {
  if (total === 0) return 0;
  return Math.round((wins / total) * 100);
};

const createWindows = () => {
  displayWindow = new BrowserWindow({
    width: 750,
    height: 280,
    frame: false,
    transparent: false,
    alwaysOnTop: true,
    resizable: false,
    webPreferences: {
      contextIsolation: true,
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: true
    },
  });
  displayWindow.setIgnoreMouseEvents(false);
  displayWindow.setMenuBarVisibility(false);

  controlWindow = new BrowserWindow({
    width: 400,
    height: 600,
    resizable: false,
    webPreferences: {
      contextIsolation: true,
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: true
    },
  });
  controlWindow.setMenuBarVisibility(false);  // メニューバーを完全に非表示

  // どちらかのウィンドウが閉じられたら両方のウィンドウを閉じる
  displayWindow.on('close', () => {
    if (!controlWindow.isDestroyed()) {
      controlWindow.close();
    }
  });

  controlWindow.on('close', () => {
    if (!displayWindow.isDestroyed()) {
      displayWindow.close();
    }
  });

  if (isDev) {
    displayWindow.loadURL('http://localhost:5173/display');
    controlWindow.loadURL('http://localhost:5173/control');
  } else {
    const distPath = app.isPackaged 
      ? path.join(process.resourcesPath, 'dist')
      : path.join(__dirname, '../dist');

    displayWindow.loadFile(path.join(distPath, 'index.html'), { hash: '/display' });
    controlWindow.loadFile(path.join(distPath, 'index.html'), { hash: '/control' });
  }

  // ゲームデータ更新のIPCハンドラ
  ipcMain.on('update-game-data', (event, newGameData) => {
    gameData = newGameData;
    if (displayWindow) {
      displayWindow.webContents.send('game-data-updated', gameData);
    }
  });

  // 試合結果更新のIPCハンドラ
  ipcMain.on('update-match', (event, isWin) => {
    // 勝ち＋負けの合計が試合数を超えないように制御
    const totalResults = gameData.matchResults.wins + gameData.matchResults.losses;
    if (totalResults >= gameData.matchResults.total) {
      return; // これ以上カウントしない
    }
    if (isWin) {
      gameData.matchResults.wins++;
    } else {
      gameData.matchResults.losses++;
    }
    gameData.matchResults.winRate = calculateWinRate(
      gameData.matchResults.wins,
      gameData.matchResults.total
    );
    if (displayWindow) {
      displayWindow.webContents.send('game-data-updated', gameData);
    }
    if (controlWindow) {
      controlWindow.webContents.send('game-data-updated', gameData);
    }
  });

  // 先攻後攻更新のIPCハンドラ
  ipcMain.on('update-turn', (event, isFirst) => {
    if (isFirst) {
      gameData.turnResults.first++;
    } else {
      gameData.turnResults.second++;
    }
    // 合計試合数も加算
    gameData.matchResults.total++;
    // 勝率も再計算
    gameData.matchResults.winRate = calculateWinRate(
      gameData.matchResults.wins,
      gameData.matchResults.total
    );
    if (displayWindow) {
      displayWindow.webContents.send('game-data-updated', gameData);
    }
    if (controlWindow) {
      controlWindow.webContents.send('game-data-updated', gameData);
    }
  });
};

const sendThemeToWindows = () => {
  if (displayWindow) {
    displayWindow.webContents.send('theme-changed', currentTheme);
  }
  if (controlWindow) {
    controlWindow.webContents.send('theme-changed', currentTheme);
  }
};

const sendBackgroundToWindows = () => {
  if (displayWindow) {
    displayWindow.webContents.send('background-changed', showBackground);
  }
  if (controlWindow) {
    controlWindow.webContents.send('background-changed', showBackground);
  }
};

ipcMain.on('change-theme', (event, themeName) => {
  currentTheme = themeName;
  sendThemeToWindows();
});

ipcMain.on('change-background', (event, show) => {
  showBackground = show;
  sendBackgroundToWindows();
});

app.whenReady().then(() => {
  createWindows();
  sendThemeToWindows();
  sendBackgroundToWindows();
});

app.on('window-all-closed', () => {
  // macOSでも確実に終了するように変更
  app.quit();
});

// macOSでアプリケーションがDockからクリックされた場合、
// 開かれているウィンドウがなければ再度ウィンドウを開く
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindows();
    sendThemeToWindows();
    sendBackgroundToWindows();
  }
}); 