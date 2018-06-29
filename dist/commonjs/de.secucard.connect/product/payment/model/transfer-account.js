"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TransferAccount = exports.TransferAccount = function TransferAccount(account_owner, accountnumber, iban, bic, bankcode) {
    _classCallCheck(this, TransferAccount);

    this.account_owner = account_owner;
    this.accountnumber = accountnumber;
    this.iban = iban;
    this.bic = bic;
    this.bankcode = bankcode;
};