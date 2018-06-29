"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Merchant = exports.Merchant = function Merchant(name, email, metadata, location, photo, photo_main) {
    _classCallCheck(this, Merchant);

    this.name = name;
    this.email = email;
    this.metadata = metadata;
    this.location = location;
    this.photo = photo;
    this.photo_main = photo_main;
};