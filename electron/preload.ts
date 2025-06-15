import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  'electron',
  {
    send: (channel: string, data: any) => {
      // whitelist channels
      const validChannels = ['update-game-data', 'change-theme', 'background-change', 'change-language'];
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    receive: (channel: string, func: Function) => {
      const validChannels = ['update-game-data', 'change-theme', 'background-change', 'change-language'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender` 
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    // Remove all listeners for a channel
    removeAllListeners: (channel: string) => {
      const validChannels = ['update-game-data', 'change-theme', 'background-change', 'change-language'];
      if (validChannels.includes(channel)) {
        ipcRenderer.removeAllListeners(channel);
      }
    }
  }
); 