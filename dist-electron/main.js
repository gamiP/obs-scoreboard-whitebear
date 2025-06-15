"use strict";
const electron = require("electron");
const path = require("path");
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = electron.app.isPackaged ? process.env.DIST : path.join(process.env.DIST, "../public");
let mainWindow = null;
let displayWindow = null;
function createMenu() {
  const template = [
    {
      label: "WhiteBearPanel",
      submenu: [
        {
          label: "About",
          click: () => {
            electron.dialog.showMessageBox({
              type: "info",
              title: "About",
              message: `WhiteBearPanel
Version: ${electron.app.getVersion()}`
            });
          }
        },
        {
          label: "Quit",
          click: () => {
            electron.app.quit();
          }
        }
      ]
    },
    {
      label: "Language",
      submenu: [
        {
          label: "Control",
          submenu: [
            {
              label: "日本語",
              click: () => {
                mainWindow == null ? void 0 : mainWindow.webContents.send("change-language", { type: "control", lang: "ja" });
              }
            },
            {
              label: "English",
              click: () => {
                mainWindow == null ? void 0 : mainWindow.webContents.send("change-language", { type: "control", lang: "en" });
              }
            }
          ]
        },
        {
          label: "Display",
          submenu: [
            {
              label: "日本語",
              click: () => {
                displayWindow == null ? void 0 : displayWindow.webContents.send("change-language", { type: "display", lang: "ja" });
              }
            },
            {
              label: "English",
              click: () => {
                displayWindow == null ? void 0 : displayWindow.webContents.send("change-language", { type: "display", lang: "en" });
              }
            }
          ]
        }
      ]
    },
    {
      label: "Color",
      submenu: [
        {
          label: "black Background",
          click: () => {
            mainWindow == null ? void 0 : mainWindow.webContents.send("change-theme", "black");
            displayWindow == null ? void 0 : displayWindow.webContents.send("change-theme", "black");
          }
        },
        {
          label: "white Background",
          click: () => {
            mainWindow == null ? void 0 : mainWindow.webContents.send("change-theme", "white");
            displayWindow == null ? void 0 : displayWindow.webContents.send("change-theme", "white");
          }
        }
      ]
    }
  ];
  const menu = electron.Menu.buildFromTemplate(template);
  electron.Menu.setApplicationMenu(menu);
}
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
function createWindow() {
  mainWindow = new electron.BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: false
    }
  });
  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile("dist/index.html");
  }
  displayWindow = new electron.BrowserWindow({
    width: 700,
    height: 400,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: false
    }
  });
  if (VITE_DEV_SERVER_URL) {
    displayWindow.loadURL(`${VITE_DEV_SERVER_URL}#/display`);
  } else {
    displayWindow.loadFile("dist/index.html", { hash: "display" });
  }
  mainWindow.on("closed", () => {
    if (displayWindow && !displayWindow.isDestroyed()) {
      displayWindow.close();
    }
    displayWindow = null;
  });
  electron.ipcMain.on("update-game-data", (_, data) => {
    displayWindow == null ? void 0 : displayWindow.webContents.send("update-game-data", data);
  });
  electron.ipcMain.on("change-theme", (_, theme) => {
    displayWindow == null ? void 0 : displayWindow.webContents.send("change-theme", theme);
  });
  electron.ipcMain.on("background-change", (_, show) => {
    displayWindow == null ? void 0 : displayWindow.webContents.send("background-change", show);
  });
  electron.ipcMain.on("change-language", (_, data) => {
    displayWindow == null ? void 0 : displayWindow.webContents.send("change-language", data);
  });
  createMenu();
}
electron.app.whenReady().then(createWindow);
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.app.on("activate", () => {
  if (electron.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
