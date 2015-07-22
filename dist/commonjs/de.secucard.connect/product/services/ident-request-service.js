'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var IdentRequestService = (function (_ProductService) {
	function IdentRequestService() {
		_classCallCheck(this, IdentRequestService);

		_ProductService.call(this);
	}

	_inherits(IdentRequestService, _ProductService);

	IdentRequestService.prototype.getEndpoint = function getEndpoint() {
		return ['services', 'identrequests'];
	};

	IdentRequestService.prototype.getEventTargets = function getEventTargets() {
		return [];
	};

	return IdentRequestService;
})(_productService.ProductService);

exports.IdentRequestService = IdentRequestService;

IdentRequestService.Uid = ['services', 'identrequests'].join('.');