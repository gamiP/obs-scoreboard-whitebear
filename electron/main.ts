import { app, BrowserWindow, ipcMain, Menu, dialog } from 'electron';
const path = require('path');
import isDev from 'electron-is-dev';

process.env.DIST = path.join(__dirname, '../dist');
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public');

let mainWindow: BrowserWindow | null = null;
let displayWindow: BrowserWindow | null = null;

function createMenu() {
  const template = [
    {
      label: 'WhiteBearPanel',
      submenu: [
        {
          label: 'About',
          click: () => {
            dialog.showMessageBox({
              type: 'info',
              title: 'About',
              message: `WhiteBearPanel\nVersion: ${app.getVersion()}`
            });
          }
        },
        {
          label: 'Quit',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Language',
      submenu: [
        {
          label: 'Control',
          submenu: [
            {
              label: '日本語',
              click: () => {
                mainWindow?.webContents.send('change-language', { type: 'control', lang: 'ja' });
              }
            },
            {
              label: 'English',
              click: () => {
                mainWindow?.webContents.send('change-language', { type: 'control', lang: 'en' });
              }
            }
          ]
        },
        {
          label: 'Display',
          submenu: [
            {
              label: '日本語',
              click: () => {
                displayWindow?.webContents.send('change-language', { type: 'display', lang: 'ja' });
              }
            },
            {
              label: 'English',
              click: () => {
                displayWindow?.webContents.send('change-language', { type: 'display', lang: 'en' });
              }
            }
          ]
        }
      ]
    },
    {
      label: 'Color',
      submenu: [
        {
          label: 'black Background',
          click: () => {
            mainWindow?.webContents.send('change-theme', 'black');
            displayWindow?.webContents.send('change-theme', 'black');
          }
        },
        {
          label: 'white Background',
          click: () => {
            mainWindow?.webContents.send('change-theme', 'white');
            displayWindow?.webContents.send('change-theme', 'white');
          }
        }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function createWindow() {
  if (mainWindow !== null) {
    return; // すでにウィンドウがある場合は何もしない
  }
  // コントロール画面の生成
  // width: 400, height: 800
  mainWindow = new BrowserWindow({
    width: 400,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true
    }
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile('dist/index.html');
  }
  mainWindow.webContents.openDevTools();
  
  // ディスプレイウィンドウの生成
  displayWindow = new BrowserWindow({
    width: 700,
    height: 300,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true
    }
  });

  if (isDev) {
    displayWindow.loadURL('http://localhost:5173#/display');
  } else {
    displayWindow.loadFile('dist/index.html', { hash: 'display' });
  }
  displayWindow.webContents.openDevTools();

  // コントロール画面を閉じたらディスプレイ画面も閉じる
  mainWindow.on('closed', () => {
    if (displayWindow && !displayWindow.isDestroyed()) {
      displayWindow.close();
    }
    displayWindow = null;
  });

  // IPC通信の設定
  ipcMain.on('update-game-data', (_, data) => {
    displayWindow?.webContents.send('update-game-data', data);
  });

  ipcMain.on('change-theme', (_, theme) => {
    displayWindow?.webContents.send('change-theme', theme);
  });

  ipcMain.on('background-change', (_, show) => {
    displayWindow?.webContents.send('background-change', show);
  });

  ipcMain.on('change-language', (_, data) => {
    displayWindow?.webContents.send('change-language', data);
  });

  // メニューを作成
  createMenu();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
}); 