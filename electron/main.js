"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require('path');
process.env.DIST = path.join(__dirname, '../dist');
process.env.VITE_PUBLIC = electron_1.app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public');
var mainWindow = null;
var displayWindow = null;
function createMenu() {
    var template = [
        {
            label: 'WhiteBearPanel',
            submenu: [
                {
                    label: 'About',
                    click: function () {
                        electron_1.dialog.showMessageBox({
                            type: 'info',
                            title: 'About',
                            message: "WhiteBearPanel\nVersion: ".concat(electron_1.app.getVersion())
                        });
                    }
                },
                {
                    label: 'Quit',
                    click: function () {
                        electron_1.app.quit();
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
                            click: function () {
                                mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.webContents.send('change-language', { type: 'control', lang: 'ja' });
                            }
                        },
                        {
                            label: 'English',
                            click: function () {
                                mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.webContents.send('change-language', { type: 'control', lang: 'en' });
                            }
                        }
                    ]
                },
                {
                    label: 'Display',
                    submenu: [
                        {
                            label: '日本語',
                            click: function () {
                                displayWindow === null || displayWindow === void 0 ? void 0 : displayWindow.webContents.send('change-language', { type: 'display', lang: 'ja' });
                            }
                        },
                        {
                            label: 'English',
                            click: function () {
                                displayWindow === null || displayWindow === void 0 ? void 0 : displayWindow.webContents.send('change-language', { type: 'display', lang: 'en' });
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
                    click: function () {
                        mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.webContents.send('change-theme', 'black');
                        displayWindow === null || displayWindow === void 0 ? void 0 : displayWindow.webContents.send('change-theme', 'black');
                    }
                },
                {
                    label: 'white Background',
                    click: function () {
                        mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.webContents.send('change-theme', 'white');
                        displayWindow === null || displayWindow === void 0 ? void 0 : displayWindow.webContents.send('change-theme', 'white');
                    }
                }
            ]
        }
    ];
    var menu = electron_1.Menu.buildFromTemplate(template);
    electron_1.Menu.setApplicationMenu(menu);
}
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
var VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
function createWindow() {
    // コントロール画面の生成
    // width: 400, height: 800
    mainWindow = new electron_1.BrowserWindow({
        width: 400,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true
        }
    });
    if (VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(VITE_DEV_SERVER_URL);
    }
    else {
        mainWindow.loadFile('dist/index.html');
    }
    mainWindow.webContents.openDevTools();
    // ディスプレイウィンドウの生成
    // width: 700, height: 400
    displayWindow = new electron_1.BrowserWindow({
        width: 700,
        height: 300,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true
        }
    });
    if (VITE_DEV_SERVER_URL) {
        displayWindow.loadURL("".concat(VITE_DEV_SERVER_URL, "#/display"));
    }
    else {
        displayWindow.loadFile('dist/index.html', { hash: 'display' });
    }
    displayWindow.webContents.openDevTools();
    // コントロール画面を閉じたらディスプレイ画面も閉じる
    mainWindow.on('closed', function () {
        if (displayWindow && !displayWindow.isDestroyed()) {
            displayWindow.close();
        }
        displayWindow = null;
    });
    // IPC通信の設定
    electron_1.ipcMain.on('update-game-data', function (_, data) {
        displayWindow === null || displayWindow === void 0 ? void 0 : displayWindow.webContents.send('update-game-data', data);
    });
    electron_1.ipcMain.on('change-theme', function (_, theme) {
        displayWindow === null || displayWindow === void 0 ? void 0 : displayWindow.webContents.send('change-theme', theme);
    });
    electron_1.ipcMain.on('background-change', function (_, show) {
        displayWindow === null || displayWindow === void 0 ? void 0 : displayWindow.webContents.send('background-change', show);
    });
    electron_1.ipcMain.on('change-language', function (_, data) {
        displayWindow === null || displayWindow === void 0 ? void 0 : displayWindow.webContents.send('change-language', data);
    });
    // メニューを作成
    createMenu();
}
electron_1.app.whenReady().then(createWindow);
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
