'use strict';
var fs = require('fs');
var path = require('path');
var merge = require('merge-stream');


var core = {

    getFiles: function(dir) {
        return fs.readdirSync(dir)
            .filter(function(file) {
                return fs.statSync(path.join(dir, file)).isFile();
            });
    },

    getFolders: function(dir) {
        return fs.readdirSync(dir)
            .filter(function(file) {
                return fs.statSync(path.join(dir, file)).isDirectory();
            });
    },

    projectTask: function(projectList, fn) {

        var CONFIG = {};

        var tasks = projectList.map(function(project) {

            CONFIG.tplSrc = './src/' + project + '/tpl';
            CONFIG.tplDist = './src/' + project + '/scripts/tpl';
            CONFIG.sassSrc = './src/' + project + '/sass';
            CONFIG.cssSrc = './src/' + project + '/styles';
            CONFIG.cssDist = './dist/' + project + '/styles';
            CONFIG.imageSrc = './src/' + project + '/images';
            CONFIG.imageDist = './dist/' + project + '/images';
            CONFIG.htmlSrc = './src/' + project + '/htmls/';
            CONFIG.htmlDist = './dist/' + project + '/htmls/';
            CONFIG.scriptsSrc = './src/' + project + '/scripts/';
            CONFIG.scriptsDist = 'scripts/';
            CONFIG.webpackPath = './dist/' + project;
            CONFIG.publicPath = 'http://s.acc369.com/statics/' + project + '/';

            return fn(project, CONFIG);

        });
        return tasks;
    },

    mergeProjectTask: function(projectList, fn) {

        var tasks = core.projectTask(projectList, fn);
        return merge(tasks);
    },

    filesList: function(obj, filesList) {

        var url = obj.url,
            ext = obj.ext || '.js',
            exclude = obj.exclude || [],
            files = fs.readdirSync(url);

        files.forEach(function(file, i) {

            var stat = fs.statSync(path.resolve(url, file));

            //如果是目录，遍历它，找出里面的所有文件
            if (stat.isDirectory() && (exclude.indexOf(file) === -1)) {
                obj.url = path.resolve(url, file);
                //递归调用
                core.filesList(obj, filesList);
                return;
            }

            // 如果是文件，直接把文件名丢给回调
            if (file.indexOf(ext) !== -1) {

                filesList.push(path.resolve(url, file));
            }

        });

        return filesList;
    },

    //用于读取某个目录下指定类型（有后缀名的）的文件
    getFilesList: function(obj) {
        return core.filesList(obj, []);
    }


};


module.exports = core;
