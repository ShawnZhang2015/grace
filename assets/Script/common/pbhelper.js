
var ProtoBuf = require("protobufjs");
ProtoBuf.ByteBuffer.DEFAULT_NOASSERT = true;
var builder = ProtoBuf.newBuilder();


var protoFiles = [
    'ActionCode.proto',
    'Player.proto',
    'ChatMsg.proto'
];

function PBHelper() {
    this.sequence = 0;
}

PBHelper.prototype = {
    loadFile: function(path, packageName) {
        builder.importRoot = path;
        protoFiles.forEach(function (fileName) {
            ProtoBuf.protoFromFile(path +'/'+ fileName, builder);
         });   
        
        return builder.build(packageName); 
    },

}
module.exports = PBHelper;