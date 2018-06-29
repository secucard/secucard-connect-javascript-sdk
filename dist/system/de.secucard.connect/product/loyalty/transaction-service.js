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
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['loyalty', 'transactions'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return ['loyalty.transactions'];
        }
    }]);

    return TransactionService;
}(_productService.ProductService);

TransactionService.Uid = ['loyalty', 'transactions'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L3RyYW5zYWN0aW9uLXNlcnZpY2UuanMiXSwibmFtZXMiOlsiVHJhbnNhY3Rpb25TZXJ2aWNlIiwiUHJvZHVjdFNlcnZpY2UiLCJVaWQiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7SUFFYUEsa0IsV0FBQUEsa0I7OztBQUVULGtDQUFjO0FBQUE7O0FBQUE7QUFFYjs7OztzQ0FFYTtBQUNWLG1CQUFPLENBQUMsU0FBRCxFQUFZLGNBQVosQ0FBUDtBQUNIOzs7MENBRWlCO0FBQ2QsbUJBQU8sQ0FBQyxzQkFBRCxDQUFQO0FBQ0g7Ozs7RUFabUNDLDhCOztBQWdCeENELG1CQUFtQkUsR0FBbkIsR0FBMEIsQ0FBQyxTQUFELEVBQVksY0FBWixDQUFELENBQThCQyxJQUE5QixDQUFtQyxHQUFuQyxDQUF6QiIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvbG95YWx0eS90cmFuc2FjdGlvbi1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
