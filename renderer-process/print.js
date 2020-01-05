const os = require("os");
const electron = require("electron");
const ipc = electron.ipcMain;
const shell = electron.shell;

module.exports = {
  printToPdf: name => {
    console.log("opopop" + name);
  }
};
