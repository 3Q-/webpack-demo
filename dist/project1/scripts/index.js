webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';


	var m1 = __webpack_require__(2);
	var m2 = __webpack_require__(4);

	var validator = __webpack_require__(5);

	__webpack_require__(6);

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
	        $('body').append(html);
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


/***/ },
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "/* line 5, ../../../../../../../usr/local/lib/ruby/gems/2.2.0/gems/compass-core-1.0.3/stylesheets/compass/reset/_utilities.scss */\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font: inherit;\n  font-size: 100%;\n  vertical-align: baseline;\n}\n\n/* line 22, ../../../../../../../usr/local/lib/ruby/gems/2.2.0/gems/compass-core-1.0.3/stylesheets/compass/reset/_utilities.scss */\nhtml {\n  line-height: 1;\n}\n\n/* line 24, ../../../../../../../usr/local/lib/ruby/gems/2.2.0/gems/compass-core-1.0.3/stylesheets/compass/reset/_utilities.scss */\nol, ul {\n  list-style: none;\n}\n\n/* line 26, ../../../../../../../usr/local/lib/ruby/gems/2.2.0/gems/compass-core-1.0.3/stylesheets/compass/reset/_utilities.scss */\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n/* line 28, ../../../../../../../usr/local/lib/ruby/gems/2.2.0/gems/compass-core-1.0.3/stylesheets/compass/reset/_utilities.scss */\ncaption, th, td {\n  text-align: left;\n  font-weight: normal;\n  vertical-align: middle;\n}\n\n/* line 30, ../../../../../../../usr/local/lib/ruby/gems/2.2.0/gems/compass-core-1.0.3/stylesheets/compass/reset/_utilities.scss */\nq, blockquote {\n  quotes: none;\n}\n/* line 103, ../../../../../../../usr/local/lib/ruby/gems/2.2.0/gems/compass-core-1.0.3/stylesheets/compass/reset/_utilities.scss */\nq:before, q:after, blockquote:before, blockquote:after {\n  content: \"\";\n  content: none;\n}\n\n/* line 32, ../../../../../../../usr/local/lib/ruby/gems/2.2.0/gems/compass-core-1.0.3/stylesheets/compass/reset/_utilities.scss */\na img {\n  border: none;\n}\n\n/* line 116, ../../../../../../../usr/local/lib/ruby/gems/2.2.0/gems/compass-core-1.0.3/stylesheets/compass/reset/_utilities.scss */\narticle, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary {\n  display: block;\n}\n\n/* line 80, share/*.png */\n.share-sprite, .share-lte20px-icon_01, .share-lte20px-icon_03, .share-lte20px-icon_05, .share-lte20px-icon_10, .share-lte20px-icon_14 {\n  background-image: url(" + __webpack_require__(9) + ");\n  background-repeat: no-repeat;\n}\n\n/* line 84, ../../../../../../../usr/local/lib/ruby/gems/2.2.0/gems/compass-core-1.0.3/stylesheets/compass/utilities/sprites/_base.scss */\n.share-lte20px-icon_01 {\n  background-position: 0 0;\n}\n\n/* line 84, ../../../../../../../usr/local/lib/ruby/gems/2.2.0/gems/compass-core-1.0.3/stylesheets/compass/utilities/sprites/_base.scss */\n.share-lte20px-icon_03 {\n  background-position: 0 -16px;\n}\n\n/* line 84, ../../../../../../../usr/local/lib/ruby/gems/2.2.0/gems/compass-core-1.0.3/stylesheets/compass/utilities/sprites/_base.scss */\n.share-lte20px-icon_05 {\n  background-position: 0 -28px;\n}\n\n/* line 84, ../../../../../../../usr/local/lib/ruby/gems/2.2.0/gems/compass-core-1.0.3/stylesheets/compass/utilities/sprites/_base.scss */\n.share-lte20px-icon_10 {\n  background-position: 0 -43px;\n}\n\n/* line 84, ../../../../../../../usr/local/lib/ruby/gems/2.2.0/gems/compass-core-1.0.3/stylesheets/compass/utilities/sprites/_base.scss */\n.share-lte20px-icon_14 {\n  background-position: 0 -58px;\n}\n\n/* line 84, ../../../../../../../usr/local/lib/ruby/gems/2.2.0/gems/compass-core-1.0.3/stylesheets/compass/utilities/sprites/_base.scss */\n.share-lte20px-icon_01 {\n  background-position: 0 0;\n}\n\n/* line 84, ../../../../../../../usr/local/lib/ruby/gems/2.2.0/gems/compass-core-1.0.3/stylesheets/compass/utilities/sprites/_base.scss */\n.share-lte20px-icon_03 {\n  background-position: 0 -16px;\n}\n\n/* line 84, ../../../../../../../usr/local/lib/ruby/gems/2.2.0/gems/compass-core-1.0.3/stylesheets/compass/utilities/sprites/_base.scss */\n.share-lte20px-icon_05 {\n  background-position: 0 -28px;\n}\n\n/* line 84, ../../../../../../../usr/local/lib/ruby/gems/2.2.0/gems/compass-core-1.0.3/stylesheets/compass/utilities/sprites/_base.scss */\n.share-lte20px-icon_10 {\n  background-position: 0 -43px;\n}\n\n/* line 12, ../../../src/project1/sass/style.scss */\nbody {\n  background: #ccc;\n}\n/* line 14, ../../../src/project1/sass/style.scss */\nbody div {\n  margin: 0;\n  padding: 0;\n}\n\n/* line 21, ../../../src/project1/sass/style.scss */\ndiv {\n  margin: 10px;\n  background-image: url(" + __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./aab.png\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())) + ");\n}\n", ""]);

	// exports


/***/ },
/* 8 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "0bcaae10b7aef218b895d16a1434f6b4.png"

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
]);