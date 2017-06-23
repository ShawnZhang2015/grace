var PBHelper = require('../assets/Script/common/pbhelper');
var pbHelper = new PBHelper();
var PB = pbHelper.loadFile('../assets/resources/proto', 'grace.proto.msg');

var io = require('socket.io')();
var clients = [];

io.on('connection', function(client){
    clients.push(client);
    client.on('message',function(data){

        let pbMessage = PB.PBMessage.decode(data);
        
        if (pbMessage.actionCode === PB.ActionCode.SendMessage) {
            pbMessage.actionCode = PB.ActionCode.RecvMessage;    
        }
        
        let sendData = pbMessage.toArrayBuffer();
        clients.forEach(function(c, index) {
            if (c === client) {
                c.emit('message', data);
            } else {
                c.emit('message', sendData);
            }
        });    
    });
});

io.listen(3000);