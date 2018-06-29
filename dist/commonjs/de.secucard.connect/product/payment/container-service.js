'use strict';

exports.__esModule = true;
exports.ContainerService = undefined;

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContainerService = exports.ContainerService = function (_ProductService) {
    _inherits(ContainerService, _ProductService);

    function ContainerService() {
        _classCallCheck(this, ContainerService);

        return _possibleConstructorReturn(this, _ProductService.call(this));
    }

    ContainerService.prototype.getEndpoint = function getEndpoint() {
        return ['payment', 'containers'];
    };

    ContainerService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    ContainerService.prototype.assignCustomer = function assignCustomer(containerId, customerId) {
        return this.execute(containerId, 'assign', customerId);
    };

    ContainerService.prototype.removeCustomer = function removeCustomer(containerId) {
        return this.removeWithAction(containerId, 'assign');
    };

    return ContainerService;
}(_productService.ProductService);

ContainerService.Uid = ['payment', 'containers'].join('.');