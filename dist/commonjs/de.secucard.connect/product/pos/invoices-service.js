'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var InvoicesService = (function (_ProductService) {
    _inherits(InvoicesService, _ProductService);

    function InvoicesService() {
        _classCallCheck(this, InvoicesService);

        _ProductService.call(this);
    }

    InvoicesService.prototype.getEndpoint = function getEndpoint() {
        return ['pos', 'invoices'];
    };

    InvoicesService.prototype.getEventTargets = function getEventTargets() {
        return ['pos.invoices'];
    };

    return InvoicesService;
})(_productService.ProductService);

exports.InvoicesService = InvoicesService;

InvoicesService.Uid = ['pos', 'invoices'].join('.');