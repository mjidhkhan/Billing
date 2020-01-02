
module.exports ={
  "special":{
    "duration":[
      {phone:'4487', limit:4, type:'int', lookup: 'duration'},
      {phone:'4484', limit:4, type:'int', lookup: 'duration'},
      {phone:'449', limit:3, type:'int', lookup: 'duration'},
    ],
    "costs":[
      {phone:'4487', limit:4, type:'int', lookup: 'costs'},
      {phone:'4484', limit:4, type:'int', lookup: 'costs'},
      {phone:'449', limit:3, type:'int', lookup: 'costs'},
    ],
    "wscosts":[
      {phone:'4487', limit:4, type:'int', lookup: 'wholesaleCosts'},
      {phone:'4484', limit:4, type:'int', lookup: 'wholesaleCosts'},
      {phone:'449', limit:3, type:'int', lookup: 'wholesaleCosts'},
    ]
  },

  "mobile":{
    "duration":[{phone:'447', limit:3, type:'int', lookup: 'duration'}],
    "costs":[ {phone:'447', limit:3, type:'float', lookup: 'costs'}],
    "wscosts":[ {phone:'447', limit:3, type:'float', lookup: 'wholesaleCosts'}]
  },

  "uk_01":{
    "duration":[{phone:'441', limit:3, type:'int', lookup: 'duration'}],
    "costs":[{phone:'441', limit:3, type:'float', lookup: 'costs'}],
    "wscosts":[{phone:'441', limit:3, type:'float', lookup: 'wholesaleCosts'}]
  },
  "uk_02":{
    "duration":[{phone:'442', limit:3, type:'int', lookup: 'duration'},],
    "costs":[  {phone:'442', limit:3, type:'float', lookup: 'costs'},],
    "wscosts":[ {phone:'442', limit:3, type:'float', lookup: 'wholesaleCosts'}]
  },
  "uk_03":{
    "duration":[ {phone:'443', limit:3, type:'int', lookup: 'duration'},],
    "costs":[  {phone:'443', limit:3, type:'float', lookup: 'costs'},],
    "wscosts":[ {phone:'443', limit:3, type:'float', lookup: 'wholesaleCosts'}]
  },
  "uk_087":{
    "duration":[ {phone:'4487', limit:4, type:'int', lookup: 'duration'},],
    "costs":[  {phone:'4487', limit:4, type:'float', lookup: 'costs'},],
    "wscosts":[ {phone:'4487', limit:4, type:'float', lookup: 'wholesaleCosts'}]
  },
  "uk_084":{
    "duration":[ {phone:'4484', limit:4, type:'int', lookup: 'duration'},],
    "costs":[  {phone:'4484', limit:4, type:'float', lookup: 'costs'},],
    "wscosts":[ {phone:'4484', limit:4, type:'float', lookup: 'wholesaleCosts'}]
  },
  "uk_080":{
    "duration":[ {phone:'4480', limit:4, type:'int', lookup: 'duration'}],
    "costs":[  {phone:'4480', limit:4, type:'float', lookup: 'costs'}],
    "wscosts":[ {phone:'4480', limit:4, type:'float', lookup: 'wholesaleCosts'}]
  },
  "uk_09":{
    "duration":[ {phone:'449', limit:3, type:'int', lookup: 'duration'}],
    "costs":[  {phone:'449', limit:3, type:'float', lookup: 'costs'}],
    "wscosts":[ {phone:'449', limit:3, type:'float', lookup: 'wholesaleCosts'}]
  },
  "international":{
    "duration":[{phone:'',limit:2, type:'int', lookup: 'duration'}],
    "costs":[{phone:'',limit:2, type:'float', lookup: 'costs'}],
    "wscosts":[{phone:'',limit:2, type:'float', lookup: 'wholesaleCosts'}]
  },
    


}
/*
module.exports ={
  "landlineAll":{
    "duration":[
      {phone:'441', limit:3, type:'int', lookup: 'duration'},
      {phone:'442', limit:3, type:'int', lookup: 'duration'},
      {phone:'443', limit:3, type:'int', lookup: 'duration'},
      {phone:'4487', limit:4, type:'int', lookup: 'duration'},
      {phone:'4484', limit:4, type:'int', lookup: 'duration'},
      {phone:'4480', limit:4, type:'int', lookup: 'duration'},
      {phone:'449', limit:3, type:'int', lookup: 'duration'},
      ],
      "costs":[
        {phone:'441', limit:3, type:'int', lookup: 'costs'},
        {phone:'442', limit:3, type:'int', lookup: 'costs'},
        {phone:'443', limit:3, type:'int', lookup: 'costs'},
        {phone:'4487', limit:4, type:'int', lookup: 'costs'},
        {phone:'4484', limit:4, type:'int', lookup: 'costs'},
        {phone:'4480', limit:4, type:'int', lookup: 'costs'},
        {phone:'449', limit:3, type:'int', lookup: 'costs'},
      ],
      "wscosts":[
        {phone:'441', limit:3, type:'int', lookup: 'wholesaleCosts'},
        {phone:'442', limit:3, type:'int', lookup: 'wholesaleCosts'},
        {phone:'443', limit:3, type:'int', lookup: 'wholesaleCosts'},
        {phone:'4487', limit:4, type:'int', lookup: 'wholesaleCosts'},
        {phone:'4484', limit:4, type:'int', lookup: 'wholesaleCosts'},
        {phone:'4480', limit:4, type:'int', lookup: 'wholesaleCosts'},
        {phone:'449', limit:3, type:'int', lookup: 'wholesaleCosts'},
      ]
  },

  "special":{
    "duration":[
      {phone:'4487', limit:4, type:'int', lookup: 'duration'},
      {phone:'4484', limit:4, type:'int', lookup: 'duration'},
      {phone:'449', limit:3, type:'int', lookup: 'duration'},
    ],
    "costs":[
      {phone:'4487', limit:4, type:'int', lookup: 'costs'},
      {phone:'4484', limit:4, type:'int', lookup: 'costs'},
      {phone:'449', limit:3, type:'int', lookup: 'costs'},
    ],
    "wscosts":[
      {phone:'4487', limit:4, type:'int', lookup: 'wholesaleCosts'},
      {phone:'4484', limit:4, type:'int', lookup: 'wholesaleCosts'},
      {phone:'449', limit:3, type:'int', lookup: 'wholesaleCosts'},
    ]
  },

  "landlineOnly":{
    "duration":[
      {phone:'441', limit:3, type:'int', lookup: 'duration'},
      {phone:'442', limit:3, type:'int', lookup: 'duration'},
      {phone:'443', limit:3, type:'int', lookup: 'duration'},
    ],
    "costs":[
      {phone:'441', limit:3, type:'int', lookup: 'costs'},
      {phone:'442', limit:3, type:'int', lookup: 'costs'},
      {phone:'443', limit:3, type:'int', lookup: 'costs'},
    ],
    "wscosts":[
      {phone:'441', limit:3, type:'int', lookup: 'wholesaleCosts'},
      {phone:'442', limit:3, type:'int', lookup: 'wholesaleCosts'},
      {phone:'443', limit:3, type:'int', lookup: 'wholesaleCosts'},
    ]
  },

  "mobile":{
    "duration":[ {phone:'447', limit:3, type:'int', lookup: 'duration'},],
    "costs":[ {phone:'447', limit:3, type:'float', lookup: 'costs'},],
    "wscosts":[ {phone:'447', limit:3, type:'float', lookup: 'wholesaleCosts'},]
  },

  "uk_01":{
    "duration":[
      {phone:'441', limit:3, type:'int', lookup: 'duration'},
    ],
    "costs":[
      {phone:'441', limit:3, type:'float', lookup: 'costs'},
    ],
    "wscosts":[
      {phone:'441', limit:3, type:'float', lookup: 'wholesaleCosts'},
    ]
  },
  "uk_02":{
    "duration":[ {phone:'442', limit:3, type:'int', lookup: 'duration'},],
    "costs":[  {phone:'442', limit:3, type:'float', lookup: 'costs'},],
    "wscosts":[ {phone:'442', limit:3, type:'float', lookup: 'wholesaleCosts'},]
  },
  "uk_03":{
    "duration":[ {phone:'443', limit:3, type:'int', lookup: 'duration'},],
    "costs":[  {phone:'443', limit:3, type:'float', lookup: 'costs'},],
    "wscosts":[ {phone:'443', limit:3, type:'float', lookup: 'wholesaleCosts'},]
  },
  "uk_087":{
    "duration":[ {phone:'4487', limit:4, type:'int', lookup: 'duration'},],
    "costs":[  {phone:'4487', limit:4, type:'float', lookup: 'costs'},],
    "wscosts":[ {phone:'4487', limit:4, type:'float', lookup: 'wholesaleCosts'},]
  },
  "uk_084":{
    "duration":[ {phone:'4484', limit:4, type:'int', lookup: 'duration'},],
    "costs":[  {phone:'4484', limit:4, type:'float', lookup: 'costs'},],
    "wscosts":[ {phone:'4484', limit:4, type:'float', lookup: 'wholesaleCosts'},]
  },
  "uk_080":{
    "duration":[ {phone:'4480', limit:4, type:'int', lookup: 'duration'},],
    "costs":[  {phone:'4480', limit:4, type:'float', lookup: 'costs'},],
    "wscosts":[ {phone:'4480', limit:4, type:'float', lookup: 'wholesaleCosts'},]
  },
  "uk_09":{
    "duration":[ {phone:'449', limit:3, type:'int', lookup: 'duration'},],
    "costs":[  {phone:'449', limit:3, type:'float', lookup: 'costs'},],
    "wscosts":[ {phone:'449', limit:3, type:'float', lookup: 'wholesaleCosts'},]
  },
  "international":{
    "duration":[{phone:'',limit:2, type:'int', lookup: 'duration'}],
    "costs":[{phone:'',limit:2, type:'float', lookup: 'costs'}],
    "wscosts":[{phone:'',limit:2, type:'float', lookup: 'wholesaleCosts'}]
  },
    


}


var landlineAll  = [
  {phone:'441', limit:3, type:'int', lookup: 'duration'},
  {phone:'442', limit:3, type:'int', lookup: 'duration'},
  {phone:'443', limit:3, type:'int', lookup: 'duration'},
  {phone:'4487', limit:4, type:'int', lookup: 'duration'},
  {phone:'4484', limit:4, type:'int', lookup: 'duration'},
  {phone:'4480', limit:4, type:'int', lookup: 'duration'},
  {phone:'449', limit:3, type:'int', lookup: 'duration'},

]

var free =[
    {phone:'4480', limit:4, type:'int', lookup: 'duration'},
]
var special= [
    {phone:'4487', limit:4, type:'int', lookup: 'duration'},
    {phone:'4484', limit:4, type:'int', lookup: 'duration'},
    {phone:'449', limit:3, type:'int', lookup: 'duration'},
]
var landlineOnly =[
    {phone:'441', limit:3, type:'int', lookup: 'duration'},
    {phone:'442', limit:3, type:'int', lookup: 'duration'},
    {phone:'443', limit:3, type:'int', lookup: 'duration'},
]
var mobile  = [
    {phone:'447', limit:3, type:'int', lookup: 'duration'}

]
var uk_01  = [
        "duration":[
          {phone:'441', limit:3, type:'int', lookup: 'duration'}]

]
var uk_02  = [
    {phone:'442', limit:3, type:'int', lookup: 'duration'}

]
var uk_03  = [
    {phone:'443', limit:3, type:'int', lookup: 'duration'}

]
var uk_087  = [
    {phone:'4487', limit:4, type:'int', lookup: 'duration'}

]
var uk_084  = [
    {phone:'4484', limit:4, type:'int', lookup: ['duration', 'costs', 'wholeSaleCost']}

]
var uk_080  = [
    {phone:'4480', limit:4, type:'int', lookup: 'duration'}

]
var uk_09  = [
    {phone:'449', limit:3, type:'int', lookup: 'duration'}

]

var outside_uk = [
  //International_data
  {phone:'',limit:2, type:'int', lookup: 'duration'}
]

module.exports = {
    landlineAll:landlineAll,
    landlineOnly:landlineOnly,
    special:special,
    outside_uk:outside_uk,
    mobile:mobile,
    free:free,
    uk_09:uk_09,
    uk_080:uk_080,
    uk_087:uk_087,
    uk_084:uk_084,
    uk_01:uk_01,
    uk_02:uk_02,
    uk_03:uk_03,
}
/*

var landlineAll  = [
    {phone:'441', limit:3, type:'int', lookup: 'duration'},
    {phone:'442', limit:3, type:'int', lookup: 'duration'},
    {phone:'443', limit:3, type:'int', lookup: 'duration'},
    {phone:'4487', limit:4, type:'int', lookup: 'duration'},
    {phone:'4484', limit:4, type:'int', lookup: 'duration'},
    {phone:'4480', limit:4, type:'int', lookup: 'duration'},
    {phone:'449', limit:3, type:'int', lookup: 'duration'},

]
var mobile  = [
    {phone:'447', limit:3, type:'int', lookup: 'duration'}

]
var uk_01  = [
    {phone:'441', limit:3, type:'int', lookup: 'duration'}

]
var uk_02  = [
    {phone:'442', limit:3, type:'int', lookup: 'duration'}

]
var uk_03  = [
    {phone:'443', limit:3, type:'int', lookup: 'duration'}

]
var uk_087  = [
    {phone:'4487', limit:4, type:'int', lookup: 'duration'}

]
var uk_084  = [
    {phone:'4484', limit:4, type:'int', lookup: 'duration'}

]
var uk_080  = [
    {phone:'4480', limit:4, type:'int', lookup: 'duration'}

]
var uk_09  = [
    {phone:'449', limit:3, type:'int', lookup: 'duration'}

]

var outside_uk = [
  //International_data
  {limit:2, type:'int', lookup: 'duration'}
]
*/