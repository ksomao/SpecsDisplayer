//const electron = require('electron')
//const path = require('path')
const si = require('systeminformation');

var mod = document.getElementById('model')
var cors = document.getElementById('cores')


function getCPU(){
    si.cpu(function(data){

        const manufacturer = data.manufacturer
        const brand = data.brand
        const speedmax = data.speedmax
        const cores = data.cores
     
        mod.innerHTML = 'Model: '+manufacturer+ ' '+brand+' '+speedmax+' /GHZ'
        cors.innerHTML = 'Cores: '+cores

    })
}
getCPU()




function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i == 0) return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};

var total = document.getElementById('tot')
var free = document.getElementById('fre')
var used = document.getElementById('usd')

function getMem(){

    si.mem(function(data){

        const max = bytesToSize(data.total)
        const libre = bytesToSize(data.free)
        const util = bytesToSize(data.used)

        total.innerHTML = 'Total: '+max
        free.innerHTML = 'Free: '+libre
        used.innerHTML = 'Used: '+util

    })
}
getMem()



var bat = document.getElementById('batt')
function getBattery(){
    si.battery(function(data){
        const batteri = data.hasbattery
        bat.innerHTML = 'Presence: '+batteri
        
    })

}
getBattery()

var mo = document.getElementById('mode')
var pixe = document.getElementById('pix')

function getGraphics(){
    si.graphics(function(data){
        const modeel =  data.controllers[0].model
        const pixeel =  data.displays[0].resolutionx + ' X ' +data.displays[0].resolutiony

        mo.innerHTML = 'Model: '+modeel
        pixe.innerHTML = 'Pixel: '+pixeel
        

    })
}
getGraphics()

var platfor = document.getElementById('platf')
var winvers =  document.getElementById('WS')
var procesor = document.getElementById('process')

function getOS(){
    si.osInfo(function(data){

        platfor.innerHTML = 'Platform: '+data.platform
        winvers.innerHTML = 'Windows Version: '+data.distro
        procesor.innerHTML= 'Processor: '+data.arch
     
    })
}
getOS()

var nam = document.getElementById('nom')
var typ = document.getElementById('typ')
var siz = document.getElementById('taille')

function getDisk(){
    si.diskLayout(function(data){
        nam.innerHTML = ' Disk name: ' + data[0].name
        typ.innerHTML = ' Disk Type: ' + data[0].type
        siz.innerHTML = ' Disk size: ' + bytesToSize(data[0].size)

    })
}
getDisk()

var network = document.getElementById('network')

function ggetNetwork(){
    si.networkInterfaces(function(data){
        network.innerHTML = 'NetWork: ' + data[0].iface + ' /'+data[0].ifaceName
    })
}
ggetNetwork()

var manuf = document.getElementById('manuf')
var version = document.getElementById('version')
function getSystem(){
    si.system(function(data){
        manuf.innerHTML = 'Manufacturer: ' + data.manufacturer
        version.innerHTML = 'Version: ' + data.version
    })
}
getSystem()

si.battery()
.then(data => console.log(data))
    .catch(error => console.error(error));




    


