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

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var Clean = require('clean-webpack-plugin');
var webpackConfig = require('./webpack.config.js');


gulp.task("build", function(callback) {

    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);

    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new Clean(['dist'])
    );

    // run webpack
    webpack(myConfig, function(err, stats) {
        if (err) {
            throw new gulpPlugins.util.PluginError("webpack:build", err);
        }
        callback();
    });
});



var devConfig = Object.create(webpackConfig);
devConfig.devtool = 'eval';
devConfig.debug = true;
var devCompiler = webpack(devConfig);

gulp.task('build-dev', function(cb) {

    devCompiler.run(function(err, stats) {
        if (err) {
            throw new gulpPlugins.util.PluginError('build-dev', err);
        }
        cb();
    });

});


gulp.task('webpack-dev-server', function() {

    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = 'eval';
    myConfig.debug = true;
    myConfig.plugins = myConfig.plugins || [];
    myConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    myConfig.entry.index.unshift('webpack-dev-server/client?http://localhost:8888', 'webpack/hot/dev-server');

    new WebpackDevServer(webpack(myConfig), {
        publicPath: myConfig.output.publicPath,
        stats: {
            colors: true
        }
    }).listen(8888, 'localhost', function(err) {
        if (err) {
            console.log('~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~');
            console.log(err);
        }
        console.log('~~~~~~~~~~\'^.^\'~~~~~~');
        console.log('server run at port 8888 http://localhost:8888/webpack-dev-server  !!!');
    });

});

gulp.task('serve', ['build-dev'], function() {
    gulp.watch(['src/**/*'], ['build-dev']);
});

gulp.task('default', ['webpack-dev-server']);
