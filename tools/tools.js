'use strict';
var fs = require('fs');
var path = require('path');


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
