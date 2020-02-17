import { app, BrowserWindow, globalShortcut, ipcMain } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 800,
    width: 1280,
    useContentSize: true,
    show: false,
    // transparent: true,
    frame: false
  })

  mainWindow.loadURL(winURL)

  globalShortcut.register('CmdOrCtrl+Shift+d', () => {
    mainWindow.webContents.toggleDevTools()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('Closing', e => mainWindow.close())

ipcMain.on('Screenfull', function(event, arg) {
  // console.log(event, arg)
  switch (arg) {
    case 'toggle':
      mainWindow.setFullScreen(!mainWindow.isFullScreen())
      event.sender.send('Screenfull', mainWindow.isFullScreen())
      break
    case 'isfull':
      event.sender.send('Screenfull', mainWindow.isFullScreen())
      break
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
*/

// const log4js = require('log4js')
// log4js.configure({
//   appenders: { ports: { type: 'file', filename: './ports.log' }, console: { type: 'console' }},
//   // categories: { default: { appenders: ['ports'], level: 'debug' }}
//   categories: { default: { appenders: ['console'], level: 'debug' }}
// })
// require('./port')
