'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NotificationService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotificationService = exports.NotificationService = function (_ProductService) {
    _inherits(NotificationService, _ProductService);

    function NotificationService() {
        _classCallCheck(this, NotificationService);

        return _possibleConstructorReturn(this, (NotificationService.__proto__ || Object.getPrototypeOf(NotificationService)).call(this));
    }

    _createClass(NotificationService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['general', 'notifications'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }]);

    return NotificationService;
}(_productService.ProductService);

NotificationService.Uid = ['general', 'notifications'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL25vdGlmaWNhdGlvbi1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbIk5vdGlmaWNhdGlvblNlcnZpY2UiLCJQcm9kdWN0U2VydmljZSIsIlVpZCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQVdBOzs7Ozs7OztJQUVhQSxtQixXQUFBQSxtQjs7O0FBRVQsbUNBQWM7QUFBQTs7QUFBQTtBQUViOzs7O3NDQUVhO0FBQ1YsbUJBQU8sQ0FBQyxTQUFELEVBQVksZUFBWixDQUFQO0FBQ0g7OzswQ0FFaUI7QUFDZCxtQkFBTyxFQUFQO0FBQ0g7Ozs7RUFab0NDLDhCOztBQWdCekNELG9CQUFvQkUsR0FBcEIsR0FBMkIsQ0FBQyxTQUFELEVBQVksZUFBWixDQUFELENBQStCQyxJQUEvQixDQUFvQyxHQUFwQyxDQUExQiIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvZ2VuZXJhbC9ub3RpZmljYXRpb24tc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
