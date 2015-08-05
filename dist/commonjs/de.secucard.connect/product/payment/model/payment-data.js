"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PaymentData = function PaymentData(owner, iban, bic, bankname) {
  _classCallCheck(this, PaymentData);

  this.owner = owner;
  this.iban = iban;
  this.bic = bic;
  this.bankname = bankname;
};

exports.PaymentData = PaymentData;