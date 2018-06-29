'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PaymentContainerService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PaymentContainerService = exports.PaymentContainerService = function (_ProductService) {
    _inherits(PaymentContainerService, _ProductService);

    function PaymentContainerService() {
        _classCallCheck(this, PaymentContainerService);

        return _possibleConstructorReturn(this, (PaymentContainerService.__proto__ || Object.getPrototypeOf(PaymentContainerService)).call(this));
    }

    _createClass(PaymentContainerService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['loyalty', 'paymentcontainers'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }, {
        key: 'validateIban',
        value: function validateIban(data) {

            if (data.iban && data.owner) {
                return this.execute('me', 'validateIban', null, data);
            } else {
                throw new Error("Iban and owner are required");
            }
        }
    }]);

    return PaymentContainerService;
}(_productService.ProductService);

PaymentContainerService.Uid = ['loyalty', 'paymentcontainers'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L3BheW1lbnQtY29udGFpbmVyLXNlcnZpY2UuanMiXSwibmFtZXMiOlsiUGF5bWVudENvbnRhaW5lclNlcnZpY2UiLCJkYXRhIiwiaWJhbiIsIm93bmVyIiwiZXhlY3V0ZSIsIkVycm9yIiwiUHJvZHVjdFNlcnZpY2UiLCJVaWQiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7SUFFYUEsdUIsV0FBQUEsdUI7OztBQUVULHVDQUFjO0FBQUE7O0FBQUE7QUFFYjs7OztzQ0FFYTtBQUNWLG1CQUFPLENBQUMsU0FBRCxFQUFZLG1CQUFaLENBQVA7QUFDSDs7OzBDQUVpQjtBQUNkLG1CQUFPLEVBQVA7QUFDSDs7O3FDQU9ZQyxJLEVBQU07O0FBRWYsZ0JBQUlBLEtBQUtDLElBQUwsSUFBYUQsS0FBS0UsS0FBdEIsRUFBNkI7QUFDekIsdUJBQU8sS0FBS0MsT0FBTCxDQUFhLElBQWIsRUFBbUIsY0FBbkIsRUFBbUMsSUFBbkMsRUFBeUNILElBQXpDLENBQVA7QUFDSCxhQUZELE1BRU87QUFDSCxzQkFBTSxJQUFJSSxLQUFKLENBQVUsNkJBQVYsQ0FBTjtBQUNIO0FBQ0o7Ozs7RUExQndDQyw4Qjs7QUE4QjdDTix3QkFBd0JPLEdBQXhCLEdBQStCLENBQUMsU0FBRCxFQUFZLG1CQUFaLENBQUQsQ0FBbUNDLElBQW5DLENBQXdDLEdBQXhDLENBQTlCIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L3BheW1lbnQtY29udGFpbmVyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
