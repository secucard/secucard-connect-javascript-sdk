'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var CustomerService = (function (_ProductService) {
	function CustomerService() {
		_classCallCheck(this, CustomerService);

		_ProductService.call(this);
	}

	_inherits(CustomerService, _ProductService);

	CustomerService.prototype.getEndpoint = function getEndpoint() {
		return ['payment', 'customers'];
	};

	CustomerService.prototype.getEventTargets = function getEventTargets() {
		return [];
	};

	return CustomerService;
})(_productService.ProductService);

exports.CustomerService = CustomerService;

CustomerService.Uid = ['payment', 'customers'].join('.');