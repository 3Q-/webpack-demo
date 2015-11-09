'use strict';


var m1 = require('./common/moduleA');
var m2 = require('./common/moduleB');

var validator = require('validator');

require('styles/style.css');

var tpl = {
    pageA : require('./tpl/index')
};

var flag = validator.isEmail('foo@bar.com'); //=> true
    console.log(flag);
var handler = {
    init: function(){
        m1.go();
        m2.go();
        console.log('This is pageA javascript');

        var html = tpl.pageA({title:'This is pageA title'});
        $('body').append(html);
    }
};


$(function(){

    handler.init();

});


