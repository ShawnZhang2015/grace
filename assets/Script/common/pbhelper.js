
var ProtoBuf = require("protobufjs");
var async = require('async');

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
        if (window.cc) {
            cc.log('-----------this is cocos')
            path = cc.sys.isNative ? cc.url.raw(path) : `res/raw-assets/${path}`;
            ProtoBuf.Util.IS_NODE = cc.sys.isNative;
            cc.log('>>>>>>>>' + path);
        }
    
        builder.importRoot = path;
        protoFiles.forEach(function (fileName) {
            let filePath = `${path}/${fileName}`;
            cc.log(filePath);
            ProtoBuf.protoFromFile(filePath, builder);
        });
        
        return builder.build(packageName);
    },

}
module.exports = PBHelper;