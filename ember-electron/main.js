/* eslint-env node */
const { app, Menu, Tray, BrowserWindow, protocol, ipcMain } = require('electron');
const { dirname, join, resolve } = require('path');
const protocolServe = require('electron-protocol-serve');
const menu = require('./main/menu');

const resources = join(__dirname, 'resources')

protocol.registerStandardSchemes([ 'serve' ], { secure: true });
protocolServe({
  cwd: join(__dirname || resolve(dirname('')), '..', 'ember'),
  app,
  protocol,
});

app.dock.hide();

let window = null;
let tray = null;
let quit = false;

const showWindow = () => {
  window.show();
  window.focus();
};

const toggleWindow = () => {
  if(window.isVisible()) {
    if(!window.isFocused()) {
      window.focus();
    } else {
      window.hide();
    }
  } else {
    showWindow();
  }
};

const icon = {
  idle: join(resources, 'empty-circle.png'),
  syncing: join(resources, 'dot-circle.png')
};

app.on('window-all-closed', () => app.quit());
app.on('activate', () => showWindow());
app.on('before-quit', () => quit = true);

app.on('ready', () => {

  tray = new Tray(icon.idle);

  tray.on('right-click', () => toggleWindow());
  tray.on('double-click', () => showWindow());

  tray.on('click', e => {
    if(window.isVisible() && e.metaKey) {
      window.openDevTools();
      return;
    }
    toggleWindow();
  });

  Menu.setApplicationMenu(Menu.buildFromTemplate(menu));

  window = new BrowserWindow({
    width: 340,
    height: 550,
    show: false,
    fullscreenable: false,
    title: '',
    webPreferences: {
      backgroundThrottling: false
    }
  });

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

ipcMain.on('status-changed', (e, info) => {
  tray.setImage(info.syncing ? icon.syncing : icon.idle);
});
