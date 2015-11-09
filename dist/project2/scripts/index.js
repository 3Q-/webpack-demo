webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';


	var m1 = __webpack_require__(2);
	var m2 = __webpack_require__(4);

	var validator = __webpack_require__(5);

	//require('../../styles/page/style.css');

	var tpl = {
	    pageA : __webpack_require__(6)
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


/***/ },
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*TMODJS:{"version":1,"md5":"7bfac5edd10942c2af45692c92b72b88"}*/
	var template = __webpack_require__(7);

	module.exports = template("good", "<span>span</span> fdsd <div>good tempaltes</div> ");

/***/ },
/* 7 */
/***/ function(module, exports) {

	/*TMODJS:{}*/
	!function() {
	    function template(filename, content) {
	        return (/string|function/.test(typeof content) ? compile : renderFile)(filename, content);
	    }
	    function toString(value, type) {
	        return "string" != typeof value && (type = typeof value, "number" === type ? value += "" : value = "function" === type ? toString(value.call(value)) : ""), 
	        value;
	    }
	    function escapeFn(s) {
	        return escapeMap[s];
	    }
	    function escapeHTML(content) {
	        return toString(content).replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
	    }
	    function each(data, callback) {
	        if (isArray(data)) for (var i = 0, len = data.length; len > i; i++) callback.call(data, data[i], i, data); else for (i in data) callback.call(data, data[i], i);
	    }
	    function resolve(from, to) {
	        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/, dirname = ("./" + from).replace(/[^/]+$/, ""), filename = dirname + to;
	        for (filename = filename.replace(/\/\.\//g, "/"); filename.match(DOUBLE_DOT_RE); ) filename = filename.replace(DOUBLE_DOT_RE, "/");
	        return filename;
	    }
	    function renderFile(filename, data) {
	        var fn = template.get(filename) || showDebugInfo({
	            filename: filename,
	            name: "Render Error",
	            message: "Template not found"
	        });
	        return data ? fn(data) : fn;
	    }
	    function compile(filename, fn) {
	        if ("string" == typeof fn) {
	            var string = fn;
	            fn = function() {
	                return new String(string);
	            };
	        }
	        var render = cache[filename] = function(data) {
	            try {
	                return new fn(data, filename) + "";
	            } catch (e) {
	                return showDebugInfo(e)();
	            }
	        };
	        return render.prototype = fn.prototype = utils, render.toString = function() {
	            return fn + "";
	        }, render;
	    }
	    function showDebugInfo(e) {
	        var type = "{Template Error}", message = e.stack || "";
	        if (message) message = message.split("\n").slice(0, 2).join("\n"); else for (var name in e) message += "<" + name + ">\n" + e[name] + "\n\n";
	        return function() {
	            return "object" == typeof console && console.error(type + "\n\n" + message), type;
	        };
	    }
	    var cache = template.cache = {}, String = this.String, escapeMap = {
	        "<": "&#60;",
	        ">": "&#62;",
	        '"': "&#34;",
	        "'": "&#39;",
	        "&": "&#38;"
	    }, isArray = Array.isArray || function(obj) {
	        return "[object Array]" === {}.toString.call(obj);
	    }, utils = template.utils = {
	        $helpers: {},
	        $include: function(filename, data, from) {
	            return filename = resolve(from, filename), renderFile(filename, data);
	        },
	        $string: toString,
	        $escape: escapeHTML,
	        $each: each
	    }, helpers = template.helpers = utils.$helpers;
	    template.get = function(filename) {
	        return cache[filename.replace(/^\.\//, "")];
	    }, template.helper = function(name, helper) {
	        helpers[name] = helper;
	    }, module.exports = template, template.helper("dateFormat", function(date, format) {
	        date = new Date(date);
	        var map = {
	            M: date.getMonth() + 1,
	            d: date.getDate(),
	            h: date.getHours(),
	            m: date.getMinutes(),
	            s: date.getSeconds(),
	            q: Math.floor((date.getMonth() + 3) / 3),
	            S: date.getMilliseconds()
	        };
	        return format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
	            var v = map[t];
	            return void 0 !== v ? (all.length > 1 && (v = "0" + v, v = v.substr(v.length - 2)), 
	            v) : "y" === t ? (date.getFullYear() + "").substr(4 - all.length) : all;
	        });
	    });
	}();

/***/ }
]);