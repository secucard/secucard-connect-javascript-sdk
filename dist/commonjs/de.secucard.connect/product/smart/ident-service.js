'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var IdentService = (function (_ProductService) {
	function IdentService() {
		_classCallCheck(this, IdentService);

		_ProductService.call(this);
	}

	_inherits(IdentService, _ProductService);

	IdentService.prototype.getEndpoint = function getEndpoint() {
		return ['smart', 'idents'];
	};

	IdentService.prototype.getEventTargets = function getEventTargets() {
		return [];
	};

	IdentService.prototype.validate = function validate(id) {
		return this.execute(id, 'validate');
	};

	IdentService.prototype.read = function read(id) {
		return this.execute(id, 'read');
	};

	return IdentService;
})(_productService.ProductService);

exports.IdentService = IdentService;

IdentService.Uid = ['smart', 'idents'].join('.');