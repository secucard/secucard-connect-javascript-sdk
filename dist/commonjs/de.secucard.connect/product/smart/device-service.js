'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var DeviceService = (function (_ProductService) {
    function DeviceService() {
        _classCallCheck(this, DeviceService);

        _ProductService.call(this);
    }

    _inherits(DeviceService, _ProductService);

    DeviceService.prototype.getEndpoint = function getEndpoint() {
        return ['smart', 'devices'];
    };

    DeviceService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return DeviceService;
})(_productService.ProductService);

exports.DeviceService = DeviceService;

DeviceService.Uid = ['smart', 'devices'].join('.');