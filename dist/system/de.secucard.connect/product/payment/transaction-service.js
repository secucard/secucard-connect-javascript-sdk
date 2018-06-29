'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TransactionService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TransactionService = exports.TransactionService = function (_ProductService) {
    _inherits(TransactionService, _ProductService);

    function TransactionService() {
        _classCallCheck(this, TransactionService);

        return _possibleConstructorReturn(this, (TransactionService.__proto__ || Object.getPrototypeOf(TransactionService)).call(this));
    }

    _createClass(TransactionService, [{
        key: 'getShippingUrl',
        value: function getShippingUrl(id) {
            return this.retrieveWithAction(id, 'shippingUrl');
        }
    }, {
        key: 'cancel',
        value: function cancel(id, data) {
            return this.execute(id, 'cancel', null, data);
        }
    }, {
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['payment', 'transactions'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }, {
        key: 'getCrowdfundingData',
        value: function getCrowdfundingData(id) {
            return this.retrieveWithAction('me', 'CrowdFundingData', id);
        }
    }]);

    return TransactionService;
}(_productService.ProductService);

TransactionService.Uid = ['payment', 'transactions'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3RyYW5zYWN0aW9uLXNlcnZpY2UuanMiXSwibmFtZXMiOlsiVHJhbnNhY3Rpb25TZXJ2aWNlIiwiaWQiLCJyZXRyaWV2ZVdpdGhBY3Rpb24iLCJkYXRhIiwiZXhlY3V0ZSIsIlByb2R1Y3RTZXJ2aWNlIiwiVWlkIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7O0lBRWFBLGtCLFdBQUFBLGtCOzs7QUFFVCxrQ0FBYztBQUFBOztBQUFBO0FBRWI7Ozs7dUNBRWNDLEUsRUFBSTtBQUNmLG1CQUFPLEtBQUtDLGtCQUFMLENBQXdCRCxFQUF4QixFQUE0QixhQUE1QixDQUFQO0FBQ0g7OzsrQkFFTUEsRSxFQUFJRSxJLEVBQU07QUFDYixtQkFBTyxLQUFLQyxPQUFMLENBQWFILEVBQWIsRUFBaUIsUUFBakIsRUFBMkIsSUFBM0IsRUFBaUNFLElBQWpDLENBQVA7QUFDSDs7O3NDQUVhO0FBQ1YsbUJBQU8sQ0FBQyxTQUFELEVBQVksY0FBWixDQUFQO0FBQ0g7OzswQ0FFaUI7QUFDZCxtQkFBTyxFQUFQO0FBQ0g7Ozs0Q0FPbUJGLEUsRUFBSTtBQUNwQixtQkFBTyxLQUFLQyxrQkFBTCxDQUF3QixJQUF4QixFQUE4QixrQkFBOUIsRUFBa0RELEVBQWxELENBQVA7QUFDSDs7OztFQTdCbUNJLDhCOztBQWlDeENMLG1CQUFtQk0sR0FBbkIsR0FBMEIsQ0FBQyxTQUFELEVBQVksY0FBWixDQUFELENBQThCQyxJQUE5QixDQUFtQyxHQUFuQyxDQUF6QiIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvcGF5bWVudC90cmFuc2FjdGlvbi1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
