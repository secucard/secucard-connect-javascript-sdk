'use strict';

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

exports.__esModule = true;

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