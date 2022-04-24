const { app, Menu, BrowserWindow } = require('electron')
const path = require('path')
const { autoUpdater } = require('electron-updater')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    useContentSize: true,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, './favicon.ico'),
    show: false
  })

  win.setMenuBarVisibility(false)

  win.loadFile('./index.html')

  autoUpdater.checkForUpdatesAndNotify()

  win.once('ready-to-show', () => {
    win.show()
  })
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
