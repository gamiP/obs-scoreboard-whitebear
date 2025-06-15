"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld(
  "electron",
  {
    send: (channel, data) => {
      const validChannels = ["update-game-data", "change-theme", "background-change", "change-language"];
      if (validChannels.includes(channel)) {
        electron.ipcRenderer.send(channel, data);
      }
    },
    receive: (channel, func) => {
      const validChannels = ["update-game-data", "change-theme", "background-change", "change-language"];
      if (validChannels.includes(channel)) {
        electron.ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    // Remove all listeners for a channel
    removeAllListeners: (channel) => {
      const validChannels = ["update-game-data", "change-theme", "background-change", "change-language"];
      if (validChannels.includes(channel)) {
        electron.ipcRenderer.removeAllListeners(channel);
      }
    }
  }
);
