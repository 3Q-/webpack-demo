'use strict';
var path = require('path'),
    webpack = require('webpack'),
    fs = require('fs'),
    commonsPlugin = webpack.optimize.CommonsChunkPlugin,
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    //BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
    StringReplacePlugin = require("string-replace-webpack-plugin"),
    ManifestPlugin = require('webpack-manifest-plugin'),
    Clean = require('clean-webpack-plugin'),
    tools = require('./tools/tools'),
    webpackPlgins = [],
    entry = {},
    port = 8888,

    // 拿到的js文件全是入口文件
    project_script_files = tools.getFilesList({
        url: './src',
        ext: '.js',
        exclude: ['styles', 'images', 'modules', 'tpl', 'sass', 'html']
    }),
    // 拿到的hbs文件  用来与js入口文件做比对
    project_html_files = tools.getFilesList({
        url: './src',
        ext: '.html',
        exclude: ['styles', 'images', 'modules', 'tpl', 'sass', 'script', 'layouts'],
    }),
    processedMap = {};


var scriptSize = project_script_files.length;
var htmlSize = project_html_files.length;

project_script_files.forEach(function(script, j) {

    //  判断是.js文件  说明是入口文件
    var scriptPath = path.join(__dirname, 'src/scripts/');
    //  入口文件 从scirpts 文件夹开始命名, 去掉.js 后缀, window下的路径 \ 替换喂 /
    var entryKey = script.replace(scriptPath, '').replace(/\\/g, '/').replace(/\.js$/, '');
    //  入口文件对应的js  window下的路径 \ 替换喂 /
    var entryValue = script.replace(/\\/g, '/');
    //  设置一个数组 方便hot替换  跟gulp 结合会用到数组
    entry[entryKey] = [entryValue];


    for (var i = 0; i < htmlSize; i++) {

        var html = project_html_files[i];
        // js入口文件 对应的html文件  路径放在html里
        var htmlMatch = html.replace('.html', '.js').replace('/html/', '/scripts/').replace('\\html\\', '\\scripts\\');

        // 匹配文件 hbs和js入口文件
        var conf = {};
        // 这里可以读取一个json文件 方便配置页面的title keyword 等一些通用的配置  具体情况
        conf.title = 'Fuck webpack\'s family at all';
        conf.keyword = 'webpack web xieqiyong';
        conf.inject = 'body';
        conf.template = html;
        conf.filename = html.replace(path.join(__dirname, 'src/'), ''); //.replace('.hbs', '.html');
        conf.minify = {
            collapseWhitespace: true,
            minifyCSS: true,
            removeComments: true,
            removeScriptTypeAttributes: true
        };

        if (htmlMatch === script) {
            //  把对应的css js 插入到对应的html中
            conf.chunks = ['vendors', entryKey];
            //  标记处理过的html文件
            processedMap[html] = true;
            webpackPlgins.push(new HtmlWebpackPlugin(conf));

            // 循环到最后一个js入口文件的时候 有对应的html文件不跳出循环
            // 因为有一些 html文件 没有对应的js入口文件 在最后的一个循环中处理
            if (scriptSize - 1 !== j) {
                break;
            }
        }
        //  判断是最后一个入口文件 平且html文件没有被处理
        //  对于那些有html文件 没有相对应的js入口文件的处理 把公共的 css js 插入
        if (scriptSize - 1 === j && !processedMap[html]) {
            conf.chunks = ['vendors'];
            webpackPlgins.push(new HtmlWebpackPlugin(conf));
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
    }),
    // new BrowserSyncPlugin({
    //     host: 'localhost',
    //     port: port,
    //     server: {
    //         baseDir: ['./']
    //     }
    // }),
    new ManifestPlugin({
        fileName: 'log/static.json',
    }),
    new StringReplacePlugin()

);
//entry.htmlindex = './src/html/index.html';
module.exports = {
    // 入口文件
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'scripts/[name].js?[chunkhash:9]',
        publicPath: '/dist/' //没把握的时候尽量不要设置这个变量！！！！！！！！
    },
    resolve: {
        alias: {
            //common: path.join(__dirname, './src/scripts/common'),
            styles: path.join(__dirname, './src/styles'),
            images: path.join(__dirname, './src/images')
        }
    },
    module: {
        loaders: [{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            }, {
                test: /\.(png|jpg|gif)$/,
                //小于8k的图片就转成base64  大于8k就生成图片
                loader: 'url-loader?limit=892&name=images/[name].[ext]?[hash:9]',
            }, {
                test: /\.tpl$/,
                loader: 'handlebars-loader?helperDirs[]=' + __dirname + '/helpers'
            }, {
                test: /\.html$/,
                loader: 'html-loader'
            }, {
                test: /\.tpl$/,
                loader: StringReplacePlugin.replace({
                    replacements: [{
                        pattern: /sourceMappingURL/ig,
                        replacement: function(match, p1, offset, string) {
                            console.log(match, p1, offset, string);
                            return 'xiexiexiexiexie';
                            //return secrets.web[p1];
                        }
                    }]
                })
            }

        ]
    },

    // webpack-dev-server 的配置
    devServer: {
        port: port,
        hot: true,
        inline: true
    },
    plugins: webpackPlgins
};
