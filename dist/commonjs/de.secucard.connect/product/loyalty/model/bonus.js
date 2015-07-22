"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bonus = function Bonus(amount, currency, balance) {
	_classCallCheck(this, Bonus);

	this.amount = amount;
	this.currency = currency;
	this.balance = balance;
};

exports.Bonus = Bonus;