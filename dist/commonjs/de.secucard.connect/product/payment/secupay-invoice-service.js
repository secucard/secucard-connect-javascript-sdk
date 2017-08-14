'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var SecupayInvoiceService = (function (_ProductService) {
  _inherits(SecupayInvoiceService, _ProductService);

  function SecupayInvoiceService() {
    _classCallCheck(this, SecupayInvoiceService);

    _ProductService.call(this);
  }

  SecupayInvoiceService.prototype.getEndpoint = function getEndpoint() {
    return ['payment', 'secupayinvoices'];
  };

  SecupayInvoiceService.prototype.getEventTargets = function getEventTargets() {
    return ['payment.secupayinvoices'];
  };

  SecupayInvoiceService.prototype.cancel = function cancel(id) {
    return this.execute(id, 'cancel');
  };

  return SecupayInvoiceService;
})(_productService.ProductService);

exports.SecupayInvoiceService = SecupayInvoiceService;

SecupayInvoiceService.Uid = ['payment', 'secupayinvoices'].join('.');