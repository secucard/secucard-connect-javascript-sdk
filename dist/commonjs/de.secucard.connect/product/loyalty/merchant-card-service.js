'use strict';

exports.__esModule = true;
exports.MerchantCardService = undefined;

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MerchantCardService = exports.MerchantCardService = function (_ProductService) {
    _inherits(MerchantCardService, _ProductService);

    function MerchantCardService() {
        _classCallCheck(this, MerchantCardService);

        return _possibleConstructorReturn(this, _ProductService.call(this));
    }

    MerchantCardService.prototype.transact = function transact(merchantCardId, tid, cardnumber, action, amount, bonusAmount, amountSplitAllowed) {

        if (action == 'cashreport') {
            return this.execute(merchantCardId, 'transaction', null, { tid: tid, action: action });
        }

        return this.execute(merchantCardId, 'transaction', null, { tid: tid, cardnumber: cardnumber, action: action, amount: amount, bonus_amount: bonusAmount, amount_split_allowed: amountSplitAllowed });
    };

    MerchantCardService.prototype.lock = function lock(merchantCardId, reasonId, note) {
        return this.execute(merchantCardId, 'lock', null, { reason: reasonId, note: note });
    };

    MerchantCardService.prototype.unlock = function unlock(merchantCardId, note) {
        return this.execute(merchantCardId, 'unlock', null, { note: note });
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
        return this.updateWithAction(merchantCardId, 'cardgroup', groupId);
    };

    MerchantCardService.prototype.retrieveVirtualTerminalData = function retrieveVirtualTerminalData(merchantId) {
        return this.retrieveWithAction('me', 'virtualTerminalData', merchantId);
    };

    MerchantCardService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'merchantcards'];
    };

    MerchantCardService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return MerchantCardService;
}(_productService.ProductService);

MerchantCardService.Uid = ['loyalty', 'merchantcards'].join('.');