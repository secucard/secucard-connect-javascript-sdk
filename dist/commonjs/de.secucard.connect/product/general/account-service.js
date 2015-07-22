'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var AccountService = (function (_ProductService) {
	function AccountService() {
		_classCallCheck(this, AccountService);

		_ProductService.call(this);
	}

	_inherits(AccountService, _ProductService);

	AccountService.prototype.getEndpoint = function getEndpoint() {
		return ['general', 'accounts'];
	};

	AccountService.prototype.getEventTargets = function getEventTargets() {
		return ['general.accounts'];
	};

	AccountService.prototype.updateLocation = function updateLocation(accountId, location) {
		return this.updateWithAction(accountId, 'location', null, location);
	};

	AccountService.prototype.updateBeacons = function updateBeacons(beaconList) {
		return this.updateWithAction('me', 'beaconEnvironment', null, beaconList);
	};

	AccountService.prototype.updateGCM = function updateGCM(accountId, gcm) {
		return this.updateWithAction(accountId, 'gcm', null, gcm);
	};

	return AccountService;
})(_productService.ProductService);

exports.AccountService = AccountService;

AccountService.Uid = ['general', 'accounts'].join('.');