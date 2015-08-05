"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Customer = function Customer(merchant, contact, created, updated, contract) {
  _classCallCheck(this, Customer);

  this.merchant = merchant;
  this.contact = contact;
  this.created = created;
  this.updated = updated;
  this.contract = contract;
};

exports.Customer = Customer;