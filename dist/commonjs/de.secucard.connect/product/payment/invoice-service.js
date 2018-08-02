'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var InvoiceService = (function (_ProductService) {
    _inherits(InvoiceService, _ProductService);

    function InvoiceService() {
        _classCallCheck(this, InvoiceService);

        _ProductService.call(this);
    }

    InvoiceService.prototype.getEndpoint = function getEndpoint() {
        return ['payment', 'invoices'];
    };

    InvoiceService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return InvoiceService;
})(_productService.ProductService);

exports.InvoiceService = InvoiceService;

InvoiceService.Uid = ['payment', 'invoices'].join('.');