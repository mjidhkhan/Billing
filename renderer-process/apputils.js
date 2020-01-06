var $ = require("jquery");
const gui = require("./gui");
const data = require("./data");
const minutes = require("./minutes");
const calls = require("./phones");

var fn;
var fname;
module.exports = {
  printableName: function(name) {
    return makeFileName(name);
  },
  getFileName: function(path) {
    const os = require("os");
    var file_name = "" + path;
    if (os.platform() == "win32") {
      var fileNameIndex = file_name.lastIndexOf("\\") + 1;
    } else {
      var fileNameIndex = file_name.lastIndexOf("/") + 1;
    }
    filename = file_name.substr(fileNameIndex);

    fn = findSummaryFor(filename);
    fname = makeFileName(filename);
    return filename;
  },
  showFile: function(path) {
    var filePath = [];
    filePath.pop();
    filePath.push(path);
    gui.displayFileName(filePath);

    return filePath;
  },
  runIndividual: (pType, dType) => {
    gui.hideSummaryData();
    var dt = findData(pType, dType);
    gui.showTableCombine(
      dt,
      `${pType} Calls Duration [${fn}]`,
      "Total calls",
      "Duration(minutes)",
      "User Cost",
      "WS Cost"
    );
  },
  ukLandLines: () => {
    gui.hideSummaryData();
    var uk = [];
    uk.push(findData("UK LandLine(01*)", data.uk_01));
    uk.push(findData("UK LandLine(02*)", data.uk_02));
    uk.push(findData("UK LandLine(03*)", data.uk_03));

    gui.multiTable(
      uk,
      `UK Landlines(01*, 02*, 03*) [${fn}]`,
      "Total calls",
      "Duration(m)",
      "User Cost",
      "WS Cost"
    );
  },

  SpecialNumbers: () => {
    gui.hideSummaryData();
    var uk = [];
    uk.push(findData("087* Nos)", data.uk_087));
    uk.push(findData("084* Nos)", data.uk_084));
    uk.push(findData("080* Nos)", data.uk_080));
    uk.push(findData("09* Nos)", data.uk_09));

    gui.multiTable(
      uk,
      `Special Nos(087, 084, 09) [${fn}]`,
      "Total calls",
      "Duration(m)",
      "User Cost",
      "WS Cost"
    );
  },

  runSummary: () => {
    gui.hideSummaryData();
    //var dt =[]
    var uk = [];
    //var international = []
    uk.push(findData("UK LandLine(01*)", data.uk_01));
    uk.push(findData("UK LandLine(02*)", data.uk_02));
    uk.push(findData("UK LandLine(03*)", data.uk_03));

    uk.push(findData("Mobile", data.mobile));

    uk.push(findData("087* Nos)", data.uk_087));
    uk.push(findData("084* Nos)", data.uk_084));
    uk.push(findData("080* Nos)", data.uk_080));
    uk.push(findData("09* Nos)", data.uk_09));

    uk.push(findData("International", data.international));

    gui.multiTable(
      uk,
      `Bill Summary [${fn}]`,
      "Total calls",
      "Duration(m)",
      "User Cost",
      "WS Cost"
    );
    gui.printableTable(
      uk,
      `Bill Summary [${fn}]`,
      "Total calls",
      "Duration(m)",
      "User Cost",
      "WS Cost"
    );
    //printPdf(fn)

    console.log(uk);
    gui.PDF();
  },
  pSummary: id => {
    gui.hideSummaryData();
    //var dt =[]
    var uk = [];
    //var international = []
    uk.push(findData("UK LandLine(01*)", data.uk_01));
    uk.push(findData("UK LandLine(02*)", data.uk_02));
    uk.push(findData("UK LandLine(03*)", data.uk_03));

    uk.push(findData("Mobile", data.mobile));

    uk.push(findData("087* Nos)", data.uk_087));
    uk.push(findData("084* Nos)", data.uk_084));
    uk.push(findData("080* Nos)", data.uk_080));
    uk.push(findData("09* Nos)", data.uk_09));

    uk.push(findData("International", data.international));

    if (id == "button_pa") {
      gui.multiTable(
        uk,
        `Bill Summary [${fn}]`,
        "Total calls",
        "Duration(m)",
        "User Cost",
        "WS Cost"
      );
    } else {
      gui.printableTable(
        uk,
        `Bill Summary [${fn}]`,
        "Total calls",
        "Duration(m)",
        "User Cost",
        "WS Cost"
      );
    }
    printPdf(fn);
  },
  completeBill: id => {
    gui.hideSummaryData();
    //var dt =[]
    var uk = [];
    //var international = []
    uk.push(fullCallData("UK LandLine(01*)", data.uk_01));
    uk.push(fullCallData("UK LandLine(02*)", data.uk_02));
    uk.push(fullCallData("UK LandLine(03*)", data.uk_03));

    uk.push(fullCallData("Mobile", data.mobile));

    uk.push(fullCallData("087* Nos)", data.uk_087));
    uk.push(fullCallData("084* Nos)", data.uk_084));
    uk.push(fullCallData("080* Nos)", data.uk_080));
    uk.push(fullCallData("09* Nos)", data.uk_09));

    uk.push(fullCallData("International", data.international));
    //console.log(uk)

    var callData = [];
    uk.forEach(ukItem => {
      ukItem.forEach(ukItemelement => {
        ukItemelement.forEach(element => {
          element.forEach(item => {
            callData.push(item);
          });
        });
      });
    });
    /*
     arr.forEach(element => {
        console.log(element.destination)
     })
*/
    gui.FullBillTable(
      callData,
      `Bill Summary [${fn}]`,
      "Destination",
      "Destination Name",
      "Duration(m)",
      "Start Time",
      "End Time",
      "Cost"
    );
  },
  completeBillPDF: id => {
    gui.hideSummaryData();
    //var dt =[]
    var uk = [];
    //var international = []
    uk.push(fullCallData("UK LandLine(01*)", data.uk_01));
    uk.push(fullCallData("UK LandLine(02*)", data.uk_02));
    uk.push(fullCallData("UK LandLine(03*)", data.uk_03));

    uk.push(fullCallData("Mobile", data.mobile));

    uk.push(fullCallData("087* Nos)", data.uk_087));
    uk.push(fullCallData("084* Nos)", data.uk_084));
    uk.push(fullCallData("080* Nos)", data.uk_080));
    uk.push(fullCallData("09* Nos)", data.uk_09));

    uk.push(fullCallData("International", data.international));
    console.log(uk);

    var callData = [];
    uk.forEach(ukItem => {
      ukItem.forEach(ukItemelement => {
        ukItemelement.forEach(element => {
          element.forEach(item => {
            callData.push(item);
          });
        });
      });
    });
    /*
     arr.forEach(element => {
        console.log(element.destination)
     })
*/
    //printPdf(fn)
    gui.printableFullBillTable(
      callData,
      `[${fn}]`,
      "Date",
      "Time",
      "Destination",
      "Usage",
      "£"
    );
  },
  generateUniqueList: function(list) {
    var selectedList = null;
    selectedList = [...new Map(list.map(item => [item.name, item])).values()];
    console.log(selectedList);
    return selectedList;
  }
};

function printPdf(fn) {
  //console.log('sending event' + fname)
  // gui.makePrintable()
  // setTimeout(()=>{
  //ipc.send('print-to-pdf', fname)
  //ipc.send('printPDF', fn)
  // }, 2000)

  /* ipc.on('wrote-pdf', function (event, path) {
    gui.makeNormal()
    //console.log(path)

  })
  */
  return fn;
}

function findSummaryFor(file) {
  var filename = file.split("_");
  if (filename.length >= 5) {
    //console.log(filename)
    var regX = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g;
    var res = file.match(regX);
    //console.log(res.length)
    return `${filename[0]} <span style="font-size:14px;"> ${res[0]} To ${res[1]}</span>`;
  } else {
    return `${filename[0]} ${filename[1]}`;
  }
}
function makeFileName(file) {
  var filename = file.split("_");
  if (filename.length >= 5) {
    var regX = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g;
    var res = file.match(regX);
    return `${filename[0]} ${res[0]} - ${res[1]}`;
  } else {
    return `${filename[0]} ${filename[1]}`;
  }
}

function findData(pType, dType) {
  var dt = [];

  if (pType == "International") {
    dt.push({
      pType: pType,
      duration: minutes.Internationalcalls_durationInMinutes(
        phonesData,
        dType.duration
      ),
      calls: minutes.numberOfCalls(phonesData, dType.duration),
      uCost: minutes.calculateCost(phonesData, dType.costs),
      wsCost: minutes.calculateCost(phonesData, dType.wscosts)
    });
  } else {
    dt.push({
      pType: pType,
      duration: minutes.UKcalls_durationInMinutes(phonesData, dType.duration),
      calls: minutes.numberOfCalls(phonesData, dType.duration),
      uCost: minutes.calculateCost(phonesData, dType.costs),
      wsCost: minutes.calculateCost(phonesData, dType.wscosts)
    });
  }

  //console.log(dt)
  return dt;
}

function fullCallData(pType, dType) {
  var dt = [];
  dt.push(minutes.fullBill(phonesData, dType.duration));
  return dt;
}
