'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AccountService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AccountService = exports.AccountService = function (_ProductService) {
    _inherits(AccountService, _ProductService);

    function AccountService() {
        _classCallCheck(this, AccountService);

        return _possibleConstructorReturn(this, (AccountService.__proto__ || Object.getPrototypeOf(AccountService)).call(this));
    }

    _createClass(AccountService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['general', 'accounts'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return ['general.accounts'];
        }
    }, {
        key: 'create',
        value: function create(data, options) {

            options = Object.assign({}, options, {
                channelConfig: ['rest'],
                useAuth: false });

            return _get(AccountService.prototype.__proto__ || Object.getPrototypeOf(AccountService.prototype), 'create', this).call(this, data, options);
        }
    }, {
        key: 'updateLocation',
        value: function updateLocation(accountId, location) {
            return this.updateWithAction(accountId, 'location', null, location);
        }
    }, {
        key: 'updateBeacons',
        value: function updateBeacons(beaconList) {
            return this.updateWithAction("me", 'beaconEnvironment', null, beaconList);
        }
    }, {
        key: 'updateGCM',
        value: function updateGCM(accountId, gcm) {
            return this.updateWithAction(accountId, 'gcm', null, gcm);
        }
    }]);

    return AccountService;
}(_productService.ProductService);

AccountService.Uid = ['general', 'accounts'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL2FjY291bnQtc2VydmljZS5qcyJdLCJuYW1lcyI6WyJBY2NvdW50U2VydmljZSIsImRhdGEiLCJvcHRpb25zIiwiT2JqZWN0IiwiYXNzaWduIiwiY2hhbm5lbENvbmZpZyIsInVzZUF1dGgiLCJhY2NvdW50SWQiLCJsb2NhdGlvbiIsInVwZGF0ZVdpdGhBY3Rpb24iLCJiZWFjb25MaXN0IiwiZ2NtIiwiUHJvZHVjdFNlcnZpY2UiLCJVaWQiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVdBOzs7Ozs7OztJQUVhQSxjLFdBQUFBLGM7OztBQUVULDhCQUFjO0FBQUE7O0FBQUE7QUFFYjs7OztzQ0FFYTtBQUNWLG1CQUFPLENBQUMsU0FBRCxFQUFZLFVBQVosQ0FBUDtBQUNIOzs7MENBRWlCO0FBQ2QsbUJBQU8sQ0FBQyxrQkFBRCxDQUFQO0FBQ0g7OzsrQkFFTUMsSSxFQUFNQyxPLEVBQVM7O0FBRWxCQSxzQkFBVUMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JGLE9BQWxCLEVBQTJCO0FBQ2pDRywrQkFBZSxDQUFDLE1BQUQsQ0FEa0I7QUFFakNDLHlCQUFTLEtBRndCLEVBQTNCLENBQVY7O0FBS0EsMElBQW9CTCxJQUFwQixFQUEwQkMsT0FBMUI7QUFFSDs7O3VDQUVjSyxTLEVBQVdDLFEsRUFBVTtBQUNoQyxtQkFBTyxLQUFLQyxnQkFBTCxDQUFzQkYsU0FBdEIsRUFBaUMsVUFBakMsRUFBNkMsSUFBN0MsRUFBbURDLFFBQW5ELENBQVA7QUFDSDs7O3NDQUVhRSxVLEVBQVk7QUFDdEIsbUJBQU8sS0FBS0QsZ0JBQUwsQ0FBc0IsSUFBdEIsRUFBNEIsbUJBQTVCLEVBQWlELElBQWpELEVBQXVEQyxVQUF2RCxDQUFQO0FBQ0g7OztrQ0FFU0gsUyxFQUFXSSxHLEVBQUs7QUFDdEIsbUJBQU8sS0FBS0YsZ0JBQUwsQ0FBc0JGLFNBQXRCLEVBQWlDLEtBQWpDLEVBQXdDLElBQXhDLEVBQThDSSxHQUE5QyxDQUFQO0FBQ0g7Ozs7RUFuQytCQyw4Qjs7QUF1Q3BDWixlQUFlYSxHQUFmLEdBQXNCLENBQUMsU0FBRCxFQUFZLFVBQVosQ0FBRCxDQUEwQkMsSUFBMUIsQ0FBK0IsR0FBL0IsQ0FBckIiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2dlbmVyYWwvYWNjb3VudC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
