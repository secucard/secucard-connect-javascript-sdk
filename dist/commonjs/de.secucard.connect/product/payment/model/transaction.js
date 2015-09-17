"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Transaction = function Transaction(customer, contract, amount, currency, purpose, order_id, trans_id, status, transaction_status) {
    _classCallCheck(this, Transaction);

    this.customer = customer;
    this.contract = contract;
    this.amount = amount;
    this.currency = currency;
    this.purpose = purpose;
    this.order_id = order_id;
    this.trans_id = trans_id;
    this.status = status;
    this.transaction_status = transaction_status;
};

exports.Transaction = Transaction;