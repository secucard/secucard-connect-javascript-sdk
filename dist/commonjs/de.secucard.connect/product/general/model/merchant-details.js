"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MerchantDetails = exports.MerchantDetails = function MerchantDetails(store, merchant, _news, _balance, _points) {
    _classCallCheck(this, MerchantDetails);

    this.store = store;
    this.merchant = merchant;
    this._news = _news;
    this._balance = _balance;
    this._points = _points;
};