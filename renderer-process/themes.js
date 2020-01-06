const { Titlebar, Color } = require("custom-electron-titlebar");
const settings = require("electron-settings");
const appbar = require("../assets/app-bar/appbar");
let templates = [];
let links = document.querySelectorAll('link[rel="import"]');

var Contrast = [
  "darken-1",
  "darken-1",
  "darken-2",
  "darken-3",
  "darken-4",
  "lighten-1",
  "lighten-2",
  "lighten-3",
  "lighten-4",
  "lighten-5"
];

var colors = [
  "materialize-red",
  "red",
  "pink",
  "purple",
  "deep-purple",
  "indigo",
  "blue",
  "light-blue",
  "cyan",
  "teal",
  "green",
  "light-green",
  "lime",
  "yellow",
  "amber",
  "orange",
  "deep-orange",
  "brown",
  "blue-grey",
  "grey",
  "black",
  "white"
];

module.exports = {
  setThemeColor: (color, type) => {
    ThemeLoader(color, type);
  },
  setDarkMode: (mode, type) => {
    ThemeLoader(mode, type);
  },
  setLightMode: (mode, type) => {
    ThemeLoader(mode, type);
  },
  getAllCssClasses: () => {
    return []
      .concat(...[...document.querySelectorAll("*")].map(e => [...e.classList]))
      .filter((d, i, a) => a.indexOf(d) == i)
      .sort();
  },
  setTitleBarColor: color => {
    appbar.setTitleBarColor(color);
    changeSideBarColor(color);
  },
  setAsDefaultTheme: color => {
    console.log(color);
    saveDefaultColor("Theme", color);
  },
  resetTheme: color => {
    resetDefaultColor("Theme", color);
    loadDefaultTheme();
  },
  setAsDefaultTitleBar: color => {
    saveDefaultColor("Titlebar", color);
  },
  resetTitleBar: color => {
    resetDefaultColor("Titlebar", color);
    loadDefaultTheme();
  },
  loadtheme: () => {
    loadDefaultTheme();
  }
};
/**
 *
 * @param {*} theme
 * @param {*} mode
 */
function ThemeLoader(theme, mode) {
  Array.prototype.forEach.call(links, link => {
    templates.push(link.import.querySelector(".task-template"));
  });
  var data = document.getElementsByClassName("theme");
  templates.forEach.call(data, item => {
    if (mode == "Theme") {
      checkClass(item, colors);
    } else if (mode == "Contrast") {
      checkClass(item, Contrast);
    }
    addClass(item, theme);
  });
}

/**
 *
 * @param {*} el
 * @param {*} className
 */
function hasClass(el, className) {
  if (el.classList) return el.classList.contains(className);
  else
    return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
}
/**
 *
 * @param {*} el
 * @param {*} className
 */
function addClass(el, className) {
  if (el.classList) el.classList.add(className);
  else if (!hasClass(el, className)) el.className += " " + className;
}

/**
 *
 * @param {*} el
 * @param {*} className
 */
function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else if (hasClass(el, className)) {
    var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
    el.className = el.className.replace(reg, " ");
  }
}

/**
 *
 * @param {*} el
 * @param {*} type
 */
function checkClass(el, type) {
  type.forEach(item => {
    removeClass(el, item);
  });
}
/**
 *
 * @param {*} el
 * @param {*} colors
 */
function checkDarkMode(el, colors) {
  colors.forEach(item => {
    removeClass(el, item);
  });
}
/**
 *
 * @param {*} el
 * @param {*} colors
 */
function checkLightMode(el, colors) {
  colors.forEach(item => {
    removeClass(el, item);
  });
}

/**
 *
 * @param {*} type
 * @param {*} color
 */
function saveDefaultColor(type, color) {
  settings.set(type, color);
}
/**
 *
 * @param {*} type
 * @param {*} color
 */
function resetDefaultColor(type, color) {
  settings.set(type, color);
}

/**
 *
 */
function loadDefaultTheme() {
  // get colors
  var titlebarColor = settings.get("Titlebar");
  var themeColor = settings.get("Theme");

  //console.log(titlebarColor)

  if (titlebarColor != "" && titlebarColor != undefined) {
    //console.log(1010101010)
    appbar.setTitleBarColor(titlebarColor);
    changeSideBarColor(titlebarColor);
  }

  if (themeColor != "" || themeColor != undefined) {
    ThemeLoader(themeColor, "Theme");
  }
}

/**
 *
 * @param {*} color
 */
function changeSideBarColor(color) {
  switch (color) {
    case "deepOrange":
      color = "deep-orange";
      break;
    case "blueGrey":
      color = "blue-grey";
      break;
    case "lightGreen":
      color = "light-green";
      break;
    case "deepPurple":
      color = "deep-purple";
      break;
    case "lightBlue":
      color = "light-blue";
      break;
    case "materializeRed":
      color = "materialize-red";
      break;

    default:
      break;
  }

  var sidebar = document.getElementById("sidebar");
  checkClass(sidebar, colors);
  addClass(sidebar, color);
}

function colorSelection(color) {}

/**
 *
 * @param {*} filename
 * @param {*} filetype
 */
function loadjscssfile(filename, filetype) {
  if (typeof fileref != "undefined")
    document.getElementsByTagName("head")[0].appendChild(fileref);
}

/**
 *
 * @param {*} path
 * @param {*} name
 * @usage loadJSFile("assets/mhk/css/themes/default.js", "js")
 */
function loadJSFile(path, name) {
  var filename = path + name;
  var fileref = document.createElement("script");
  fileref.setAttribute("type", "text/javascript");
  fileref.setAttribute("src", filename);
  if (typeof fileref != "undefined")
    document.getElementsByTagName("head")[0].appendChild(fileref);
}

/**
 *
 * @param {*} path
 * @param {*} name
 * @usage  loadCSSFile("assets/mhk/css/themes/default.css", "css")
 */

function loadCSSFile(path, name) {
  var filename = path + name;
  var fileref = document.createElement("link");
  fileref.setAttribute("rel", "stylesheet");
  fileref.setAttribute("type", "text/css");
  fileref.setAttribute("href", filename);
  if (typeof fileref != "undefined")
    document.getElementsByTagName("head")[0].appendChild(fileref);
}
