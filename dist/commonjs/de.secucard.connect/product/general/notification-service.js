'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var NotificationService = (function (_ProductService) {
    function NotificationService() {
        _classCallCheck(this, NotificationService);

        _ProductService.call(this);
    }

    _inherits(NotificationService, _ProductService);

    NotificationService.prototype.getEndpoint = function getEndpoint() {
        return ['general', 'notifications'];
    };

    NotificationService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return NotificationService;
})(_productService.ProductService);

exports.NotificationService = NotificationService;

NotificationService.Uid = ['general', 'notifications'].join('.');