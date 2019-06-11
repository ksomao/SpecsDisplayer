//const electron = require('electron')
//const path = require('path')
const si = require('systeminformation');
const windows = require("windows-battery")
var $ = require('jquery');


$(function () {
  const savedPrice = localStorage.getItem('savedPrice');
  $("#price").html(savedPrice)

  let bytesToSize = (bytes) => {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i == 0) return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
  }


  let getCPU = () => {
    si.cpu(function (data) {
      const manufacturer = data.manufacturer
      const brand = data.brand
      const speedmax = data.speedmax
      const cores = data.cores
      $("#model").html('Model: ' + manufacturer + ' ' + brand + ' ' + speedmax + ' /GHZ')
      $("#cores").html('Cores: ' + cores)
    })
  }

  let getMem = () => {
    si.mem(function (data) {
      const max = bytesToSize(data.total)
      const libre = bytesToSize(data.free)
      const util = bytesToSize(data.used)
      $("#tot").html('Total: ' + max + ' de mémoire vive')
    })
  }

  let getGraphics = () => {
    si.graphics(function (data) {
      const model = data.controllers[0].model
      const pixel = data.displays[0].resolutionx + ' X ' + data.displays[0].resolutiony
      $("#mode").html('Model: ' + model)
      $("#pix").html('Pixel: ' + pixel)
    })
  }
  let getOS = () => {
    si.osInfo(function (data) {
      $("#platf").html(data.distro + " " + data.arch)
    })
  }

  let getDisk = () => {
    si.diskLayout(function (data) {
      $("#nom").html('1er disque ')
      $("#typ").html(data[0].type + " ")
      $("#taille").html(bytesToSize(data[0].size))
      if (data.length === 2) {
        $("#nom2").html('2ème disque ')
        $("#typ2").html(data[1].type + " ")
        $("#taille2").html(bytesToSize(data[1].size))
      }
      else{
        $("#disk2").hide()
      }
    })
  }

  $("#button__price").click((ev) => {
    ev.preventDefault()
    const inputPriceValue = $('#input__price').val()
    localStorage.setItem('savedPrice', inputPriceValue);
    $("#price").html(inputPriceValue)
  })


  let getSystem = () => {
    si.system(function (data) {
      $("#manuf").html(data.manufacturer)
      $("#version").html(data.version)
    })
  }

  document.body.addEventListener("keyup", (function(ev){
    ev.preventDefault()
    if (ev.ctrlKey && ev.keyCode == 80) {
      $('#form').toggle()
    }
  }).bind(document.body))


  getMem()
  getCPU()
  getGraphics()
  getOS()
  getDisk()
  getSystem()

})






    


