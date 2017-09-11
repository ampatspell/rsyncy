/* eslint-env node */
const { app, BrowserWindow, protocol } = require('electron');
const { dirname, join, resolve } = require('path');
const protocolServe = require('electron-protocol-serve');

let mainWindow = null;

protocol.registerStandardSchemes([ 'serve' ], { secure: true });
protocolServe({
  cwd: join(__dirname || resolve(dirname('')), '..', 'ember'),
  app,
  protocol,
});

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 340,
    height: 525,
    title: ''
  });

  // mainWindow.openDevTools();

  const emberAppLocation = 'serve://dist';
  mainWindow.loadURL(emberAppLocation);

  mainWindow.webContents.on('did-fail-load', () => {
    mainWindow.loadURL(emberAppLocation);
  });

  mainWindow.webContents.on('crashed', () => {
    console.log('Your Ember app (or other code) in the main window has crashed.');
    console.log('This is a serious issue that needs to be handled and/or debugged.');
  });

  mainWindow.on('unresponsive', () => {
    console.log('Your Ember app (or other code) has made the window unresponsive.');
  });

  mainWindow.on('responsive', () => {
    console.log('The main window has become responsive again.');
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

process.on('uncaughtException', (err) => {
  console.log('An exception in the main thread was not handled.');
  console.log('This is a serious issue that needs to be handled and/or debugged.');
  console.log(`Exception: ${err}`);
});
