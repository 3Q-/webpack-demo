'use strict';

var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('vendors', 'js/common.js');
var path = require('path');
var tools = require('./tools/tools');
var walk = require('walk'),
    fs = require('fs'),
    option = {
        followLinks: true,
        filters: ['node_modules', '.svn', '.git']
    },
    walker;



function makeEntryName() {
    var entry = {};

    var files = [];
    walker = walk.walk("/Users/xiexie/369/static/dev-acc369", option);
    walker.on("file", function(root, fileStats, next) {
        var dir = path.join(root, fileStats.name);
        files.push(dir);
        next();
    });

    walker.on("errors", function(root, nodeStatsArray, next) {
        next();

    });

    walker.on("end", function() {
        console.log(files, files.length);
    });

}
//makeEntryName();



var init = function(folder) {

    return {

        entry: {
            pageA: ['webpack/hot/dev-server','./src/scripts/page/pageA.js'],
            pageB: './src/scripts/page/pageB.js',
            vendors: ['jquery', 'validator']
        },

        output: {
            path: path.join(__dirname, 'dist/scripts'),
            filename: 'js/[name].js'
        },

        plugins: [
            commonsPlugin,
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            })
        ],
module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ],
    // devServer: {
    //         contentBase: './demo' //指定html等静态资源的位置
    //             //noInfo: true, //  --no-info option
    //     }
  },
        resolve: {
            alias: {
                common: path.join(__dirname, './src/scripts/common'),
                styles: path.join(__dirname, './src/styles'),
            }
        },
        devServer: {
            contentBase: 'src/htmls' //指定html等静态资源的位置
                //noInfo: true, //  --no-info option
        }
    };
};
var ary = [];

//for(var i =0; i<30;i++){

ary.push(init());


module.exports = ary[0];
