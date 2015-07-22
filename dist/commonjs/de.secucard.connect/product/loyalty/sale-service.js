'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var SaleService = (function (_ProductService) {
	function SaleService() {
		_classCallCheck(this, SaleService);

		_ProductService.call(this);
	}

	_inherits(SaleService, _ProductService);

	SaleService.prototype.getEndpoint = function getEndpoint() {
		return ['loyalty', 'sales'];
	};

	SaleService.prototype.getEventTargets = function getEventTargets() {
		return [];
	};

	return SaleService;
})(_productService.ProductService);

exports.SaleService = SaleService;

SaleService.Uid = ['loyalty', 'sales'].join('.');