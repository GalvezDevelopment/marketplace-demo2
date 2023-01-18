const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('marketplace2', {
  username: () => ipcRenderer.invoke('username')
});
