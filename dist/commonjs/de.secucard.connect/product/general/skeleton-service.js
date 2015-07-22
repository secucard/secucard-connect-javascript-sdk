'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var SkeletonService = (function (_ProductService) {
	function SkeletonService() {
		_classCallCheck(this, SkeletonService);

		_ProductService.call(this);
	}

	_inherits(SkeletonService, _ProductService);

	SkeletonService.prototype.getEndpoint = function getEndpoint() {
		return ['general', 'skeletons'];
	};

	SkeletonService.prototype.getEventTargets = function getEventTargets() {
		return ['general.skeletons'];
	};

	SkeletonService.prototype.demoEvent = function demoEvent() {
		return this.execute(1, 'demoevent');
	};

	return SkeletonService;
})(_productService.ProductService);

exports.SkeletonService = SkeletonService;

SkeletonService.Uid = ['general', 'skeletons'].join('.');