'use strict';

exports.__esModule = true;
exports.DeviceService = undefined;

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeviceService = exports.DeviceService = function (_ProductService) {
    _inherits(DeviceService, _ProductService);

    function DeviceService() {
        _classCallCheck(this, DeviceService);

        return _possibleConstructorReturn(this, _ProductService.call(this));
    }

    DeviceService.prototype.getEndpoint = function getEndpoint() {
        return ['general', 'devices'];
    };

    DeviceService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return DeviceService;
}(_productService.ProductService);

DeviceService.Uid = ['general', 'devices'].join('.');