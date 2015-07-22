'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var AccountDeviceService = (function (_ProductService) {
	function AccountDeviceService() {
		_classCallCheck(this, AccountDeviceService);

		_ProductService.call(this);
	}

	_inherits(AccountDeviceService, _ProductService);

	AccountDeviceService.prototype.getEndpoint = function getEndpoint() {
		return ['general', 'accountdevices'];
	};

	AccountDeviceService.prototype.getEventTargets = function getEventTargets() {
		return ['general.accountdevices'];
	};

	return AccountDeviceService;
})(_productService.ProductService);

exports.AccountDeviceService = AccountDeviceService;

AccountDeviceService.Uid = ['general', 'accountdevices'].join('.');