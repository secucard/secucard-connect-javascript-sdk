'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var DeliveryAddressService = (function (_ProductService) {
	function DeliveryAddressService() {
		_classCallCheck(this, DeliveryAddressService);

		_ProductService.call(this);
	}

	_inherits(DeliveryAddressService, _ProductService);

	DeliveryAddressService.prototype.getEndpoint = function getEndpoint() {
		return ['general', 'deliveryaddresses'];
	};

	DeliveryAddressService.prototype.getEventTargets = function getEventTargets() {
		return [];
	};

	return DeliveryAddressService;
})(_productService.ProductService);

exports.DeliveryAddressService = DeliveryAddressService;

DeliveryAddressService.Uid = ['general', 'deliveryaddresses'].join('.');