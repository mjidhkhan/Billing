const {ipcRenderer } = require('electron')
const fs = require('fs');
const Swal = require('sweetalert2')
const $ = require("jquery");
const Promise = require('promise');

// app modules
const csv = require('fast-csv');
const gui = require('./gui')
const appUtils = require('./apputils')
const data = require('./data')
const theme = require('./themes')

const writeCsv = require('./write_csv')
const notify = require('./notification')

/** Buttons for App */
//const selectCSV = document.getElementById('browsBtn')

var filePath
var fileList = []
var localList=[]
var tempList=[]
var state = false
var size
var isReading = false
var btnClickedID = null
var printableFileName = null

var titlebarColor = null
var themeColor = null


gui.appStart()
gui.hideScannedFiles();
gui.showInformationArea();

//gui.getAllCssClasses()


document.body.addEventListener('click', (event) => {
 
  if(event.target.classList.contains('browsButton')){
   // console.log(event.target.id)
    BrowseForFiles()
  }
  if(event.target.id.includes('BTN-')){
   // console.log(event.target.id)
    scanfile(event.target.id, fileList)
  }
  if(event.target.classList.contains('all')){
   // console.log(event.target.id)
    runButtonClick(event.target.id) 
  }
  if(event.target.classList.contains('pdf-btn')){
    //console.log(event.target.id)
    createPDF(event.target.id) 
  }
  if(event.target.classList.contains('combine')){
    writeCsv.clearAllData()
    console.log(event.target.id)
    isReading =true
    combineCsvFiles(fileList)
    //gui.combineAction()

  }
  if(event.target.classList.contains('clear-combine')){
    console.log(event.target.id)
    ClearAll()
    gui.appStart()
   
  }
  if (event.target.classList.contains('default-contrast')) {
    var classes = event.target.className
    var color = classes.split(" ");
    themeColor =color[4]
    console.log(themeColor)
    theme.setThemeColor(themeColor, 'Theme')
    // Apply button 
    gui.showThemeApplyResetButton()
    var themeApplyBtn = document.getElementById('theme-apply-btn')
    themeApplyBtn.disabled = false
   
  }
  if (event.target.classList.contains('dark-contrast')) {
    var classes = event.target.className
    var color = classes.split(" ");
    var themeMode =color[5]
    console.log(themeMode)
    theme.setDarkMode(themeMode, 'Contrast')
  }
  if (event.target.classList.contains('light-contrast')) {
    var classes = event.target.className
    var color = classes.split(" ");
    var themeMode = color[5]
    console.log(themeMode)
    theme.setLightMode(themeMode, 'Contrast')
    
  }
  //titlebar color selection
  if (event.target.classList.contains('TitleBar-contrast')) {
    var classes = event.target.className
    var color = classes.split(" ");
    titlebarColor =color[4]
    console.log(titlebarColor)
    theme.setTitleBarColor(titlebarColor)
    gui.showTitlebarApplyResetButton()
    var titlebarApplyBtn = document.getElementById('titlebar-apply-btn')
    titlebarApplyBtn.disabled = false
  }
  //titlebar Apply button selection
  if (event.target.classList.contains('titlebar-apply-btn')) {
    theme.setAsDefaultTitleBar(titlebarColor)
    var titlebarApplyBtn = document.getElementById('titlebar-apply-btn')
    titlebarApplyBtn.disabled = true
    notitype = 'Success'
    message = 'TitleBar theme applied successfully.'
    closeButton = false
    distance = '109px'
    timeout = 5000
    aminie = 'from-right'
    bg = themeColor
    notify.generalNotification(notitype, message, closeButton, distance, timeout, aminie, bg)
    
  }
  //titlebar Reset button selection
  if (event.target.classList.contains('titlebar-reset-btn')) {
    titlebarColor ='blueGrey' // Default Color
    theme.resetTitleBar(titlebarColor)
    gui.hideTitlebarApplyResetButton()
    notitype = 'Success'
    message = 'TitleBar Reset  successfully.'
    closeButton = false
    distance = '109px'
    timeout = 5000
    aminie = 'from-left'
    bg = themeColor
    notify.generalNotification(notitype, message, closeButton, distance, timeout, aminie, bg)
    
  }
  //theme Apply button selection
  if (event.target.classList.contains('theme-apply-btn')) {
    var btn = document.getElementById(event.target.id)
   //'from-top', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
    btn.disabled = true
    console.log(themeColor)
    theme.setAsDefaultTheme(themeColor)
    notitype = 'Success'
    message = 'Theme applied successfully.'
    closeButton = false
    distance = '109px'
    timeout = 5000
    aminie = 'from-right'
    bg = themeColor
    notify.generalNotification(notitype, message, closeButton, distance, timeout, aminie, bg)

  }
  //theme Reset button selection
  if (event.target.classList.contains('theme-reset-btn')) {
    
    themeColor ='blue-grey' // Default Color
    theme.resetTheme(themeColor)
    gui.hideThemeApplyResetButton()
    //btn.disabled = true
    console.log(themeColor)
    theme.setAsDefaultTheme(themeColor)
    notitype = 'Success'
    message = 'Theme Reset successfully.'
    closeButton = false
    distance = '109px'
    timeout = 5000
    aminie = 'from-left'
    bg = themeColor
    notify.generalNotification(notitype, message, closeButton, distance, timeout, aminie, bg)
   
  }
  
})

/**
 * 
 */
function BrowseForFiles(){
  gui.appStart()
  ipcRenderer.send('open-file-dialog')
}




/**
 * 
 * @param {*} id 
 * @param {*} list 
 */
function scanfile(id, list) {
  var split_id = id.split('-')
  btnClickedID = split_id[1]
  var element = list.filter(function(elementById){
    return elementById.id == split_id[1]
  })

 printableFileName = element[0].name
 ReadFile(element[0].fullpath, element[0].size, element[0].name);
 gui.displayFileName(element[0].fullpath)

}


/**
 * IPC open file dialog Response 
 */
ipcRenderer.on('selected-file', (event, files) => {
  if (files.length == 0) {
    Swal.fire({
      type: 'error',
      title: 'Whoops!...',
      text: 'You did not select any file',
      footer: ''
    })
    showBasicButtons()
    return
  }
  addToList(files)
  
  gui.hideSummaryData()
})

function addToList (files){
  files.forEach(element => {
    filePath = appUtils.showFile(element);
    console.log(filePath)
    addFilesToList(filePath)
  });
}


function showBasicButtons(){
  if(fileList.length >=2){
    gui.showCombineButton()
  }
  if(fileList.length >=1){
    gui.showClearButton()
  }
}
/*
  setTimeout(() => {
    //scanButton.click();
  }, 500)
  */
/**
 * 
 * @param {*} filepath 
 */
function addFilesToList(filepath=null) {
  var fp = filepath.toString();
  fileBuffer = fs.readFileSync(fp);
  size = fileBuffer.toString().split("\n").length - 2;
  var filename = appUtils.getFileName(fp)
  gui.scanning()
  localList.push({
    id: gui.getFileID(fp,filename, size),
    name: filename,
    fullpath: fp,
    size: size
   
  })
  fileList = appUtils.generateUniqueList(localList)
  console.log(fileList)
  gui.showScannedFiles(fileList)
  gui.hideInformationArea();
  showBasicButtons()
}


/**
 * 
 * @param {*} fileList 
 */
function combineCsvFiles(fileList){
  console.log(fileList)
   gui.appStart()
   filePath = writeCsv.combineFilePath()
   
   fileList.forEach(element => {
     tempList.push(element)
   })
  
   console.log(tempList)
   $('.table tr').find('th:last-child, td:last-child').hide()
   isReading = true;
   const readInterval = setInterval(() => {
       if (tempList.length > 0) {
        var fpath = tempList[0].fullpath
        var fname = appUtils.getFileName(fpath)
        var size = tempList[0].size
       }
     if (isReading) {
      console.log(tempList)
      if (tempList.length > 0) {
        console.log(isReading)
        var scanButton = document.getElementById(`BTN-${tempList[0].id}`)
        scanButton.click();
        scanButton.disabled = true
      }
     //  tempList.shift()
       if (tempList.length == 0 && isReading) {
        console.log('All Done');
        console.log(isReading)
         clearInterval(readInterval)
       }
     }
   }, 2000);

   // wait for 5 second to comlete previous action
   const progressIntervel = setInterval(() => {
    var isInProgress = writeCsv.IsInProgress()
    if (tempList.length == 0) {
      if(!isInProgress){
        console.log('clearing: progress interval')
        clearInterval(progressIntervel)
        loadCombineCsvFile()
      }
    }
  }, 5000);

 }
 
 
/**
 * 
 */
function loadCombineCsvFile() {
  
  var header = writeCsv.getHeader()
  var data = writeCsv.allData()
  //ipcRenderer.send('show-save-dialog')

  //ipcRenderer.on('selected-path', (event, path) => {
 //   console.log(path)
  
//})



  writeCsv.writeCSVFile(header, data)
  var path = new Array(writeCsv.combineFilePath())
  var size = data.length
  var fname = appUtils.getFileName(path)
  resetDataAndLists()
  createNotification(path, fname, size)

}

/**
 * 
 * @param {*} path 
 * @param {*} fname 
 * @param {*} size 
 */
function createNotification(path,fname, size){
 
  Swal.fire({
    title: fname,
    text: "Created successfully with total "+ size +' record.',
    type: 'success',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Scan file',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true,
    allowOutsideClick: false,
  }).then((result) => {
    if (result.value) {
      gui.hideScannedFiles()
      gui.appStart()
      addToList(path)
      var scanButton = document.getElementById(`BTN-${fileList[0].id}`)
      scanButton.click();
      scanButton.disabled = true
      $('.table tr').find('th:last-child, td:last-child').hide()
     // scanButton.style.visibility = 'hidden'
    }else if(
      result.dismiss === Swal.DismissReason.cancel
    ){
      Swal.fire({
        'title': 'Cancelled',
       'text': 'You need to reload all files and scan again',
        'type':'error',
        allowOutsideClick: false,
      }).then((result)=>{
        ClearAll()
        gui.appStart()
      })
    }
    
  })
}
/**
 * 
 */
function ClearAll(){
  writeCsv.clearAllData()
  gui.hideScannedFiles()
  gui.hideSummaryData()
  resetDataAndLists()
}
/**
 * 
 */
function resetDataAndLists() {
  fileList = []
  localList = []
  dataAll = []
}

/**
 *  Parsing CVS file and store values in Array
 * @param {*} path 
 * @param {*} size 
 */
function ReadFile(path, size, fname) {
  console.log(`Reading: ${fname}`)

  // generate notofication

    notitype = 'Info'
    message = 'Scanning ' + fname
    aminie = 'from-bottom'
    
    
    notify.fileScanNotification(notitype, message, aminie)


  isReading = false;
  phonesData = []
  counter = 0;
  var fid = gui.getFileID(path,fname, size)
    gui.addProgressBar(fid)
  let csvStream = csv.parseFile(path, { headers: true })
    .on("data", function (record) {
      phonesData.push(record);
      counter++
      var progress = Math.ceil((counter / size) * 100)
     gui.scanProgress(progress, fid)
    }).on("end", function (rowCount) {
      console.log(`Reading Done: ${fname}`)
      console.log(`isReading: ${isReading}`)
      tempList.shift()

      gui.scanProgress(0, fid)
      updateGUI(rowCount, fname, path,fid)
      writeCsv.prepareData(phonesData)
     
      notitype = 'Success'
      message = 'Scanning  Complete ' + fname
      aminie = 'from-top'
      notify.fileScanNotification(notitype, message, aminie)
    }).on("error", function (err) {
      console.log(err);
      csvStream.pause();
      
      notitype = 'Danger'
      message = 'Scanning Error ' + fname
      aminie = 'zoom'
      notify.fileScanNotification(notitype, message, aminie)
    });
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
  isReading = true
}






/**
 * Information dialog for 1XX numbers
 */
function infoDialog() {
  Swal.fire({
    type: 'info',
    title: 'Whoops!...',
    text: 'Work in progress...',
    footer: ''
  })
}


/**
 * Switch Actions for Calculate Billing
 * @param {*} id 
 */
function runButtonClick(id) {
  console.log(id)
  
  switch (id) {
    case 'button_01':
      appUtils.runIndividual('UK LandLine(01*)', data.uk_01)
      gui.showSummaryTitle()
      break;
    case 'button_02':
      appUtils.runIndividual('UK LandLine(02*)', data.uk_02)
      gui.showSummaryTitle()
      break;
    case 'button_03':
      appUtils.runIndividual('UK LandLine(03*)', data.uk_03)
      gui.showSummaryTitle()
      break;
    case 'button_084':
      appUtils.runIndividual('UK LandLine(084*)', data.uk_084)
      gui.showSummaryTitle()
      break;
    case 'button_087':
      appUtils.runIndividual('UK LandLine(087*)', data.uk_087)
      gui.showSummaryTitle()
      break;
    case 'button_080':
      appUtils.runIndividual('UK LandLine(080*)', data.uk_080)
      gui.showSummaryTitle()
      break;
    case 'button_09':
      appUtils.runIndividual('UK LandLine(09*)', data.uk_09)
      gui.showSummaryTitle()
      break;
    case 'button_mobile':
      appUtils.runIndividual('Mobile', data.mobile)
      gui.showSummaryTitle()
      break;
    case 'button_landline':
      appUtils.ukLandLines()
      gui.showSummaryTitle()
      break;
    case 'button_special':
      appUtils.SpecialNumbers()
      gui.showSummaryTitle()
      break;
    case 'button_int':
      appUtils.runIndividual('International', data.international)
      gui.showSummaryTitle()
      break;
    case 'button_1xx':
      infoDialog()
      break;
    case 'button_all':
      appUtils.runSummary()
      gui.showSummaryTitle()
      break;
    case 'full-bill':
      appUtils.completeBill(id)
      gui.showSummaryTitle()
      break;
    case 'full-bill_pc':
      appUtils.completeBillPDF(id)
      gui.showSummaryTitle()
      break;
    case 'scannedFiles':
      console.log('scannedFiles button Clicked')
      break;
    case 'combine-csv':
      console.log('combine-csv Button  Clicked')
      break;

    default:
      break;
  }
}

/**
 * 
 * @param {*} id 
 */
function createPDF(id){
  switch (id) {
    case 'button_pc':
      appUtils.pSummary(id)
      getData()
      break;
    case 'button_pa':
      appUtils.pSummary(id)
      getData()
      break;
    case 'full-bill_pc':
     
     appUtils.completeBillPDF(id)
      //gui.showSummaryTitle()
      printFullBill(data)
      break;
  }
}

/**
 *  Send Data to create PDF file
 */
function getData(){
  setTimeout(()=>{
    var data = []
    data = document.getElementById('data-card').innerHTML
    var filename = appUtils.printableName(printableFileName)
    data={item1:data, filename: filename} 
    ipcRenderer.send('printPDF', data)
  }, 750)
  
 
}

function printFullBill(data){
  setTimeout(()=>{
    var data = []
    data = document.getElementById('full-data-card').innerHTML
    var filename = appUtils.printableName(printableFileName)
    data={item1:data, filename: filename} 
    ipcRenderer.send('savePDF', data)
  }, 750)
}


const themeLoader = setInterval(() => { 
  theme.loadtheme()
  clearInterval(themeLoader)
}, 10)




