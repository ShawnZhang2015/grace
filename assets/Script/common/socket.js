

var SocketIO = SocketIO || null;
var io = SocketIO || require('socket.io-client');

function Socket(host) {
    this.sequence = 0;
    this.queue = {};
    this.io = io(host);
    this.io.on('connected', this.connected.bind(this));
    this.io.on('message', this.message.bind(this));
}


Socket.prototype = {
    connected() {
        cc.log('connected');    
    },

    message(msg) {
        var pbMessage = PB.PBMessage.decode(msg);    
        var callback = this.queue[pbMessage.sequence];
        if (!callback) {
            return;
        }

        delete this.queue[pbMessage.sequence];
        try{
            callback(pbMessage.data);        
        }catch(e) {

        }
        
    },

    send(actionCode, proto, callback) {
        var base = new PB.PBMessage();   
        base.actionCode = actionCode;
        base.sequence = this.sequence;
        base.data = proto.toArrayBuffer();
        this.io.emit('message', base.toArrayBuffer());
        
        this.queue[this.sequence++] = callback;
    },

}

var socket = null;

module.exports = function(host) {
    if (!socket) {
        socket = new Socket(host);
    }
    return socket;
}