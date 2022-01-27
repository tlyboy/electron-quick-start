const { app, BrowserWindow } = require('electron')
const path = require('path')

// app.applicationMenu = null

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Demo',
    icon: path.join(__dirname, 'src/favicon.ico'),
    show: false
  })

  win.loadFile('src/index.html')

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
