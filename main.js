const path = require("path");
const glob = require("glob");
const {  app, BrowserWindow,ipcMain,shell, dialog , Menu, Tray} = require("electron");
const electron = require('electron')
const os  = require('os')
const fs = require('fs')
const launchSettings = require('electron-settings');
const storage = require('electron-json-storage');
const windowStateKeeper = require('electron-window-state');
const mkdir = require('makedir');
const url = require('url')
const is = require('electron-is')
//const isDev = require('electron-is-dev');

const autoUpdater = require("./auto-updater");

//const debug = /--debug/.test(process.argv[2]);

if (process.mas) app.setName("G3T Billing");


let mainWindow, workerWindow, fullBillWindow 

function initialize() {
    const gotTheLock = app.requestSingleInstanceLock();
    if (!gotTheLock) {
        app.quit();
    } else {
        app.on('second-instance', (event, commandLine, workingDirectory) => {
            // Someone tried to run a second instance, we should focus our window.
            if (mainWindow) {
                if (mainWindow.isMinimized()) mainWindow.restore();
                mainWindow.focus();
            }
    });
    }
    loadDemos();
    var icon = null;
    if(is.osx()){
        icon = 'assets/app-icon/mac/g3t.icns'
        var style = 'hidden'
    } else if (is.windows()) {
        icon = 'assets/app-icon/win/g3t.ico'
        var style = 'hiddenInset'

    }

    function createWindow() {
        const windowOptions = {
           titleBarStyle: style,
           frame:false,
            minwidth: 1160,
            height: 840,
            width:1160,
            show: false,
            title: app.getName(),
            icon: path.join(__dirname, icon),
            webPreferences: {
                nodeIntegration: true
            }
        };
        //mainWindow = new BrowserWindow(windowOptions);
        let mainWindowState = windowStateKeeper({
            windowOptions
        });
        mainWindow = new BrowserWindow({
            'x': mainWindowState.x,
            'y': mainWindowState.y,
            'width': mainWindowState.width,
            'height': mainWindowState.height,
            webPreferences: {
                nodeIntegration: true
            },
            titleBarStyle: style,
            frame:false
        })
        mainWindowState.manage(mainWindow);
      
        
        mainWindow.loadURL(path.join("file://", __dirname, "/index.html"));
        if(is.windows()){
            const tray = new Tray(path.join(__dirname, icon))
            const contextMenu = Menu.buildFromTemplate([
                { label: 'Quit', click() {
                        app.quit();
                        tray.destroy()
                    } 
                },
            
            ])
            tray.setToolTip('G3T Billing App')
            tray.setContextMenu(contextMenu)

            tray.on('click', () => {
                mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
            })
            mainWindow.on('show', () => {
                tray.setHighlightMode('always')
            })
            mainWindow.on('hide', () => {
                tray.setHighlightMode('never')
            })
        }

        
        //if (debug) {
           // mainWindow.webContents.openDevTools();
           // mainWindow.maximize();
           // require("devtron").install();
       // }

        mainWindow.on("closed", () => {
            mainWindowState.manage(mainWindow);
            mainWindow = null;
            if(is.windows){
                app.quit();
            }
        });
        

        

        mainWindow.once('ready-to-show', () => {
           // mainWindow.setSize(460, 660, true);
            //autoUpdater.checkForUpdates();
            console.log('ready to show');
            mainWindow.show();
            /*
                var autolaunchset = storage.get('autolaunch');
                storage.has('autolaunch', function(error, hasKey) {
                    if (error) throw error;
    
                    if (hasKey) {
                        autolaunchset = storage.get('autolaunch');
                        storage.get('autolaunch', function(error, data) {
                            if (error) throw error;
                            //console.log(data.autolaunch);
                            if (data.autolaunch === 'N' || typeof data.autolaunch === 'undefined') {
                                setTimeout(getAutoLaunhSettings, 100);
                            }
                        });
                    } else {
                        storage.set('autolaunch', { autolaunch: 'N' }, function(error) {
                            if (error) throw error;
                        });
                    }
                });
                */
            
        });
       
        // worker Window
        workerWindow = new BrowserWindow({ show: false,
            frame:true,
            webPreferences: {
                nodeIntegration: true
            }
         });
        workerWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'sections/worker.html'),
            protocol: 'file:',
            slashes: true
        }));
        workerWindow.on("closed", () => {
            //mainWindowState.manage(mainWindow);
            workerWindow = null;
        });


        // full bill Window
        fullBillWindow = new BrowserWindow({ show: false,
            frame:true,
            webPreferences: {
                nodeIntegration: true
            }
         });
         fullBillWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'sections/full.html'),
            protocol: 'file:',
            slashes: true
        }));
        fullBillWindow.on("closed", () => {
            //mainWindowState.manage(mainWindow);
            fullBillWindow = null;
        });
    



    }

    
    
    app.on("ready", () => {
        createWindow();
        
       // autoUpdater.initialize();

         //createWindow();
        // require('./menu/menu')

        
       const menu = Menu.buildFromTemplate(template)
        Menu.setApplicationMenu(menu)
        
    });
   

    app.on("window-all-closed", () => {
        if (is.windows()) {
            app.quit();
        }
    });

    app.on("activate", () => {
        if (mainWindow === null) {
            createWindow();
        }
    });
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance() {
    if (process.mas) return false;

    return app.makeSingleInstance(() => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });
}

// Require each JS file in the main-process dir
function loadDemos() {
    const files = glob.sync(path.join(__dirname, "main-process/**/*.js"));
    files.forEach(file => {
        require(file);
    });
    //autoUpdater.updateMenu();

  
}

// Handle Squirrel on Windows startup events

switch (process.argv[1]) {
    case "--squirrel-install":
        autoUpdater.createShortcut(() => {
            app.quit();
        });
        break;
    case "--squirrel-uninstall":
        autoUpdater.removeShortcut(() => {
            app.quit();
        });
        break;
    case "--squirrel-obsolete":
    case "--squirrel-updated":
        app.quit();
        break;
    default:
        initialize();
}



ipcMain.on('print-to-pdf', function(event, filename){
    uuid = new Date().getTime().toString();
    var file = filename //+ '-'+uuid
   
    const savePath = path.join(`${app.getPath('documents')}/G3TBills-PDF`,'/'); // Database  Path
    if (!fs.existsSync(savePath)) {
        mkdir.makedir(savePath, 0777);
        console.log('creating directory')
    }else{
        console.log('directory exists')
    }
    
    //return
    //const pdfPath = path.join(os.tmpdir(), file+'.pdf')
    const pdfPath = savePath+file+'.pdf'
    const win = BrowserWindow.fromWebContents(event.sender)
    console.log(pdfPath)

    win.webContents.printToPDF({}, function(err, data){
        if(err) return console.log(err.message)
        console.log(err)
        console.log(data.toString())

    
        
        dialog.showSaveDialog({
            title: 'Save file...',
            defaultPath: pdfPath,
            buttonLabel: 'Save',
            filters:[{name: 'PDF' ,
                     extensions:['pdf']
                    }]
        }, (pdfPath)=>{ // dialog
            fs.writeFile(pdfPath, data, function(error){
                if(error) return console.log(error.message)
               
                shell.openExternal('file://'+ pdfPath)
            }) // fs.write
            event.sender.send('wrote-pdf',pdfPath)
        })//  dialog
       
    }) // win

    
}) 



// PrintPDF
ipcMain.on('printPDF', (event,content) => {
    console.log('PrintPDF')
    workerWindow.webContents.send('printPDF', content);
  });

  ipcMain.on('readyToPrintPDF', (event, filename) => {
   
   var svpath = savePath(filename)

    console.log('ONE: '+ svpath )
    
    workerWindow.webContents.printToPDF({}, function (err, data) {
        if(err) return console.log(err.message)
        console.log(err)
        dialog.showSaveDialog({
            title: 'Save file...',
            defaultPath: svpath,
            buttonLabel: 'Save',
            filters:[{name: 'PDF' ,
                     extensions:['pdf']
                    }]
        }, (svpath)=>{ // dialog
            fs.writeFile(svpath, data, function(error){
                if(error) return console.log(error.message)
               
                shell.openExternal('file://'+ svpath)
            }) // fs.write
            //event.sender.send('wrote-pdf',pdfPath)
        })//  dialog
       
    }) // win
    
  });

  // ********************  Full bill in pdf format ******************************* /

  ipcMain.on('savePDF', (event,content) => {
    console.log('savePDF')
    fullBillWindow.webContents.send('savePDF', content);
  });

  ipcMain.on('readyToSavePDF', (event, filename) => {
   
   var svpath = savePath(filename)

    console.log('ONE: '+ svpath )
    
    fullBillWindow.webContents.printToPDF({}, function (err, data) {
        if(err) return console.log(err.message)
        console.log(err)
        dialog.showSaveDialog({
            title: 'Save file...',
            defaultPath: svpath,
            buttonLabel: 'Save',
            filters:[{name: 'PDF' ,
                     extensions:['pdf']
                    }]
        }, (svpath)=>{ // dialog
            fs.writeFile(svpath, data, function(error){
                if(error) return console.log(error.message)
               
                shell.openExternal('file://'+ svpath)
            }) // fs.write
            //event.sender.send('wrote-pdf',pdfPath)
        })//  dialog
       
    }) // win
    
  });

  /** ************************************************************************** */

  function savePath(filename){
    uuid = new Date().getTime().toString();
      var file = filename + '-'+uuid
     
      const savePath = path.join(`${app.getPath('documents')}/G3TBills-PDF`,'/'); // Database  Path
      if (!fs.existsSync(savePath)) {
          mkdir.makedir(savePath, 0777);
          console.log('creating directory')
      }else{
          console.log('directory exists')
      }
      
      //return
      //const pdfPath = path.join(os.tmpdir(), file+'.pdf')
      return savePath+file+'.pdf'
  }

  function pdfSettings() {
    var paperSizeArray = ["A4", "A5"];
    var option = {
        landscape: false,
        marginsType: 0,
        printBackground: false,
        printSelectionOnly: false,
        pageSize: paperSizeArray[settingCache.getPrintPaperSize()-1],
    };
  return option;
}


  /********************************  APPASETTINGS *******************************/

function getAutoLaunhSettings() {
    dialog.showMessageBox(
        mainWindow, {
            type: 'question',
            buttons: ['Yes', 'No'],
            defaultId: 0,
            title: app.getName(),
            message: `Would you like ${app.getName()} to launch automatically at login?`,
            detail: is.osx() ?
                `You can change your mind later by going to: \n[Menu -> ${app.getName()} -> Launch at Login]` : 'You can change your mind later by going to: \n[Menu -> Help -> Launch at Login]'
        },
        (response) => {
            //console.log(response);
            const openAtLogin = response === 0;
            if (response === 0) {
                storage.set('autolaunch', { autolaunch: 'Y' }, function(error) {
                    if (error) throw error;
                });
            } else {
                storage.set('autolaunch', { autolaunch: 'N' }, function(error) {
                    if (error) throw error;
                });
            }
            app.setLoginItemSettings({
                openAtLogin,
                openAsHidden: false
            });
        }
    );
}



/* *************** TOP BAR MENU ************************ */

let template = [
    {
        label: app.getName(),
        submenu: [{
                label: `About`, //${ app.getName()}`,
               
                
                click() {
                    dialog.showMessageBox(
                    mainWindow, {
                        type: 'info',
                        buttons: ['close'],
                        defaultId: 0,
                        title: app.getName(),
                       // message: `${app.getName()}`,
                        message: `Version: ${app.getVersion()}  \n\rA simple and easy to use utility to calculate billing from CSV files.\n\r \n\rGroup 3 Technology Limited [${"\251"} 2019- 2023 ]`
                    })
                }
            },
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click() {
                   test();
                }
            },
            {
                label: 'Toggle Full Screen',
                accelerator: (function() {
                    if (is.osx()) {
                        return 'Ctrl+Command+F';
                    } else {
                        return 'F11';
                    }
                })(),
                click: function(item, focusedWindow) {
                   // console.log(item)
                    if (focusedWindow) {
                        focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
                    }
                }
            },
            {
                label: 'Quit',
                accelerator: is.osx() ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    },
    
    {
        type: 'separator'
    },

   
];

function test(){
    mainWindow.reload();
}

function addUpdateMenuItems(items, position) {
    if (process.mas) return;

    const version = electron.app.getVersion();
    let updateItems = [{
            label: `Version ${version}`,
            enabled: false
        },
        {
            type: 'separator'
        },
        {
            label: 'Launch at Login',
            type: 'checkbox',
            checked: app.getLoginItemSettings().openAtLogin,
            click: (menuItem) => {
                app.setLoginItemSettings({
                    openAtLogin: menuItem.checked,
                    openAsHidden: false
                });
                if (menuItem.checked) {
                    storage.set('autolaunch', { autolaunch: 'Y' }, function(error) {
                        if (error) throw error;
                    });
                } else {
                    storage.set('autolaunch', { autolaunch: 'N' }, function(error) {
                        if (error) throw error;
                    });
                }
            }
        }
    ];

    items.splice.apply(items, [position, 0].concat(updateItems));
}

function findReopenMenuItem() {
    const menu = Menu.getApplicationMenu();
    if (!menu) return;

    let reopenMenuItem;
    menu.items.forEach(function(item) {
        if (item.submenu) {
            item.submenu.items.forEach(function(item) {
                if (item.key === 'reopenMenuItem') {
                    reopenMenuItem = item;
                }
            });
        }
    });
    return reopenMenuItem;
}



if (is.windows()) {
    
    const helpMenu = template[template.length - 1].submenu;
    addUpdateMenuItems(helpMenu, 0);
}