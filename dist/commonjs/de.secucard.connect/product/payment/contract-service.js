'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ContractService = (function (_ProductService) {
	function ContractService() {
		_classCallCheck(this, ContractService);

		_ProductService.call(this);
	}

	_inherits(ContractService, _ProductService);

	ContractService.prototype.getEndpoint = function getEndpoint() {
		return ['payment', 'contracts'];
	};

	ContractService.prototype.getEventTargets = function getEventTargets() {
		return [];
	};

	ContractService.prototype.clone = function clone(contractId, cloneParams) {
		return this.execute(contractId, 'clone');
	};

	ContractService.prototype.cloneMine = function cloneMine(cloneParams) {
		return this.clone('me', cloneParams);
	};

	return ContractService;
})(_productService.ProductService);

exports.ContractService = ContractService;

ContractService.Uid = ['payment', 'contracts'].join('.');