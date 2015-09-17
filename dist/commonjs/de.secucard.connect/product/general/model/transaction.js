"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Transaction = function Transaction(merchant, amount, last_change, type, details, currency) {
    _classCallCheck(this, Transaction);

    this.merchant = merchant;
    this.amount = amount;
    this.last_change = last_change;
    this.type = type;
    this.details = details;
    this.currency = currency;
};

exports.Transaction = Transaction;