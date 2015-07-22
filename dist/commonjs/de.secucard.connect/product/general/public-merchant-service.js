'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var PublicMerchantService = (function (_ProductService) {
	function PublicMerchantService() {
		_classCallCheck(this, PublicMerchantService);

		_ProductService.call(this);
	}

	_inherits(PublicMerchantService, _ProductService);

	PublicMerchantService.prototype.getEndpoint = function getEndpoint() {
		return ['general', 'publicmerchants'];
	};

	PublicMerchantService.prototype.getEventTargets = function getEventTargets() {
		return [];
	};

	return PublicMerchantService;
})(_productService.ProductService);

exports.PublicMerchantService = PublicMerchantService;

PublicMerchantService.Uid = ['general', 'publicmerchants'].join('.');