'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

exports.__esModule = true;

var _productService = require('../product-service');

var TransactionService = (function (_ProductService) {
	function TransactionService() {
		_classCallCheck(this, TransactionService);

		_ProductService.call(this);
	}

	_inherits(TransactionService, _ProductService);

	TransactionService.prototype.getEndpoint = function getEndpoint() {
		return ['Smart', 'Transactions'];
	};

	return TransactionService;
})(_productService.ProductService);

exports.TransactionService = TransactionService;