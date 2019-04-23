const si = require('systeminformation');

si.cpu(function(data){
    console.log('CPU Information:');
    console.log('- manufucturer: '+ data.manufacturer);
    console.log('- cores: ' + data.cores);
    
})

si.mem(function(data){
    console.log('Memory Information:');
    console.log('- total: '+ data.total.toLocaleString('en'));
    console.log('- free: ' + data.free);
    console.log('- used: ' + data.used);
    
})



    


