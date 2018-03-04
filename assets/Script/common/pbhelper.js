
var protobuf = require("protobufjs");
var builder = protobuf.newBuilder();

var protoFiles = [
    'ActionCode.proto',
    'Player.proto',
    'ChatMsg.proto'
];

function PBHelper() {
    this.sequence = 0;
}

//let window = global || window;

PBHelper.prototype = {
    loadFile: function(path, packageName) {
        if (typeof cc !== 'undefined') {
            path = cc.sys.isNative ? cc.url.raw(path) : `res/raw-assets/${path}`;
            protobuf.Util.IS_NODE = cc.sys.isNative;
            cc.log('>>>>>>>>' + path);
        }
    
        builder.importRoot = path;
        protoFiles.forEach(function (fileName) {
            let filePath = `${path}/${fileName}`;
            protobuf.protoFromFile(filePath, builder);
        });
        
        return builder.build(packageName);
    },

}
module.exports = PBHelper;