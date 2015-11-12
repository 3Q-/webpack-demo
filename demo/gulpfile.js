'use strict';

var gulp = require('gulp'),
    gulpPlugins = require('gulp-load-plugins')(),
    fs = require('fs'),
    path = require('path'),
    tools = require('./tools/tools'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    Clean = require('clean-webpack-plugin'),
    webpackConfig = require('./webpack.config.js'),
    port = 8888;

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
devConfig.devtool = 'sourcemap';
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
    myConfig.entry.index.unshift('webpack-dev-server/client?http://localhost:' + port, 'webpack/hot/dev-server');

    new WebpackDevServer(webpack(myConfig), {
        publicPath: myConfig.output.publicPath,
        stats: {
            colors: true
        }
    }).listen(port, 'localhost', function(err) {
        if (err) {
            console.log('~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~');
            console.log(err);
        }
        console.log('~~~~~~~~~~\'^.^\'~~~~~~');
        console.log('server run at port ' + port + ' http://localhost:' + port + '/webpack-dev-server  !!!');
    });

});

gulp.task('serve', ['build-dev'], function() {
    gulp.watch(['src/**/*'], ['build-dev']);
});


gulp.task('default', ['webpack-dev-server']);
