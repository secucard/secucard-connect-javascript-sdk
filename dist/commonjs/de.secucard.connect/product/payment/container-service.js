'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ContainerService = (function (_ProductService) {
	function ContainerService() {
		_classCallCheck(this, ContainerService);

		_ProductService.call(this);
	}

	_inherits(ContainerService, _ProductService);

	ContainerService.prototype.getEndpoint = function getEndpoint() {
		return ['payment', 'containers'];
	};

	ContainerService.prototype.getEventTargets = function getEventTargets() {
		return [];
	};

	ContainerService.prototype.assignCustomer = function assignCustomer(containerId, customerId) {
		return this.execute(containerId, 'assign', customerId);
	};

	ContainerService.prototype.removeCustomer = function removeCustomer(containerId) {
		return this.removeWithAction(containerId, 'assign');
	};

	return ContainerService;
})(_productService.ProductService);

exports.ContainerService = ContainerService;

ContainerService.Uid = ['payment', 'containers'].join('.');