const { app, BrowserWindow } = require('electron')
const path = require('path')
const { autoUpdater } = require('electron-updater')

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    useContentSize: true,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, './favicon.ico'),
    show: false,
    autoHideMenuBar: true
  })

  win.once('ready-to-show', () => {
    win.show()
  })

  win.loadFile('./index.html')

  autoUpdater.checkForUpdatesAndNotify()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
