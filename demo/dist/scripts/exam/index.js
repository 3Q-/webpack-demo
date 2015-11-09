webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	
	//require('./style.css');
	'use strict';
	__webpack_require__(1);

	var ele = __webpack_require__(7);
	console.log('exam/index');
	//console.log(ele(),1);
	document.body.appendChild(ele());


/***/ },

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	
	'use strict';
	module.exports = function(){

	    var dev = __webpack_require__(6);
	    dev();
	    var ele = document.createElement('h1');
	    //ele.innerHTML = 'Fuck Webpack\'s Family At All~~~';
	    console.log('modules/dev');
	    return ele;
	};


/***/ }

});