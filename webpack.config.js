'use strict';
var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var commonsPlugin = webpack.optimize.CommonsChunkPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Clean = require('clean-webpack-plugin');
var tools = require('./tools/tools');
var webpackPlgins = [];
var entry = {};

var project_script_files = tools.getFilesList({
    url: './src',
    ext: '.js',
    exclude: ['styles', 'images', 'modules', 'tpl', 'sass', 'html']
});
var project_html_files = tools.getFilesList({
    url: './src',
    ext: '.html',
    exclude: ['styles', 'images', 'modules', 'tpl', 'sass', 'script'],
});

project_script_files.forEach(function(script, j) {

    //  判断是.js文件  说明是入口文件
    var string = path.join(__dirname, 'src/scripts/');
    var entryKey = script.replace(string, '').replace('.js', '');
    var entryValue = script;

    //设置一个数组 方便hot替换  跟gulp 结合会用到数组
    entry[entryKey] = (entryKey === 'index' ? [entryValue] : entryValue);

    for (var i = 0; i < project_html_files.length; i++) {

        var html = project_html_files[i];

        var htmlMatch = html.replace('.html', '.js').replace('/html/', '/scripts/');

        // 匹配文件 html和js入口文件
        if (htmlMatch === script) {

            var conf = {};
            // 这里可以读取一个json文件 方便配置页面的title keyword 等一些通用的配置  具体情况

            conf.title = "Fuck webpack's family at all~~~~~~";
            conf.keyword = 'webpack web xieqiyong';

            conf.inject = 'body';
            conf.template = html;
            conf.filename = html.replace(path.join(__dirname, 'src'), '.');
            conf.chunks = ['vendors', entryKey];
            conf.minify = {
                collapseWhitespace: true,
                minifyCSS: true,
                removeComments: true,
                removeScriptTypeAttributes: true
            };
            //  把对应的css js 插入到对应的html中
            webpackPlgins.push(new HtmlWebpackPlugin(conf));
            break;
        }
    }

});


entry.vendors = ['jquery'];
//entry.index.unshift('webpack/hot/dev-server');
webpackPlgins.push(
    new commonsPlugin('vendors', 'scripts/vendors.js?[hash:9]'),
    //提出样式
    new ExtractTextPlugin('styles/[name].css?[contenthash:9]'),
    //公共组建 比如jquery  不用每个文件都require一次 直接$
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
    })
);

module.exports = {
    // 入口文件
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'scripts/[name].js?[chunkhash:9]',
        publicPath: '/dist/' //没把握的时候尽量不要设置这个变量！！！！！！！！
    },
    module: {
        loaders: [
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }, {
            test: /\.(png|jpg|gif)$/,
            //小于8k的图片就转成base64  大于8k就生成图片
            loader: 'url-loader?limit=8192&name=images/[name].[ext]?[hash:8]'
        }]
    },

    // webpack-dev-server 的配置
    devServer: {
        port: 8888,
        hot: true,
        inline: true
    },
    plugins: webpackPlgins
};
