module.exports = function() {

  const defaultMenu = require('electron-default-menu');
  const { app, shell } = require('electron');

  let menu = defaultMenu(app, shell);

  if(process.platform === 'darwin') {
    menu[0].submenu[5].accelerator = 'Alt+Command+H';
    menu[3].submenu.splice(1, 1);
  }

  return menu;
}();
