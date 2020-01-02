const os  = require('os')
const fs = require('fs')
const mkdir = require('makedir')
const path = require("path");
const { app } = require("electron");
const csv = require('fast-csv');
const is = require('electron-is')
const gui = require('./gui')

var header;
var dataAll =[]
var dataLength = 0
var inProgress = true
module.exports={
    prepareData: function (data) {
        header = Object.keys(data[0])
        data.forEach(element => {
            inProgress = true
            dataAll.push(Object.values(element))
        });
        inProgress = false
        dataLength  = dataAll.length
        console.log(`combine data length: ${dataLength}`)
    },
    IsInProgress:()=>{
        return inProgress
    },
    getHeader: function (){
        return header;
    },
    allData: function () {
        return dataAll
    },
    clearAllData: function () {
        dataAll= []
    },
    getDataSize: ()=>{
        return dataLength
    },
    writeCSVFile: function (headerRow, dataRows) {
        var writeStream = fs.createWriteStream(getPlatformPath());
        writeStream.write(`${headerRow}\n`)
        dataRows.forEach(value => writeStream.write(`${value}\n`));
        writeStream.on('finish', () => {
            console.log(`wrote all the array data to file ${getPlatformPath()}`);
        });
        writeStream.on('error', (err) => {
            console.error(`There is an error writing the file ${getPlatformPath()} => ${err}`)
        });
        writeStream.end();
    },
    removeCSVFile: function () {
        var csvPath =  getPlatformPath();
        if (fs.existsSync(csvPath)) {
            fs.unlinkSync(csvPath);
        }
    },
    combineFilePath: function () {
        var csvPath =  getPlatformPath();
        if (fs.existsSync(csvPath)) {
            return csvPath;
        }
    }, 
    removeSessionData: function () {
        header = ''
        dataAll = []
    },
    readFileData: function (path, size, fname) {
            var cPhonesData = []
            counter = 0;
            var fid = gui.getFileID(path,fname, size)
                gui.addProgressBar(fid)
            let csvStream = csv.parseFile(path, { headers: true })
                .on("data", function (record) {
                    cPhonesData.push(record);
                    counter++
                    var progress = Math.ceil((counter / size) * 100)
                    gui.scanProgress(progress, fid)
                }).on("end", function (rowCount) {
                   updateGUI(rowCount, fname, path,fid)
                    counter = 0
                    return cPhonesData
                }).on("error", function (err) {
                    console.log(err);
                    csvStream.pause();
                });
        }
}


/**
 * 
 * @param {*} rows 
 * @param {*} fname 
 * @param {*} path 
 * @param {*} fid 
 */
function updateGUI(rows, fname, path, fid) {
    gui.removeProgressBar(fid)
    gui.appProgressComplete(rows)
    gui.addDone(fname)
    counter = 0
    readDone = true
  }


/** Utility function  */
/**
 * 
 */
function checkFileExist(){
    if (is.windows()){
        var csvPath = `${os.tmpdir()}\\G3T\\CSV\\`
    }else{
        var csvPath =`${os.tmpdir()}/G3T/CSV/`;
    }
    if (!fs.existsSync(csvPath)) {
        mkdir.makedir(csvPath, 0777);
    }
    return csvPath;
}
/**
 * 
 */
function getPlatformPath(){
    if (is.windows()){
        var csvPath = checkFileExist() + 'combine_cdrs.csv';
    }else{
        var csvPath = checkFileExist() + 'Selected_cdrs.csv';
    }
    return csvPath
}
