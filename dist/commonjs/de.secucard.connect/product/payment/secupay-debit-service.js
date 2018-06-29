'use strict';

exports.__esModule = true;
exports.SecupayDebitService = undefined;

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SecupayDebitService = exports.SecupayDebitService = function (_ProductService) {
    _inherits(SecupayDebitService, _ProductService);

    function SecupayDebitService() {
        _classCallCheck(this, SecupayDebitService);

        return _possibleConstructorReturn(this, _ProductService.call(this));
    }

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
}(_productService.ProductService);

SecupayDebitService.Uid = ['payment', 'secupaydebits'].join('.');