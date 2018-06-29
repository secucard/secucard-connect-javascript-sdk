'use strict';

exports.__esModule = true;
exports.CustomerService = undefined;

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomerService = exports.CustomerService = function (_ProductService) {
    _inherits(CustomerService, _ProductService);

    function CustomerService() {
        _classCallCheck(this, CustomerService);

        return _possibleConstructorReturn(this, _ProductService.call(this));
    }

    CustomerService.prototype.retrieveTemplates = function retrieveTemplates(merchantId) {
        return this.retrieveWithAction('me', 'templateList', merchantId);
    };

    CustomerService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'customers'];
    };

    CustomerService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    CustomerService.prototype.assignPaymentContainer = function assignPaymentContainer(customerId, paymentContainerId) {
        return this.execute(customerId, 'assignPaymentcontainer', paymentContainerId);
    };

    CustomerService.prototype.removePaymentContainer = function removePaymentContainer(customerId, paymentContainerId) {
        return this.removeWithAction(customerId, 'assignPaymentcontainer', paymentContainerId);
    };

    return CustomerService;
}(_productService.ProductService);

CustomerService.Uid = ['loyalty', 'customers'].join('.');