
//require('./style.css');
'use strict';
require('../styles/style.css');
var tpl = require('../tpl/index.tpl');


var html = tpl({id:11111});

console.log(11111, html);

$('body').append(html);

var ele = require('./modules/dev');
console.log('index');
//console.log(ele(),1);
document.body.appendChild(ele());
