'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SecupayDebitService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SecupayDebitService = exports.SecupayDebitService = function (_ProductService) {
    _inherits(SecupayDebitService, _ProductService);

    function SecupayDebitService() {
        _classCallCheck(this, SecupayDebitService);

        return _possibleConstructorReturn(this, (SecupayDebitService.__proto__ || Object.getPrototypeOf(SecupayDebitService)).call(this));
    }

    _createClass(SecupayDebitService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['payment', 'secupaydebits'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return ['payment.secupaydebits'];
        }
    }, {
        key: 'cancel',
        value: function cancel(id) {
            return this.execute(id, 'cancel');
        }
    }]);

    return SecupayDebitService;
}(_productService.ProductService);

SecupayDebitService.Uid = ['payment', 'secupaydebits'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3NlY3VwYXktZGViaXQtc2VydmljZS5qcyJdLCJuYW1lcyI6WyJTZWN1cGF5RGViaXRTZXJ2aWNlIiwiaWQiLCJleGVjdXRlIiwiUHJvZHVjdFNlcnZpY2UiLCJVaWQiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7SUFFYUEsbUIsV0FBQUEsbUI7OztBQUVULG1DQUFjO0FBQUE7O0FBQUE7QUFFYjs7OztzQ0FFYTtBQUNWLG1CQUFPLENBQUMsU0FBRCxFQUFZLGVBQVosQ0FBUDtBQUNIOzs7MENBRWlCO0FBQ2QsbUJBQU8sQ0FBQyx1QkFBRCxDQUFQO0FBQ0g7OzsrQkFFTUMsRSxFQUFJO0FBQ1AsbUJBQU8sS0FBS0MsT0FBTCxDQUFhRCxFQUFiLEVBQWlCLFFBQWpCLENBQVA7QUFDSDs7OztFQWhCb0NFLDhCOztBQW9CekNILG9CQUFvQkksR0FBcEIsR0FBMkIsQ0FBQyxTQUFELEVBQVksZUFBWixDQUFELENBQStCQyxJQUEvQixDQUFvQyxHQUFwQyxDQUExQiIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvcGF5bWVudC9zZWN1cGF5LWRlYml0LXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
