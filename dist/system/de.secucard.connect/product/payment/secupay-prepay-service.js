'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SecupayPrepayService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SecupayPrepayService = exports.SecupayPrepayService = function (_ProductService) {
    _inherits(SecupayPrepayService, _ProductService);

    function SecupayPrepayService() {
        _classCallCheck(this, SecupayPrepayService);

        return _possibleConstructorReturn(this, (SecupayPrepayService.__proto__ || Object.getPrototypeOf(SecupayPrepayService)).call(this));
    }

    _createClass(SecupayPrepayService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['payment', 'secupayprepays'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return ['payment.secupayprepays'];
        }
    }, {
        key: 'cancel',
        value: function cancel(id) {
            return this.execute(id, 'cancel');
        }
    }]);

    return SecupayPrepayService;
}(_productService.ProductService);

SecupayPrepayService.Uid = ['payment', 'secupayprepays'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3NlY3VwYXktcHJlcGF5LXNlcnZpY2UuanMiXSwibmFtZXMiOlsiU2VjdXBheVByZXBheVNlcnZpY2UiLCJpZCIsImV4ZWN1dGUiLCJQcm9kdWN0U2VydmljZSIsIlVpZCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQVdBOzs7Ozs7OztJQUVhQSxvQixXQUFBQSxvQjs7O0FBRVQsb0NBQWM7QUFBQTs7QUFBQTtBQUViOzs7O3NDQUVhO0FBQ1YsbUJBQU8sQ0FBQyxTQUFELEVBQVksZ0JBQVosQ0FBUDtBQUNIOzs7MENBRWlCO0FBQ2QsbUJBQU8sQ0FBQyx3QkFBRCxDQUFQO0FBQ0g7OzsrQkFFTUMsRSxFQUFJO0FBQ1AsbUJBQU8sS0FBS0MsT0FBTCxDQUFhRCxFQUFiLEVBQWlCLFFBQWpCLENBQVA7QUFDSDs7OztFQWhCcUNFLDhCOztBQW9CMUNILHFCQUFxQkksR0FBckIsR0FBNEIsQ0FBQyxTQUFELEVBQVksZ0JBQVosQ0FBRCxDQUFnQ0MsSUFBaEMsQ0FBcUMsR0FBckMsQ0FBM0IiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3BheW1lbnQvc2VjdXBheS1wcmVwYXktc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
