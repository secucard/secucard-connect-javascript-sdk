'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MerchantCardService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MerchantCardService = exports.MerchantCardService = function (_ProductService) {
    _inherits(MerchantCardService, _ProductService);

    function MerchantCardService() {
        _classCallCheck(this, MerchantCardService);

        return _possibleConstructorReturn(this, (MerchantCardService.__proto__ || Object.getPrototypeOf(MerchantCardService)).call(this));
    }

    _createClass(MerchantCardService, [{
        key: 'transact',
        value: function transact(merchantCardId, tid, cardnumber, action, amount, bonusAmount, amountSplitAllowed) {

            if (action == 'cashreport') {
                return this.execute(merchantCardId, 'transaction', null, { tid: tid, action: action });
            }

            return this.execute(merchantCardId, 'transaction', null, { tid: tid, cardnumber: cardnumber, action: action, amount: amount, bonus_amount: bonusAmount, amount_split_allowed: amountSplitAllowed });
        }
    }, {
        key: 'lock',
        value: function lock(merchantCardId, reasonId, note) {
            return this.execute(merchantCardId, 'lock', null, { reason: reasonId, note: note });
        }
    }, {
        key: 'unlock',
        value: function unlock(merchantCardId, note) {
            return this.execute(merchantCardId, 'unlock', null, { note: note });
        }
    }, {
        key: 'registerCustomer',
        value: function registerCustomer(merchantCardId, data) {
            return this.execute(merchantCardId, 'registerCustomer', null, data);
        }
    }, {
        key: 'retrieveLock',
        value: function retrieveLock(merchantCardId) {
            return this.retrieveWithAction(merchantCardId, 'lock', null);
        }
    }, {
        key: 'retrieveLockReasons',
        value: function retrieveLockReasons(merchantCardId) {
            return this.retrieveWithAction(merchantCardId, 'lockreasons', null);
        }
    }, {
        key: 'updateGroup',
        value: function updateGroup(merchantCardId, groupId) {
            return this.updateWithAction(merchantCardId, 'cardgroup', groupId);
        }
    }, {
        key: 'retrieveVirtualTerminalData',
        value: function retrieveVirtualTerminalData(merchantId) {
            return this.retrieveWithAction('me', 'virtualTerminalData', merchantId);
        }
    }, {
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['loyalty', 'merchantcards'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }]);

    return MerchantCardService;
}(_productService.ProductService);

MerchantCardService.Uid = ['loyalty', 'merchantcards'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L21lcmNoYW50LWNhcmQtc2VydmljZS5qcyJdLCJuYW1lcyI6WyJNZXJjaGFudENhcmRTZXJ2aWNlIiwibWVyY2hhbnRDYXJkSWQiLCJ0aWQiLCJjYXJkbnVtYmVyIiwiYWN0aW9uIiwiYW1vdW50IiwiYm9udXNBbW91bnQiLCJhbW91bnRTcGxpdEFsbG93ZWQiLCJleGVjdXRlIiwiYm9udXNfYW1vdW50IiwiYW1vdW50X3NwbGl0X2FsbG93ZWQiLCJyZWFzb25JZCIsIm5vdGUiLCJyZWFzb24iLCJkYXRhIiwicmV0cmlldmVXaXRoQWN0aW9uIiwiZ3JvdXBJZCIsInVwZGF0ZVdpdGhBY3Rpb24iLCJtZXJjaGFudElkIiwiUHJvZHVjdFNlcnZpY2UiLCJVaWQiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7SUFFYUEsbUIsV0FBQUEsbUI7OztBQUVULG1DQUFjO0FBQUE7O0FBQUE7QUFFYjs7OztpQ0FFUUMsYyxFQUFnQkMsRyxFQUFLQyxVLEVBQVlDLE0sRUFBUUMsTSxFQUFRQyxXLEVBQWFDLGtCLEVBQW9COztBQUV2RixnQkFBR0gsVUFBVSxZQUFiLEVBQTJCO0FBQ3ZCLHVCQUFPLEtBQUtJLE9BQUwsQ0FBYVAsY0FBYixFQUE2QixhQUE3QixFQUE0QyxJQUE1QyxFQUFrRCxFQUFDQyxLQUFLQSxHQUFOLEVBQVdFLFFBQVFBLE1BQW5CLEVBQWxELENBQVA7QUFDSDs7QUFFRCxtQkFBTyxLQUFLSSxPQUFMLENBQWFQLGNBQWIsRUFBNkIsYUFBN0IsRUFBNEMsSUFBNUMsRUFDSCxFQUFDQyxLQUFLQSxHQUFOLEVBQVdDLFlBQVlBLFVBQXZCLEVBQW1DQyxRQUFRQSxNQUEzQyxFQUFtREMsUUFBUUEsTUFBM0QsRUFBbUVJLGNBQWNILFdBQWpGLEVBQThGSSxzQkFBc0JILGtCQUFwSCxFQURHLENBQVA7QUFFSDs7OzZCQUVJTixjLEVBQWdCVSxRLEVBQVVDLEksRUFBTTtBQUNqQyxtQkFBTyxLQUFLSixPQUFMLENBQWFQLGNBQWIsRUFBNkIsTUFBN0IsRUFBcUMsSUFBckMsRUFBMkMsRUFBQ1ksUUFBUUYsUUFBVCxFQUFtQkMsTUFBTUEsSUFBekIsRUFBM0MsQ0FBUDtBQUNIOzs7K0JBRU1YLGMsRUFBZ0JXLEksRUFBTTtBQUN6QixtQkFBTyxLQUFLSixPQUFMLENBQWFQLGNBQWIsRUFBNkIsUUFBN0IsRUFBdUMsSUFBdkMsRUFBNkMsRUFBQ1csTUFBTUEsSUFBUCxFQUE3QyxDQUFQO0FBQ0g7Ozt5Q0FFZ0JYLGMsRUFBZ0JhLEksRUFBTTtBQUNuQyxtQkFBTyxLQUFLTixPQUFMLENBQWFQLGNBQWIsRUFBNkIsa0JBQTdCLEVBQWlELElBQWpELEVBQXVEYSxJQUF2RCxDQUFQO0FBQ0g7OztxQ0FFWWIsYyxFQUFnQjtBQUN6QixtQkFBTyxLQUFLYyxrQkFBTCxDQUF3QmQsY0FBeEIsRUFBd0MsTUFBeEMsRUFBZ0QsSUFBaEQsQ0FBUDtBQUNIOzs7NENBRW1CQSxjLEVBQWdCO0FBQ2hDLG1CQUFPLEtBQUtjLGtCQUFMLENBQXdCZCxjQUF4QixFQUF3QyxhQUF4QyxFQUF1RCxJQUF2RCxDQUFQO0FBQ0g7OztvQ0FFV0EsYyxFQUFnQmUsTyxFQUFTO0FBQ2pDLG1CQUFPLEtBQUtDLGdCQUFMLENBQXNCaEIsY0FBdEIsRUFBc0MsV0FBdEMsRUFBbURlLE9BQW5ELENBQVA7QUFDSDs7O29EQUUyQkUsVSxFQUFZO0FBQ3BDLG1CQUFPLEtBQUtILGtCQUFMLENBQXdCLElBQXhCLEVBQThCLHFCQUE5QixFQUFxREcsVUFBckQsQ0FBUDtBQUNIOzs7c0NBRWE7QUFDVixtQkFBTyxDQUFDLFNBQUQsRUFBWSxlQUFaLENBQVA7QUFDSDs7OzBDQUVpQjtBQUNkLG1CQUFPLEVBQVA7QUFDSDs7OztFQWxEb0NDLDhCOztBQXNEekNuQixvQkFBb0JvQixHQUFwQixHQUEyQixDQUFDLFNBQUQsRUFBWSxlQUFaLENBQUQsQ0FBK0JDLElBQS9CLENBQW9DLEdBQXBDLENBQTFCIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L21lcmNoYW50LWNhcmQtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
