var PBHelper = require('../assets/Script/common/pbhelper');
var pbHelper = new PBHelper();
var PB = pbHelper.loadFile('../assets/resources/proto', 'grace.proto.msg');

const WebSocket = require('ws');
const ws = new WebSocket.Server({ port: 3000 }); 
let clients = [];

ws.on('connection', function(client){
    clients.push(client);
    client.on('message',function(data){

        let pbMessage = PB.PBMessage.decode(data);
        
        if (pbMessage.actionCode === PB.ActionCode.SendMessage) {
            pbMessage.actionCode = PB.ActionCode.RecvMessage;    
        }
        
        let sendData = pbMessage.toArrayBuffer();
        clients.forEach(function(c, index) {
            if (c === client) {
                c.send(data);
            } else {
                c.send(sendData);
            }
        });    
    });

    client.on('close', () => {
        let index = clients.indexOf(client);
        if (index !== -1) {
            clients.splice(index, 1);
            console.log('有人断开');
        }
    });
});