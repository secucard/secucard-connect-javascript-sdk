'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var RoutingService = (function (_ProductService) {
    _inherits(RoutingService, _ProductService);

    function RoutingService() {
        _classCallCheck(this, RoutingService);

        _ProductService.call(this);
    }

    RoutingService.prototype.getEndpoint = function getEndpoint() {
        return ['smart', 'routings'];
    };

    RoutingService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    RoutingService.prototype.assignDevice = function assignDevice(id, deviceId) {
        return this.execute(id, 'assign', deviceId);
    };

    RoutingService.prototype.removeDevice = function removeDevice(id, deviceId) {
        return this.removeWithAction(id, 'assign', deviceId);
    };

    return RoutingService;
})(_productService.ProductService);

exports.RoutingService = RoutingService;

RoutingService.Uid = ['smart', 'routings'].join('.');