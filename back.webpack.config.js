'use strict';
var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var commonsPlugin = webpack.optimize.CommonsChunkPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var tools = require('../tools/tools');
var projects = tools.getFolders('./src');
var script_reg = /(.+)\.js$/;
var html_reg = /(.+)\.html$/;
var project_script_files = tools.getFiles('./src/scripts');
var project_html_files = tools.getFiles('./src/html');
var webpackPlgins = [];
var entry = {};

project_script_files.forEach(function(script, j) {

    var script_result = script.match(script_reg);

    //  判断是.js文件  说明是入口文件

    if (script_result) {

        var script_name = script_result[1];

        var entryValue = './src/scripts/' + script_name + '.js';

        //设置一个数组 方便hot替换

        entry[script_name] = (script_name === 'index' ? [entryValue] : entryValue);

        var hasHtml = false;

        for (var i = 0; i < project_html_files.length; i++) {
            var html = project_html_files[i];
            var html_result = html.match(html_reg);
            if (html_result) {
                var html_name = html_result[1];
                if (html_name === script_name) {
                    hasHtml = true;
                    break;
                }
            }
        }

        if (hasHtml) {

            var html_file = './src/html/' + script_name + '.html';
            var conf = {};

            conf.title = "Fuck webpack's family at all~~~~~~";
            conf.keyword = 'webpack web xieqiyong';


            conf.inject = 'body';
            conf.template = html_file;
            conf.filename = './html/' + script_name + '.html';
            conf.chunks = ['vendors', script_name];
            // conf.minify = {
            //     collapseWhitespace: true,
            //     minifyCSS: true,
            //     removeComments: true,
            //     removeScriptTypeAttributes: true
            // };
            webpackPlgins.push(new HtmlWebpackPlugin(conf));
        }

    }
});


//entry.vendors = ['jquery'];
entry.index.unshift('webpack/hot/dev-server');

webpackPlgins.push(
    new commonsPlugin('scripts/vendors.js'),
    new ExtractTextPlugin('styles/[name].css'),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
    })
);
console.log(entry);

module.exports = {

    //entry: entry,
    // entry: {
    //     index: './src/scripts/index.js',
    //     list:'./src/scripts/list.js'
    // },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'scripts/[name].js',
        publicPath: '/dist/'
    },

    //resolve: ['', '.js', '.css'],

    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=400'
        }]
        // devServer: {
        //     contentBase: './src/html'

        // }
    },

    plugins: webpackPlgins
};



//判断文件夹是否存在
// var path = require('path');
// path.exists("/path", function(result) {
//     console.log(result);
// });
// 判断文件是否存在
// var fs = require('fs');
// fs.exists("/file.js", function(result) {
//     console.log(result);
// });
