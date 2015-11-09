/*TMODJS:{"version":2,"md5":"9032f4a5300f97388d8aa98b8a335e16"}*/
var template = require("./template");

module.exports = template("eee", function($data) {
    "use strict";
    var $utils = this, $escape = ($utils.$helpers, $utils.$escape), item = $data.item, $out = "";
    return $out += "<span>span</span> dsfsd <div>good tempaltes</div> ", $out += $escape(item.id), 
    $out += " ", new String($out);
});