const electron = require('electron')
const path = require('path')
const si = require('systeminformation');

//var mod = document.getElementById('model')
//var cors = document.getElementById('cores')

si.cpu(function(data){
    console.log('CPU Information:');
    console.log('- model: '+ data.manufacturer+' '+data.brand+' '+data.speedmax+' /GHZ');
    console.log('- cores: ' + data.cores);  
})

/*function getCPU(){
    si.cpu(function(data){

        const manufacturer = data.manufacturer
        const brand = data.brand
        const speedmax = data.speedmax
        const cores = data.cores
     console.log("============>",cors)
        mod.innerHTML = 'model: '+manufacturer+ ' '+brand+' '+speedmax+' /GHZ';
        cors.innerHTML = 'cores: '+cores

    })
}
getCPU()*/

console.log(document);


function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i == 0) return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};

si.mem(function(data){
    console.log('RAM Information:');
    console.log('- total: '+ bytesToSize(data.total));
    console.log('- free: ' + bytesToSize(data.free));
    console.log('- used: ' + bytesToSize(data.used));
    
})

si.battery(function(data){
    console.log('Battery Info')
    console.log('- Presence:' + data.hasbattery);
    
})

si.graphics(function(data){
    console.log('Graphics');
    console.log('- model: ' + data.controllers[0].model);
    console.log('- pixel : '+ data.displays[0].resolutionx + ' X ' +data.displays[0].resolutiony);
    

})

si.osInfo(function(data){
    console.log('OS Info')
    console.log('- Platform: ' + data.platform);
    console.log('- windows Version: ' + data.distro);
    console.log('- Processor: ' + data.arch);

    
})

si.diskLayout(function(data){
    console.log('DiskInfo')
    console.log('- Disk name: ' + data[0].name);
    console.log('- Disk Type: ' + data[0].type);
    console.log('- Disk size: ' + bytesToSize(data[0].size));

})

si.networkInterfaces(function(data){
    console.log('NetworkInfo');
    console.log('- NetWork: ' + data[0].iface + ' /'+data[0].ifaceName);
})

si.system(function(data){
    console.log('SystemInfo');
    console.log('- manufacturer: ' + data.manufacturer);
    console.log('- version: ' + data.version);
})

si.battery()
    .then(data => console.log(data))
    .catch(error => console.error(error));





    


