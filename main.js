const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const os = require('node:os');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
  });

  ipcMain.handle('username', () => os.userInfo().username);
  win.loadURL('http://localhost:4200/');
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
});
