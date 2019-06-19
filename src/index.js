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


  let rightSize = (taille) => {
    taille = parseFloat(taille)
    let mem = 0

    if (taille > 0 && taille < 140) {
      mem = "128 GB"
    } else if (taille > 200 && taille < 270) {
      mem = "256 GB"
    } else if (taille > 400 && taille < 520) {
      mem = "512 GB"
    } else if (taille > 900) {
      mem = "1 TB"
    }
    return mem
  }


  let getMem = () => {
    si.mem(function (data) {
      let arrondi = parseFloat(bytesToSize(data.total))
      let max = Math.round(arrondi)
      $("#tot").html('Total: ' + max + ' GB de mémoire vive')
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
      console.log("getOs");
      let nom = data.distro
      let nomLow = nom


      if (nomLow.indexOf("windows")) {
        $("#osImg").attr('src','image/icons8-c-drive-96.png')
      } else if (nomLow.indexOf("mac")) {
        $("#osImg").attr('src','image/mac-os.png')
      } else {
        $("#osImg").attr('src','image/os-icon.png')
      }

      $("#platf").html(nom + " " + data.arch)
    })
  }

  // function imgChange () {
  //
  //   si.osInfo(function (data) {
  //     let nom = data.distro
  //
  //   })
  // }




  let getDisk = () => {
    si.diskLayout(function (data) {
      let taille = bytesToSize(data[0].size)
      let taille2
      taille = rightSize(taille);

      if (data.length === 2) {
        taille2 = bytesToSize(data[1].size)
      }

      $("#nom").html('1er disque ')
      $("#typ").html(data[0].type + " ")
      $("#taille").html(taille)
      if (data.length === 2) {
        taille2 = rightSize(taille2);
        $("#nom2").html('2ème disque ')
        $("#typ2").html(data[1].type + " ")
        $("#taille2").html(taille2)
      } else {
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
      var nom = data.manufacturer
      var carac = data.version
      $("#manuf").html(nom)
      $("#version").html(carac)

      let nomLow = nom.toLowerCase();
      let caracLow = carac.toLowerCase();



      if (caracLow.indexOf(nomLow) == 0)
        $("#manuf").hide()


    })
  }

  document.body.addEventListener("keyup", (function (ev) {
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






    


