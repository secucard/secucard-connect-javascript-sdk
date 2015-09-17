'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var MerchantCardService = (function (_ProductService) {
    function MerchantCardService() {
        _classCallCheck(this, MerchantCardService);

        _ProductService.call(this);
    }

    _inherits(MerchantCardService, _ProductService);

    MerchantCardService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'merchantcards'];
    };

    MerchantCardService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return MerchantCardService;
})(_productService.ProductService);

exports.MerchantCardService = MerchantCardService;

MerchantCardService.Uid = ['loyalty', 'merchantcards'].join('.');