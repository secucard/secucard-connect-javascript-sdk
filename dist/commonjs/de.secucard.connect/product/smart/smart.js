'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _transactionService = require('./transaction-service');

var Smart = function Smart() {
	_classCallCheck(this, Smart);
};

exports.Smart = Smart;

var Basket = function Basket() {
	_classCallCheck(this, Basket);

	this.products = [];
	this.texts = [];
};

exports.Basket = Basket;

Smart.TransactionService = _transactionService.TransactionService;