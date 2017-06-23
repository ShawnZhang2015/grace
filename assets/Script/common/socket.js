

var SocketIO = SocketIO || null;
var io = SocketIO ||require('socket.io-client');


function Socket(host) {
    this.sequence = 0;
    this.queue = {};
    this.io = io(host);
    this.io.on('connected', this.connected.bind(this));
    this.io.on('message', this.message.bind(this));
    this.notification = new cc.EventTarget();
}


Socket.prototype = {
    connected() {
        cc.log('connected');    
    },

    message(msg) {
        var pbMessage = PB.PBMessage.decode(msg);    
        var callback = this.queue[pbMessage.sequence];

        delete this.queue[pbMessage.sequence];
        try{
            if (callback) {
                callback(pbMessage.data);
            }
            this.notification.emit(pbMessage.actionCode.toString(), pbMessage.data);
        }catch(e) {

        }
        
    },

    on(actionCode, cb) {
        this.notification.on(actionCode.toString(), (event) => {
            if (cb) {
                cb(event.detail);
            }
        })    
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