var gulp = require('gulp');
var fsync = require('gulp-files-sync');
var path = require('path');

var imageTask = require('./gulp/imageTask');

gulp.task('res', function() {
    fsync(
        ['src/**', '!src/**/*.js', '!src/**/*.meta'], 
        'dest', 
        {
            verbose: true,
            base: 'src',
            updateAndDelete: true,
            ignoreInDest: ''
        }).end();
});



const imageSrcRoot = './美术资源';
const imageOutPath = './美术资源/out/';

gulp.task('tp-common', ()=>{
     return imageTask.tp(imageSrcRoot, imageOutPath, 'common');
});
gulp.task('tp-fruit', ()=>{
     return imageTask.tp(imageSrcRoot, imageOutPath, 'fruit');
});
gulp.task('tp-hall', ()=>{
     return imageTask.tp(imageSrcRoot, imageOutPath, 'hall');
});

gulp.task('imgmin', ()=>{
    return imageTask.min(imageOutPath + '*.png', './美术资源/out/min');
});


gulp.task('tp-all', ['tp-common', 'tp-fruit', 'tp-hall']);