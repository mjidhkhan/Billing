const titlebar  = require("custom-electron-titlebar");
const { remote } = require('electron')
const { Menu, MenuItem, updateMenu } = remote
const TBarColors = {
    'materializeRed': '#e51c23' ,
    'red': '#F44336' ,
    'pink': '#e91e63' ,
    'purple': '#9c27b0' ,
    'deepPurple': '#673ab7' ,
    'indigo': '#3f51b5' ,
    'blue': '#2196F3' ,
    'lightBlue': '#0091ea' ,
    'cyan': '#00b8d4' ,
    'teal': '#009688' ,
    'green': '#4CAF50' ,
    'lightGreen': '#8bc34a' ,
    'lime': '#cddc39' ,
    'yellow': '#ffeb3b' ,
    'amber': '#ffc107' ,
    'orange': '#ff9800' ,
    'deepOrange': '#ff5722' ,
    'brown': '#795548' ,
    'blueGrey': '#607d8b' ,
    'grey': '#9e9e9e' ,
}



const Default = TBarColors.blueGrey
//console.log(Default)
var bg =titlebar.Color.fromHex(Default)

   var mtitlebar =  new titlebar.Titlebar({
        backgroundColor: bg,
        icon: './assets/app-icon/win/g3t.ico',
        shadow: true,

    });
    window.addEventListener('DOMContentLoaded', () => {
        const replaceText = (selector, text) => {
            const element = document.getElementById(selector)
            if (element) element.innerText = text
        }
        for (const type of ['chrome', 'node', 'electron']) {
            replaceText(`${type}-version`, process.versions[type])
        }
    })

function updateTb(tb, bg){
    mtitlebar.updateBackground( titlebar.Color.fromHex(bg));
}
    
module.exports = {
    setTitleBarColor: (tbColor) => {
       bg = TBarColors[tbColor]
     //console.log( bg )
     updateTb(mtitlebar, bg)
    }
} 

