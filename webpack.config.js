'use strict';

var webpack = require('webpack');
var commonsPlugin = webpack.optimize.CommonsChunkPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var path = require('path');
var tools = require('./tools/tools');
var projects = tools.getFolders('./src');

var reg = /(.+)\.js$/;

var makeEntry = function() {

    var configAry = [];


    projects.map(function(project) {

        if (project === 'common') {

            return;
        }

        project = project + '/';

        var entry = {};
        var htmlWebpackPlugins = [];
        var scriptsSrc = './src/' + project + 'scripts/';
        var scriptsDist = 'scripts/';
        var project_script_file = tools.getFiles(scriptsSrc);

        project_script_file.forEach(function(file, j) {

            var result = file.match(reg);

            if (result) {

                var script_name = result[1];
                var htmlPath = 'htmls/' + script_name + '.html';
                var htmlSrcPath = './src/' + project + htmlPath;
                var htmlDistPath = htmlPath;

                entry[script_name] = scriptsSrc + script_name;

                var conf = {};
                conf.inject = 'body';
                conf.title="Fuck webpack's family at all~~~~~~";
                conf.keyword='webpack web xieqiyong';
                conf.template = htmlSrcPath;
                conf.filename = htmlDistPath;
                conf.chunks = ['vendors', script_name];
                conf.minify = {
                    collapseWhitespace:true,
                    minifyCSS:true,
                    removeComments:true,
                    removeScriptTypeAttributes:true
                };
                htmlWebpackPlugins.push(new HtmlWebpackPlugin(conf));

            }

        });

        entry.vendors = ['jquery', 'validator'];



        var configg = {

            entry: entry,

            output: {
                path: path.join(__dirname, './dist/', project),
                filename: 'scripts/[name].js?[chunkhash]',
                publicPath: 'http://s.acc369.com/statics/' + project
            },
            module: {
                loaders: [{
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
                }, {
                    test: /\.(png|jpg|gif)$/,
                    loader: 'url-loader?limit=192'
                }]
            },
            plugins: [
                new commonsPlugin('vendors', scriptsDist + 'common.js?[chunkhash]'),
                new ExtractTextPlugin('styles/[name]-require.css?[contenthash]'),
                new webpack.ProvidePlugin({
                    $: 'jquery',
                    jQuery: 'jquery',
                    'window.jQuery': 'jquery'
                })
                //new webpack.optimize.UglifyJsPlugin({minimize: true})
            ],
            devServer: {
                contentBase: './dist' //指定html等静态资源的位置
                    //noInfo: true, //  --no-info option
            },
            resolve: {
                alias: {
                    //common: path.join(__dirname, './src/scripts/common'),
                    styles: path.join(__dirname, './dist/' + project + 'styles')
                }
            }
        };

        configg.plugins = configg.plugins.concat(htmlWebpackPlugins);

        configAry.push(configg);

    });

    return configAry;

};

module.exports = makeEntry();
