'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var MerchantCardService = (function (_ProductService) {
    _inherits(MerchantCardService, _ProductService);

    function MerchantCardService() {
        _classCallCheck(this, MerchantCardService);

        _ProductService.call(this);
    }

    MerchantCardService.prototype.charge = function charge(merchantCardId, amount, storeId) {
        return this.execute(merchantCardId, 'charge', null, { amount: amount, store: storeId });
    };

    MerchantCardService.prototype.lock = function lock(merchantCardId, reasonId, note) {
        return this.execute(merchantCardId, 'lock', null, { reasonId: reasonId, note: note });
    };

    MerchantCardService.prototype.registerCustomer = function registerCustomer(merchantCardId, data) {
        return this.execute(merchantCardId, 'registerCustomer', null, data);
    };

    MerchantCardService.prototype.retrieveLock = function retrieveLock(merchantCardId) {
        return this.retrieveWithAction(merchantCardId, 'lock', null);
    };

    MerchantCardService.prototype.retrieveLockReasons = function retrieveLockReasons(merchantCardId) {
        return this.retrieveWithAction(merchantCardId, 'lockreasons', null);
    };

    MerchantCardService.prototype.updateGroup = function updateGroup(merchantCardId, groupId) {
        return this.execute(merchantCardId, 'cardgroup', groupId);
    };

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