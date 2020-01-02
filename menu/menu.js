const {Menu} = require('electron')
const electron = require('electron')
const app = electron.app
const is = require('electron-is')



const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)