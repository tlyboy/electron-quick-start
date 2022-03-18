const { app, Menu, BrowserWindow, globalShortcut } = require('electron')
const path = require('path')
const { autoUpdater } = require('electron-updater')

function createWindow() {
  Menu.setApplicationMenu(null)

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, './favicon.ico'),
    show: false
  })

  win.loadFile('./index.html')

  autoUpdater.checkForUpdatesAndNotify()

  win.once('ready-to-show', () => {
    win.show()
  })

  globalShortcut.register('F11', () => {
    if (!win.isFullScreen()) {
      win.setFullScreen(true)
    } else {
      win.setFullScreen(false)
    }
  })

  globalShortcut.register('ESC', () => {
    if (win.isFullScreen()) {
      win.setFullScreen(false)
    }
  })

  const contents = win.webContents

  globalShortcut.register('CommandOrControl+Shift+I', () => {
    contents.toggleDevTools()
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
