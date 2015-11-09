'use strict';
var log = require('./common');
var core = {
    go: function(){
        console.log($('body').size(), 'console at moduleA');
        log('这里是moduleA');
    }
};
module.exports = core;
