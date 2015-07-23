'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var CheckinService = (function (_ProductService) {
	function CheckinService() {
		_classCallCheck(this, CheckinService);

		_ProductService.call(this);
	}

	_inherits(CheckinService, _ProductService);

	CheckinService.prototype.getEndpoint = function getEndpoint() {
		return ['smart', 'checkins'];
	};

	CheckinService.prototype.getEventTargets = function getEventTargets() {
		return ['smart.checkins'];
	};

	return CheckinService;
})(_productService.ProductService);

exports.CheckinService = CheckinService;

CheckinService.Uid = ['smart', 'checkins'].join('.');