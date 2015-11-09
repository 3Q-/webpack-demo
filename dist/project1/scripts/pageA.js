webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var m1 = __webpack_require__(2);
	var m2 = __webpack_require__(4);

	var validator = __webpack_require__(5);

	//require('../../styles/page/style.css');

	var tpl = {
	    pageA : __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./tpl/index\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	};

	var flag = validator.isEmail('foo@bar.com'); //=> true
	    console.log(flag);
	var handler = {
	    init: function(){
	        m1.go();
	        m2.go();
	        console.log('This is pageA javascript');

	        var html = tpl.pageA({title:'This is pageA title'});
	        $('body').html(html);
	    }
	};


	$(function(){

	    handler.init();

	});



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	var log = __webpack_require__(3);
	var core = {
	    go: function(){
	        console.log($('body').size(), 'console at moduleA');
	        log('这里是moduleA');
	    }
	};
	module.exports = core;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	module.exports = function(msg){
	    console.log($('body').size());
	    console.log('here');
	    console.log(msg +' console at ' + new Date().getTime());
	};


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var log = __webpack_require__(3);

	module.exports = {
	    go: function(){
	        log('这里是moduleB');
	    }
	};


/***/ }
]);