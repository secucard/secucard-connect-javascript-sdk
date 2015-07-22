'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var IdentResultService = (function (_ProductService) {
	function IdentResultService() {
		_classCallCheck(this, IdentResultService);

		_ProductService.call(this);
	}

	_inherits(IdentResultService, _ProductService);

	IdentResultService.prototype.getEndpoint = function getEndpoint() {
		return ['services', 'identresults'];
	};

	IdentResultService.prototype.getEventTargets = function getEventTargets() {
		return ['services.identresults'];
	};

	return IdentResultService;
})(_productService.ProductService);

exports.IdentResultService = IdentResultService;

IdentResultService.Uid = ['services', 'identresults'].join('.');