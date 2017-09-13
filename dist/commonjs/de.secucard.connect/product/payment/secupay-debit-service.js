'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var SecupayDebitService = (function (_ProductService) {
    function SecupayDebitService() {
        _classCallCheck(this, SecupayDebitService);

        _ProductService.call(this);
    }

    _inherits(SecupayDebitService, _ProductService);

    SecupayDebitService.prototype.getEndpoint = function getEndpoint() {
        return ['payment', 'secupaydebits'];
    };

    SecupayDebitService.prototype.getEventTargets = function getEventTargets() {
        return ['payment.secupaydebits'];
    };

    SecupayDebitService.prototype.cancel = function cancel(id) {
        return this.execute(id, 'cancel');
    };

    return SecupayDebitService;
})(_productService.ProductService);

exports.SecupayDebitService = SecupayDebitService;

SecupayDebitService.Uid = ['payment', 'secupaydebits'].join('.');