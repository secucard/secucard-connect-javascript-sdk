'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var StoreGroupService = (function (_ProductService) {
    _inherits(StoreGroupService, _ProductService);

    function StoreGroupService() {
        _classCallCheck(this, StoreGroupService);

        _ProductService.call(this);
    }

    StoreGroupService.prototype.getEndpoint = function getEndpoint() {
        return ['general', 'storegroups'];
    };

    StoreGroupService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return StoreGroupService;
})(_productService.ProductService);

exports.StoreGroupService = StoreGroupService;

StoreGroupService.Uid = ['general', 'storegroups'].join('.');