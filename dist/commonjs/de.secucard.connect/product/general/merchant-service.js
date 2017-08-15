'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var MerchantService = (function (_ProductService) {
    _inherits(MerchantService, _ProductService);

    function MerchantService() {
        _classCallCheck(this, MerchantService);

        _ProductService.call(this);
    }

    MerchantService.prototype.getEndpoint = function getEndpoint() {
        return ['general', 'merchants'];
    };

    MerchantService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    MerchantService.prototype.retrieveShowSecucardInvoice = function retrieveShowSecucardInvoice(merchantId) {
        return this.retrieveWithAction(merchantId, 'showSecucardInvoice');
    };

    return MerchantService;
})(_productService.ProductService);

exports.MerchantService = MerchantService;

MerchantService.Uid = ['general', 'merchants'].join('.');