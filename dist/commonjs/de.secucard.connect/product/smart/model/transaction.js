"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Transaction = function Transaction(basket, basketInfo, idents, merchantRef, transactionRef) {
    _classCallCheck(this, Transaction);

    this.basket = basket;
    this.basketInfo = basketInfo;
    this.idents = idents;
    this.merchantRef = merchantRef;
    this.transactionRef = transactionRef;
};

exports.Transaction = Transaction;