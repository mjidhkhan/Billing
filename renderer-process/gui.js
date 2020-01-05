var $ = require("jquery");
var formatNumber = require("simple-format-number");
const fs = require("fs");
const is = require("electron-is");
//const appUtils = require('./apputils')
var count = 0;
var theme = "blue";
var fn;
var buttons = [];

module.exports = {
  appStart: function() {
    $("#selected-file").empty();
    $("#csvDone").hide();
    $("#result").hide();
    $("#file").hide();
    $("#records").hide();
    $("#summary").hide();
    $("#additional").hide();
    $("#scanning-done").hide();
    $("#all-buttons").hide();
    $("#action-btn").hide();
    //$('mysideBar').hide()
    // $('#sidebar').hide()
    //  $('#pdf-buttons').hide()

    // Billing Related Defaults
    $("#clear-button").hide();
    $("#combine-button").hide();
    $("#summary-title").hide();
  },
  hideInformationArea: function() {
    $("#information").hide();
  },
  showInformationArea: function() {
    $("#information").show();
  },
  getAllCssClasses() {
    //console.log(t)
    /* var CSSClasses = [];

        $('body *:not(script)').each(function(){
        CssClasses = $(this).attr('class') ? $(this).attr('class').split(' ') : []
        CssClasses.forEach(function(entry){
            if(CSSClasses.indexOf(entry) < 0){
                CSSClasses.push(entry)
            }
        })
})

console.log(CSSClasses)
*/
  },

  scanning: () => {
    $("#scanning").show();
    $("#scanning-done").hide();
    $("#rec-found").empty();
  },

  displayFileName: path => {
    const appUtils = require("./apputils");
    $("#selected-file").text(`${appUtils.getFileName(path)}`);
    $("#file").show("slow");
    $("#csvDone").show("slow");
    $("#fn").show();
    $("#fn").empty();
    $("#fn").append(`${appUtils.getFileName(path)}`);
  },

  hideSummaryData: () => {
    $("#data-card-combine").hide();
    $("#data-card").hide();
    $("#data-card-combine").empty();
    $("#data-card").empty();
    //$('#summary-title').hide()
  },

  showTableCombine: (data, tblTitle, c1, c2, c3, c4) => {
    var dataTable = "";
    dataTable += Head(tblTitle, c1, c2, c3, c4);
    dataTable += Body(data);
    dataTable += Footer();
    $("#summary").show();
    $("#data-card-combine").append(dataTable);
    $("#data-card-combine").show();
  },

  showTable: (data, tblTitle, c1, c2, c3, c4) => {
    var dataTable = "";
    dataTable += Head(tblTitle, c1, c2, c3, c4);
    dataTable += Body(data);
    dataTable += Footer();
    $("#summary").show();
    $("#data-card").append(dataTable);
    $("#data-card").show();
  },
  showSummaryTitle: () => {
    $("#summary-title").show();
  },

  multiTable: (data, tblTitle, c1, c2, c3, c4) => {
    count++;
    var arr = [];
    data.forEach(element => {
      element.forEach(element => {
        arr.push(element);
      });
    });

    var dataTable = "";
    dataTable += Head(tblTitle, c1, c2, c3, c4);
    dataTable += Body(arr);
    dataTable += Footer();
    $("#summary").show();
    $("#bill-summary").empty();
    $("#bill-summary").append(tblTitle);
    $("#data-card").append(dataTable);
    $("#data-card").show();
  },

  printableTable: (data, tblTitle, c1, c2, c3, c4) => {
    var arr = [];
    data.forEach(element => {
      element.forEach(element => {
        arr.push(element);
      });
    });

    var dataTable = "";
    dataTable += printableHead(tblTitle, c1, c2, c3, c4);
    dataTable += printableBody(arr);
    dataTable += Footer();
    $("#summary").show();
    $("#bill-summary").empty();
    $("#bill-summary").append(tblTitle);
    $("#data-card").append(dataTable);
    $("#data-card").show();
  },

  PDF: () => {
    $("#pdf-buttons").show();
  },
  getButtonID: () => {
    return buttons;
  },
  FullBillTable: (data, tblTitle, c1, c2, c3, c4, c5, c6) => {
    var dataTable = "";
    dataTable += fullBillHeader(tblTitle, c1, c2, c3, c4, c5, c6);
    dataTable += fullBillBody(data);
    dataTable += Footer();
    $("#summary").show();
    $("#bill-summary").empty();
    $("#bill-summary").append(tblTitle);
    $("#data-card").append(dataTable);
    $("#data-card").show();
  },
  printableFullBillTable: (data, tblTitle, c1, c2, c3, c4, c5) => {
    var dataTable = "";
    dataTable += fullBillHeader(tblTitle, c1, c2, c3, c4, c5);
    dataTable += fullBillBody(data);
    dataTable += Footer();
    //  $('#summary').show()
    //  $('#bill-summary').empty()
    //  $('#bill-summary').append(tblTitle)
    $("#full-data-card").empty();
    $("#full-data-card").append(dataTable);
    // $('#data-card').show()
  },
  showScannedFiles: function(list) {
    var plist = [];
    plist.push(prepareFileList(list));
    $("#scanned-list").empty();
    $("#scanned-list").append(plist);
    //console.log(list)
    if (list.length >= 2) {
      $("#combine-csv").show();
    } else {
      $("#combine-csv").hide();
    }
    //return btn = document.querySelectorAll('.btn')
  },
  hideScannedFiles: function() {
    $("#scanned-area").hide();
    $("#scanned-list").empty();
  },
  showCombineButton: function() {
    $("#combine-button").show();
    $("#scanned-area").hide();
  },
  showClearButton: function() {
    $("#clear-button").show();
    $("#scanned-area").hide();
  },
  hideClearButton: function() {
    $("#clear-button").hide();
    $("#scanned-area").hide();
  },
  hideCombineButton: function() {
    $("#combine-button").hide();
    $("#scanned-area").hide();
  },

  combineAction: () => {
    $("#clear-button").show();
    $("#combine-button").show();
  },

  hideProgresBar: function(id) {
    $(".progress-bar").css("width", 0 + "%");
    $(`#PRG-${id}`).removeClass("progress");
    $(`#PRG-${id}`).removeClass(" bg-success");
    $(`.myButton`).removeClass(" bg-success");
  },
  appProgressComplete: function(rows) {
    $("#scanning-done").show("slow");
    $("#rec-found").empty();
    $("#all-buttons").show("slow");
    $("#action-btn").show("slow");
    $("#information").hide();
    $("#scannedFiles").show();
    $("#fn").show();
  },
  addProgressBar: fid => {
    $("#PRGT-" + fid).empty();
    $("#BTN-" + fid).disabled = true;
    $("#progress-" + fid).addClass("progress ");
    $("#PRG-" + fid).addClass("bg-blue ");
    $("#summary-title").hide();
    $("#data-card").hide();
    $("#data-card-combine").hide();
  },

  scanProgress: function(pdata, fid) {
    $("#PRGT-" + fid).empty();
    $("#PRG-" + fid).empty();
    $("#PRG-" + fid).addClass("progress-bar");
    $("#PRGT-" + fid).append(
      '<span class="orange-text">' + pdata + "% </span>"
    );
    $(".progress-bar").css("width", pdata + "%");
  },
  removeProgressBar: fid => {
    $("#PRGT-" + fid).empty();
    $("#PRG-" + fid).empty();
    $("#PRGT-" + fid).append(
      '<span class="display-8 purple-text small">Done </span> <i class="fa fa-check green-text"> <i> '
    );
    $("#PRG-" + fid).removeClass("progress-bar");
    $("#progress-" + fid).removeClass("progress");
    $("#PRG-" + fid).removeClass("bg-blue ");
    $(".progress-bar").css("width", 0 + "%");
  },
  addDone: function(name) {
    done(name);
  },
  getFileCreationTime: function(filepath) {
    return createdDate(filepath);
  },
  convertToHexString: function(data) {
    return getHexString(data);
  },
  getFileID: (filepath, file, size) => {
    return fileID(filepath.toString(), file, size);
  },

  // Theme Related GUI

  showThemeApplyResetButton: () => {
    $("#theme-apply-btn").show();
    $("#theme-reset-btn").show();
  },
  showTitlebarApplyResetButton: () => {
    $("#titlebar-apply-btn").show();
    $("#titlebar-reset-btn").show();
  },
  hideThemeApplyResetButton: () => {
    $("#theme-apply-btn").hide();
    $("#theme-reset-btn").hide();
  },
  hideTitlebarApplyResetButton: () => {
    $("#titlebar-apply-btn").hide();
    $("#titlebar-reset-btn").hide();
  },

  showInfoMessage: (id, options, title, message) => {
    $(".toast").toast(options);
    $(".message-title").empty();
    $(".message-title").append(title);
    $(".message-body").empty();
    $(".message-body").append(message);
    $(`${id}`).toast("show");
  }
};

/** Utilty Functions */

function done(name) {
  var filename = name.split("_");

  console.log(filename[0]);
  $(`#${filename[0]}`).empty();
  $(`#${filename[0]}`).append(`<i class="fa fa-check"></i>`);
  $(`#PG`).empty(`<i class="fa fa-check"></i>`);
  $(`#PG`).append(`Scanned`);
}

function fileName(name) {
  var filename = name.split("_");
  fn = filename[0];
  return fn;
}

function prepareFileList(list) {
  buttons = [];

  var filelist = "";

  filelist += `<table class="table table-sm table-borderless" >`;
  filelist += `<thead class="fw-500">`;
  filelist += `<tr class="theme  darken-3 text-white">`;
  filelist += `<th scope="col">File</th><th scope="col">Size</th>`;
  filelist += `<th scope="col">Status</th><th scope="col">Action</th>`;
  filelist += `</tr></thead>`;
  filelist += `<tbody class="small"><tr>`;
  list.forEach(element => {
    var fid = fileID(element.fullpath, element.name, element.size);
    buttons.push(`BTN-${fid}`);
    filelist += `<td> ${element.name}</td>`;
    filelist += `<td> ${element.size}</td>`;
    filelist += `<td><div class=" " id="progress-${fid}"><div class=" " id="PRG-${fid}"></div></div>`;
    filelist += `<div  class="default-text pending-text" id="PRGT-${fid}">Pending...</div></td> `;
    filelist += `</div>`;
    filelist += `</td>`;
    filelist += `<td><button type="button"  class="btn btn-outline-secondary btn-sm scnButton" id ="BTN-${fid}">`;
    filelist += `Scan</button></td>`;
    filelist += `</tr>`;
  });
  filelist += `</tbody></table>`;
  //buttons.push(filelist)
  return filelist;
}

function fileID(path, file, size) {
  return getHexString(file + createdDate(path) + size);
}

function createdDate(filepath) {
  const { birthtime } = fs.statSync(filepath);
  return birthtime;
}

function getHexString(data) {
  const bufferText = new Buffer.from(data.toString(), "utf8");
  const hexText = bufferText.toString("hex");
  return hexText;
}

function Head(tblTitle, c1, c2, c3, c4) {
  if (tblTitle.includes("Special")) {
    count = 0;
  }

  if (count == 1) {
    theme = "green";
  } else {
    theme = "blue";
  }

  var table = "";

  table += `<div class="col-sm mt-2">`;
  table += ` <div class="content shadow">`;
  table += `  <div class="features">`;
  table += `  <section>`;
  table += ` <h5 class="fw-200 hide">${tblTitle}</h5>`;
  table += `<div class="white  mb-3" style="width: 100%"> `;
  table += `<table class="table"> `;
  table += `<thead class="${theme} darken-2 text-white"> `;
  table += `  <tr>`;
  table += ` <th scope="col">Type</th>`;
  table += ` <th style="text-align:right" scope="col">${c1}</th>`;
  table += ` <th style="text-align:right" scope="col">${c2}</th>`;
  table += ` <th style="text-align:right" scope="col">${c3}</th>`;
  table += ` <th style="text-align:right" scope="col">${c4}</th>`;
  table += `  </tr>`;
  table += ` </thead> `;
  table += `<tbody> `;

  return table;
}

function Body(data) {
  var tduration = 0;
  var tuk_calls = 0;
  var m_calls = 0;
  var u_cost = 0;
  var ws_cost = 0;
  var table = "";

  if (is.osx()) {
    var font_size = "display-10";
  } else if (is.windows()) {
    var font_size = "display-9";
  }
  data.forEach(element => {
    tduration = tduration + element.duration;
    u_cost = u_cost + element.uCost;
    ws_cost = ws_cost + element.wsCost;
    tuk_calls = tuk_calls + element.calls;
    //  console.log('U Cost:'+ u_cost)
    //  console.log('WS Cost:'+ ws_cost)

    table += `<tr><td scope="row" style="text-align:left" class="${font_size}">${element.pType}</td>`;
    if (element.pType === "LandLine") {
      table += `<td  style="text-align:right" scope="row" id=${
        element.pType
      }>${formatNumber(tuk_calls, { fractionDigits: 0 })}</td>`;
    } else {
      if (element.pType == "Mobile") {
        table += `<td style="text-align:right" scope="row" id=${
          element.pType
        }>${formatNumber(element.calls, { fractionDigits: 0 })}</td>`;
      } else {
        table += `<td style="text-align:right" scope="row" id=${
          element.pType
        }>${formatNumber(element.calls, { fractionDigits: 0 })}</td>`;
      }
    }
    table += `<td style="text-align:right" scope="row">${formatNumber(
      element.duration,
      { fractionDigits: 0 }
    )}</td>`;
    table += `<td style="text-align:right" scope="row">£${formatNumber(
      element.uCost,
      { fractionDigits: 2 }
    )}</td>`;
    table += `<td style="text-align:right" scope="row">£${formatNumber(
      element.wsCost,
      { fractionDigits: 2 }
    )}</td></tr>`;
  });

  table += `<tr class=" display-8  grey lighten-3">
            <td scope="row" style="text-align:left">Total</td>`;
  if (m_calls > 0) {
    tuk_calls = tuk_calls + m_calls;
  }
  table += `<td  style="text-align:right" scope="row">${formatNumber(
    tuk_calls,
    { fractionDigits: 0 }
  )}</td>`;
  table += `<td  style="text-align:right" scope="row">${formatNumber(
    tduration,
    { fractionDigits: 0 }
  )}</td>`;
  table += `<td  style="text-align:right" scope="row">£${formatNumber(u_cost, {
    fractionDigits: 2
  })}</td>`;
  table += `<td  style="text-align:right" scope="row">£${formatNumber(ws_cost, {
    fractionDigits: 2
  })}</td></tr>`;
  m_calls = 0;
  count = 0;
  return table;
}

function printableHead(tblTitle, c1, c2, c3, c4) {
  console.log(`P-Head: ${count}`);

  if (count == 1) {
    theme = "green";
  } else {
    thems = "blue";
  }
  var table = "";

  table += `<div class="col-sm mt-2">`;
  table += ` <div class="content shadow">`;
  table += `  <div class="features">`;
  table += `  <section>`;
  table += ` <h5 class="fw-200 hide">${tblTitle}</h5>`;
  table += `<div class="white  mb-3" style="width: 100%"> `;
  table += `<table class="table"> `;
  table += `<thead class="blue darken-2 text-white"> `;
  table += `  <tr>`;
  table += ` <th scope="col">Type</th>`;
  table += ` <th style="text-align:right" scope="col">${c1}</th>`;
  table += ` <th style="text-align:right" scope="col">${c2}</th>`;
  table += ` <th style="text-align:right" scope="col">${c3}</th>`;

  table += `  </tr>`;
  table += ` </thead> `;
  // table += `<tbody> `

  table += `  </tr>`;
  table += ` </thead> `;
  table += `<tbody> `;
  return table;
}
function printableBody(data) {
  var tduration = 0;
  var tuk_calls = 0;
  var m_calls = 0;
  var u_cost = 0;
  var ws_cost = 0;
  var table = "";
  if (is.osx()) {
    var font_size = "display-10";
  } else if (is.windows()) {
    var font_size = "display-9";
  }

  data.forEach(element => {
    tduration = tduration + element.duration;
    u_cost = u_cost + element.uCost;
    ws_cost = ws_cost + element.wsCost;
    tuk_calls = tuk_calls + element.calls;

    table += `<tr><td scope="row"  class="${font_size}">${element.pType}</td>`;
    if (element.pType === "LandLine") {
      table += `<td style="text-align:right" scope="row"   id=${
        element.pType
      }>${formatNumber(tuk_calls, { fractionDigits: 0 })}</td>`;
    } else {
      if (element.pType == "Mobile") {
        table += `<td style="text-align:right" scope="row"   id=${
          element.pType
        }>${formatNumber(element.calls, { fractionDigits: 0 })}</td>`;
      } else {
        table += `<td style="text-align:right" scope="row"   id=${
          element.pType
        }>${formatNumber(element.calls, { fractionDigits: 0 })}</td>`;
      }
    }
    table += `<td style="text-align:right" scope="row"  >${formatNumber(
      element.duration,
      { fractionDigits: 0 }
    )}</td>`;
    table += `<td style="text-align:right" scope="row"  >£${formatNumber(
      element.uCost,
      { fractionDigits: 2 }
    )}</td></tr>`;
  });

  table += `<tr class="display-8 grey lighten-3"><td scope="row" style="text-align:left">Total</td>`;
  if (m_calls > 0) {
    tuk_calls = tuk_calls + m_calls;
  }
  table += `<td style="text-align:right" scope="row">${formatNumber(tuk_calls, {
    fractionDigits: 0
  })}</td>`;
  table += `<td style="text-align:right" scope="row">${formatNumber(tduration, {
    fractionDigits: 0
  })}</td>`;
  table += `<td style="text-align:right" scope="row">£${formatNumber(u_cost, {
    fractionDigits: 2
  })}</td></tr>`;
  m_calls = 0;
  return table;
}
function Footer() {
  var table = "";
  table += "</tbody>";
  table += "</table>";
  table += " </div><!-- ./inner div white -->";
  table += "</section><!-- ./inner section -->";
  table += "</div><!-- ./features -->";
  table += "</div><!-- ./contents -->";
  table += "	<!-- ./col-sm -->";

  return table;
}

function fullBillHeader(tblTitle, c1, c2, c3, c4, c5) {
  if (tblTitle.includes("Special")) {
    count = 0;
  }

  if (count == 1) {
    theme = "green";
  } else {
    theme = "blue";
  }

  var table = "";
  table += `<div class="example">`;
  table += ` <div>`;
  table += `  <div>`;
  table += `  <section>`;
  table += ` <h5 class="fw-200 hide">${tblTitle}</h5>`;
  table += `<div class="mb-3" style="max-width: 100%"> `;
  table += `<table class="table"> `;
  table += `<thead class="${theme} darken-2 text-white"> `;
  table += `  <tr class="">`;
  table += `<th scope="col" style="text-align:left"><strong>${c1}</strong></th>`;
  table += `<th scope="col" style="text-align:left"><strong>${c2}</strong></th>`;
  table += `<th scope="col" style="text-align:left"><strong>${c3}</strong></th>`;
  table += `<th scope="col" style="text-align:left"><strong>${c4}</strong></th>`;
  table += `<th scope="col" style="text-align:right"><strong>${c5}</strong></th>`;
  table += `  </tr>`;
  table += ` </thead> `;
  table += `<tbody>`;

  return table;
}

function fullBillBody(data) {
  var total_cost = 0.0;
  var table = "";
  data.sort();
  var pi = "";
  var count = 0;
  data.forEach(element => {
    total_cost = total_cost + parseFloat(element.costs);
    var a = element.startTime.split(" ");

    //  var t = toHHMMSS(element.duration)
    //  t_time = t+ t_time
    count++;

    if (a[0] != pi) {
      table += `<tr class="border_bottom"><td  style="text-align:left; color:#000">${a[0]}</td>`;
      pi = a[0];
    } else {
      table += `<tr><td  style="text-align:left; color:#000"></td>`;
    }
    table += `<td  style="text-align:left  color:#000">${a[1]}</td>`;
    table += `<td style=" color:#000">${element.destination}</td>`;
    table += `<td style=" color:#000">${toHHMMSS(element.duration)}</td>`;
    table += `<td style="text-align:right; color:#000">£${formatNumber(
      element.wholesaleCosts / 1,
      { fractionDigits: 2 }
    )}</td></tr>`;
  });
  table += "<tr><hr></tr>";
  table += ` <tr class="border_bottom"><td>Total</td><td></td><td></td><td></td><td style="text-align:right; color:#000; font-weight:bold">£${formatNumber(
    total_cost,
    { fractionDigits: 2 }
  )}</td></tr>`;
  //console.log('Total Cost:'+total_cost)
  return table;
}

var toHHMMSS = secs => {
  var sec_num = parseInt(secs, 10);

  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor(sec_num / 60) % 60;
  var seconds = sec_num % 60;

  return [hours, minutes, seconds]
    .map(v => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
};
