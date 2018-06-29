"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Assignment = exports.Assignment = function Assignment(type, owner, created) {
    _classCallCheck(this, Assignment);

    this.type = type;
    this.owner = owner;
    this.created = created;
};