'use strict';

var gulp = require('gulp');
var gulpPlugins = require('gulp-load-plugins')();
var fs = require('fs');
var path = require('path');
var tools = require('./tools/tools');

gulpPlugins.merge = require('merge-stream');
gulpPlugins.runSequence = require('run-sequence');
gulpPlugins.pngquant = require('imagemin-pngquant');
gulpPlugins.del = require('del');

var projectList = tools.getFolders('./src');
var gulpTaskList = fs.readdirSync('./tasks/');
//projectList = ['project1'];
gulpTaskList.forEach(function(taskfile) {
    require('./tasks/' + taskfile)(gulp, gulpPlugins, projectList, tools);
});


// gulp.task('webpack', function() {

//     var project_script_src = tools.getFolders('./src/scripts/');
//     var ary = [];
//     project_script_src.forEach(function(item, i) {
//         if (item !== 'common') {
//             ary.push(item);
//         }
//     });
//     var task = ary.map(function(item, i) {
//         return gulp.src('./src.js')
//             .pipe(changed('./dist', {
//                 extension: '.js'
//             }))
//             .pipe(webpack(require('./webpack.conf')(item)))
//             .pipe(gulp.dest('./dist/' + item));
//     });

//     return gulpPlugins.merge(task);


// });


// var browserSync = require('browser-sync').create();



gulp.task('serve', function() {

    // gulp.task('serve', ['build'], function() {
    // var settings = {
    //     server: {
    //         baseDir: ['./src/project1/htmls', './']
    //     }
    // };
    //browserSync.init(settings);

    gulp.watch('./src/*/tpl/**/*.html', ['tmodjs']);
    //gulp.watch('./src/scripts/**/*.js', ['webpack']);
    gulp.watch('./src/*/sass/*.scss', ['compass']);

    //gulp.watch(["./src/*/scripts/**/*.js", './src/*/htmls/**/*.html', './src/*/styles/**/*.css']).on("change", browserSync.reload);

});


// var RevAll = require('gulp-rev-all');

// gulp.task('rev', function() {

//     var revAll = new RevAll({
//         dontRenameFile: [/^\/favicon.ico$/g, '.html']
//     });
//     gulp.src(['./dist/**', './src/htmls/**'])
//         .pipe(revAll.revision())
//         .pipe(gulp.dest('./'));

// });


gulp.task('default', ['clean'], function(cb) {
    //gulpPlugins.runSequence(['tmodjs', 'compass', 'imagemin'], cb);
    gulp.start(['tmodjs', 'compass', 'imagemin']);
});
