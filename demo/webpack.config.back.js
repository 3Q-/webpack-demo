'use strict';
var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var commonsPlugin = webpack.optimize.CommonsChunkPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');



module.exports = {

    entry: {
        //index: ['webpack/hot/dev-server','./src/scripts/index.js'],
        demo: './src/scripts/demo.js',
        index: './src/scripts/index.js',
        list: './src/scripts/list.js',
    },
    output: {
        path: './dist',
        filename: 'scripts/[name].js',
        publicPath: '/dist/'  //没把握的时候尽量不要设置这个变量！！！！！！！！
    },

    module: {
        loaders: [{
                test: /\.jpg$/,
                loader: "file-loader"
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            }, {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8910'
            }
        ]
        // devServer: {
        //     contentBase: 'dist/'  //这个路径是相对publicPath进行的
        // }
    },

    plugins: [
        new commonsPlugin({
            name: 'vendors'
        }),
        new ExtractTextPlugin('styles/[name].css'),

        new HtmlWebpackPlugin({
            inject: 'body',
            template: './src/html/demo.html',
            filename: './html/demo.html',
            chunks: ['vendors', 'demo'],
            title: "Fuck webpack's family at all"
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            template: './src/html/list.html',
            filename: './html/list.html',
            chunks: ['vendors', 'list'],
            title: "Fuck webpack's family at all",
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            template: './src/html/index.html',
            filename: './html/index.html',
            chunks: ['vendors', 'index'],
            title: "Fuck webpack's family at all",
        })

    ]
};
