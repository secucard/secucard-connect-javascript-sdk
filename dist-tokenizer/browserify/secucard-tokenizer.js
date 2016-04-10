(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.secucardTokenizer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function ajax(url, callback, data, x) {
    try {
        x = new (XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
        x.open(data ? 'POST' : 'GET', url, 1);

        x.setRequestHeader('Content-type', 'application/json');
        x.onreadystatechange = function () {
            x.readyState > 3 && callback && callback(x.responseText, x);
        };
        x.send(data);
    } catch (e) {
        window.console && console.log(e);
    }
}

var host = 'https://tk.secupay.ag';

var Tokenizer = (function () {
    function Tokenizer() {
        _classCallCheck(this, Tokenizer);
    }

    Tokenizer.prototype.createToken = function createToken(payload, handler) {

        var _handler = function _handler(responseText, xhr) {
            responseText && handler && handler(JSON.parse(responseText), xhr);
        };

        ajax(host + '/create', _handler, payload);
    };

    return Tokenizer;
})();

var SecucardTokenizer = {
    description: 'SecucardTokenizer for browser'
};

SecucardTokenizer.create = function () {

    return new Tokenizer();
};

exports['default'] = SecucardTokenizer;
module.exports = exports['default'];
},{}]},{},[1])(1)
});