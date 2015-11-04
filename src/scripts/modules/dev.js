
'use strict';
module.exports = function(){

    var dev = require('./common');
    dev();
    var ele = document.createElement('h1');
    //ele.innerHTML = 'Fuck Webpack\'s Family At All~~~';
    console.log('modules/dev');
    return ele;
};
