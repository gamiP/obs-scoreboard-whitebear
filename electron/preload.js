const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // ゲームデータの送信
  sendGameData: (gameData) => ipcRenderer.send('update-game-data', gameData),
  // ゲームデータの更新を受け取る
  onGameDataUpdate: (callback) => ipcRenderer.on('game-data-updated', (event, gameData) => callback(gameData)),
  // 試合結果を更新
  updateMatchResult: (isWin) => ipcRenderer.send('update-match', isWin),
  // 先攻後攻を更新
  updateTurnResult: (isFirst) => ipcRenderer.send('update-turn', isFirst),
  // テーマ切り替え
  changeTheme: (themeName) => ipcRenderer.send('change-theme', themeName),
  onThemeChanged: (callback) => ipcRenderer.on('theme-changed', (event, themeName) => callback(themeName)),
  // 背景切り替え
  changeBackground: (show) => ipcRenderer.send('change-background', show),
  onBackgroundChanged: (callback) => ipcRenderer.on('background-changed', (event, show) => callback(show)),
});
