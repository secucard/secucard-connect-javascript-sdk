'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var RoutingService = (function (_ProductService) {
    function RoutingService() {
        _classCallCheck(this, RoutingService);

        _ProductService.call(this);
    }

    _inherits(RoutingService, _ProductService);

    RoutingService.prototype.getEndpoint = function getEndpoint() {
        return ['smart', 'routings'];
    };

    RoutingService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return RoutingService;
})(_productService.ProductService);

exports.RoutingService = RoutingService;

RoutingService.Uid = ['smart', 'routings'].join('.');