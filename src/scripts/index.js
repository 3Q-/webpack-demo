
//require('./style.css');
'use strict';
require('../styles/style.css');
require('../styles/index.css');

var ele = require('./modules/dev');
console.log('index');
//console.log(ele(),1);
document.body.appendChild(ele());
