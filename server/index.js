var PBHelper = require('../assets/Script/common/pbhelper');
var pbHelper = new PBHelper();
var PB = pbHelper.loadFile('../assets/resources/proto', 'grace.proto.msg');

var io = require('socket.io')();
var clients = [];

io.on('connection', function(client){
    clients.push(client);
    client.on('message',function(data){
        clients.forEach(function(c, index) {
            c.emit('message', data);
        });    
    });
});

io.listen(3000);