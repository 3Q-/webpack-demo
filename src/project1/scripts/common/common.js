'use strict';
module.exports = function(msg){
    console.log($('body').size());
    console.log('here');
    console.log(msg +' console at ' + new Date().getTime());
};

