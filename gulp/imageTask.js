var gulp = require('gulp');
var shell = require('gulp-shell');
var util = require('util');
var path = require('path');
var fs = require('fs');

var through = require('through2');


var array = [
    'texturepacker',
    '%s',
    '--smart-update',
    '--format cocos2d',  
    '--opt RGBA5555',  
    '--allow-free-size',
    '--trim-mode None',
    '--max-size 2048',
    '--size-constraints POT',  
    '--trim',  
    '--enable-rotation',  
    '--dither-fs-alpha',  
    '--padding 2',
    '--data %s',
    '--sheet %s',
];



module.exports = {
    tp(folder, outPath, name){
        var src = path.join(folder, name);
        var dst = path.join(outPath, name);
        var command = util.format(array.join(' '), src, dst + '.plist', dst + '.png');
        return gulp.src('').pipe(shell([command]));
    },

    min(src, dst) {
        var command = 'gulp\\pngquant.exe --force --verbose 256 ' + src; 
        return gulp.src('').pipe(shell([command]))
            .pipe(through.obj((file, enc, cb) => {
                var oldName = src.replace('.png', '-fs8.png');
                console.log('>>>>', oldName, src);
                cb();
            }));   
    }
};