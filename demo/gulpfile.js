'use strict';

var gulp = require('gulp'),
    gulpPlugins = require('gulp-load-plugins')(),
    fs = require('fs'),
    path = require('path'),
    moment = require('moment'),
    tools = require('./tools/tools'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    Clean = require('clean-webpack-plugin'),
    webpackConfig = require('./webpack.config.js'),
    port = 8888,
    site = {
        title: 'site title',
        keyword: 'site keyword'
    };

gulpPlugins.del = require('del');

// 打包生产环境的文件
gulp.task("webpack-build-pro", function(callback) {

    var myConfig = Object.create(webpackConfig);

    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
        //new Clean(['dist'])
    );

    webpack(myConfig, function(err, stats) {

        if (err) {
            throw new gulpPlugins.util.PluginError("webpack:build", err);
        }
        callback();
    });

});


// 打包开发环境代码
var devConfig = Object.create(webpackConfig);
//devConfig.devtool = 'sourcemap';
devConfig.debug = true;
var devCompiler = webpack(devConfig);

gulp.task('webpack-build-dev', function(cb) {
    devCompiler.run(function(err, stats) {
        if (err) {
            throw new gulpPlugins.util.PluginError('build-dev', err);
        }
        cb();
    });
});


// 打包开发环境代码 不能也gulp 公用
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
            throw new gulpPlugins.util.PluginError('webpack-dev-server', err);
        }
    });

});



gulp.task('tpl', function() {

    return gulp.src(['./src/pages/**/*.html'])
        .pipe(gulpPlugins.changed('./src/html'))
        // 有报错直接输出 不停watch任务
        .pipe(gulpPlugins.plumber({
            errorHandler: function(error) {
                gulpPlugins.util.log(error);
                this.emit('end');
            }
        }))
        // 获取模板上的数据
        .pipe(gulpPlugins.frontMatter({
            property: 'data'
        }))
        // 模板layout结合
        .pipe(gulpPlugins.htmlExtend({
            annotations: true,
            verbose: false
        }))

        .pipe(gulpPlugins.data(function(file) {
            file.data.title = file.data.title || site.title;
            file.data.keyword = file.data.keyword || site.keyword;
            file.data.path = file.path;
        }))
        // 初始化模板
        .pipe(gulpPlugins.template())
        // 美化html 不是压缩
        .pipe(gulpPlugins.prettify({
            indent_size: 4
        }))
        // 输出
        .pipe(gulp.dest('./src/html'))

        .pipe(gulpPlugins.notify({
            title: '<%= file.relative %>',
            message: "后端模板生成成功 <%= options.date %>",
            templateOptions: {
                date: moment().format('hh:mm:ss')
            }
        }))
        //  把页面上的初始数据提取
        .pipe(gulpPlugins.pluck('data', 'tpl-data.json'))
        .pipe(gulpPlugins.data(function(file) {
            file.contents = new Buffer(JSON.stringify(file.data));
        }))
        //输出
        .pipe(gulp.dest('./dist/log'))
        .pipe(gulpPlugins.notify({
            title: '<%= file.relative %>',
            message: "模板初始数据生成成功 <%= options.date %>",
            templateOptions: {
                date: moment().format('hh:mm:ss')
            }
        }));
});


gulp.task('compass', function(cb) {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(gulpPlugins.plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        //  编译sass img sprite
        .pipe(gulpPlugins.compass({
            bundleExec: true,
            generated_images_path: './src/styles',
            comments: true,
            relative: true,
            config_file: './config.rb',
            css: './src/styles',
            sass: './src/sass',
            image: './src/images',
        }))
        .on('end', cb);
});


gulp.task('del', function() {
    return gulpPlugins.del([
        './dist',
        './src/styles',
        './src/html'
    ]);
});

// 准备好静态文件
gulp.task('staticBuild', gulp.parallel('tpl', 'compass', function(done) {
    done();
}));

// 打包开发环境代码
gulp.task('build-dev', gulp.series('del', 'staticBuild', 'webpack-build-dev', function(done) {
    done();
}));


gulp.task('build', gulp.series('del', 'tpl','compass', 'webpack-build-pro', function(done) {
    done();
}));



var browserSync = require('browser-sync');
var reload = browserSync.reload;

// 服务
gulp.task('default', gulp.series('build-dev', function(done) {
    var settings = {
        server: {
            baseDir: './',
            index:'dist/html/index.html'
        }
    };

    browserSync.init(settings);

    var tpl = gulp.watch('./src/pages/**/*.html', gulp.series('tpl', 'webpack-build-dev', reload));
    var compass = gulp.watch('./src/sass/**/*.scss', gulp.series('compass', 'webpack-build-dev', reload));
    var scripts = gulp.watch('./src/scripts/**/*.js', gulp.series('webpack-build-dev', reload));
    var img = gulp.watch('./src/images/**/*', gulp.series('webpack-build-dev', reload));
}));
