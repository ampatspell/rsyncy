/* eslint-env node */
const { app, Menu, BrowserWindow, protocol } = require('electron');
const { dirname, join, resolve } = require('path');
const protocolServe = require('electron-protocol-serve');
const menu = require('./main/menu');

protocol.registerStandardSchemes([ 'serve' ], { secure: true });
protocolServe({
  cwd: join(__dirname || resolve(dirname('')), '..', 'ember'),
  app,
  protocol,
});

let window = null;
let quit = false;

app.on('window-all-closed', () => app.quit());
app.on('activate', () => window.show());
app.on('before-quit', () => quit = true);

app.on('ready', () => {
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu));

  window = new BrowserWindow({
    width: 340,
    height: 550,
    title: ''
  });

  // window.openDevTools();

  const emberAppLocation = 'serve://dist';
  window.loadURL(emberAppLocation);

  window.webContents.on('did-fail-load', () => {
    window.loadURL(emberAppLocation);
  });

  window.webContents.on('crashed', () => {
    console.log('Your Ember app (or other code) in the main window has crashed.');
    console.log('This is a serious issue that needs to be handled and/or debugged.');
  });

  window.on('unresponsive', () => {
    console.log('Your Ember app (or other code) has made the window unresponsive.');
  });

  window.on('responsive', () => {
    console.log('The main window has become responsive again.');
  });

  window.on('close', (e) => {
    if(!quit) {
      e.preventDefault();
      window.hide();
    }
  });

  window.on('closed', () => {
    window = null;
  });
});

process.on('uncaughtException', (err) => {
  console.log('An exception in the main thread was not handled.');
  console.log('This is a serious issue that needs to be handled and/or debugged.');
  console.log(`Exception: ${err}`);
});
