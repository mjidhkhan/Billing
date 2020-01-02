const {app,ipcMain, dialog} = require('electron')

ipcMain.on('open-file-dialog', (event) => {

  const files = dialog.showOpenDialog({
    filters: [
        { name: 'CSV', extensions: ['csv'] }
    ],
    properties: ['openFile','multiSelections']
}, function(files) {

    if (files) {
        event.sender.send('selected-file', files)
    }
})

})

ipcMain.on('show-save-dialog', (event) => {
    const options = {
        title: 'Save combine CDR as CSV',
        defaultPath: app.getAppPath('documents')
    }
    dialog.showSaveDialog(null, options, (path) => {
        event.sender.send('selected-path',path)
    })
})
