'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var SecupayPayoutService = (function (_ProductService) {
    _inherits(SecupayPayoutService, _ProductService);

    function SecupayPayoutService() {
        _classCallCheck(this, SecupayPayoutService);

        _ProductService.call(this);
    }

    SecupayPayoutService.prototype.getEndpoint = function getEndpoint() {
        return ['payment', 'secupaypayout'];
    };

    SecupayPayoutService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    SecupayPayoutService.prototype.payoutWithoutCustomer = function payoutWithoutCustomer() {
        return this.execute('me', 'PayoutWithoutCustomer', null, data);
    };

    return SecupayPayoutService;
})(_productService.ProductService);

exports.SecupayPayoutService = SecupayPayoutService;

SecupayPayoutService.Uid = ['payment', 'secupaypayout'].join('.');