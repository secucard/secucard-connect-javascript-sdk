'use strict';

exports.__esModule = true;
exports.PaymentContainerService = undefined;

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PaymentContainerService = exports.PaymentContainerService = function (_ProductService) {
    _inherits(PaymentContainerService, _ProductService);

    function PaymentContainerService() {
        _classCallCheck(this, PaymentContainerService);

        return _possibleConstructorReturn(this, _ProductService.call(this));
    }

    PaymentContainerService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'paymentcontainers'];
    };

    PaymentContainerService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    PaymentContainerService.prototype.validateIban = function validateIban(data) {

        if (data.iban && data.owner) {
            return this.execute('me', 'validateIban', null, data);
        } else {
            throw new Error("Iban and owner are required");
        }
    };

    return PaymentContainerService;
}(_productService.ProductService);

PaymentContainerService.Uid = ['loyalty', 'paymentcontainers'].join('.');