'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var CardGroupService = (function (_ProductService) {
	function CardGroupService() {
		_classCallCheck(this, CardGroupService);

		_ProductService.call(this);
	}

	_inherits(CardGroupService, _ProductService);

	CardGroupService.prototype.getEndpoint = function getEndpoint() {
		return ['loyalty', 'cardgroups'];
	};

	CardGroupService.prototype.getEventTargets = function getEventTargets() {
		return [];
	};

	return CardGroupService;
})(_productService.ProductService);

exports.CardGroupService = CardGroupService;

CardGroupService.Uid = ['loyalty', 'cardgroups'].join('.');