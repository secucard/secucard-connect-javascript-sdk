"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ident = function Ident(type, prefix, name, length, value, valid) {
    _classCallCheck(this, Ident);

    this.type = type;
    this.prefix = prefix;
    this.name = name;
    this.length = length;
    this.value = value;
    this.valid = valid;
};

exports.Ident = Ident;