var PBHelper = require('./pbhelper.js');
global.pbHelper = new PBHelper();
global.PB = pbHelper.loadFile('res/raw-assets/resources/proto','grace.proto.msg');

var socket = require('./socket');
global.socket = socket('localhost:3000');