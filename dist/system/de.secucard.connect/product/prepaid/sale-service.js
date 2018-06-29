'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SaleService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SaleService = exports.SaleService = function (_ProductService) {
    _inherits(SaleService, _ProductService);

    function SaleService() {
        _classCallCheck(this, SaleService);

        return _possibleConstructorReturn(this, (SaleService.__proto__ || Object.getPrototypeOf(SaleService)).call(this));
    }

    _createClass(SaleService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['prepaid', 'sales'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }, {
        key: 'cancel',
        value: function cancel(saleId) {
            return this.execute(saleId, 'cancel');
        }
    }]);

    return SaleService;
}(_productService.ProductService);

SaleService.Uid = ['prepaid', 'sales'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wcmVwYWlkL3NhbGUtc2VydmljZS5qcyJdLCJuYW1lcyI6WyJTYWxlU2VydmljZSIsInNhbGVJZCIsImV4ZWN1dGUiLCJQcm9kdWN0U2VydmljZSIsIlVpZCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQVdBOzs7Ozs7OztJQUVhQSxXLFdBQUFBLFc7OztBQUVULDJCQUFjO0FBQUE7O0FBQUE7QUFFYjs7OztzQ0FFYTtBQUNWLG1CQUFPLENBQUMsU0FBRCxFQUFZLE9BQVosQ0FBUDtBQUNIOzs7MENBRWlCO0FBQ2QsbUJBQU8sRUFBUDtBQUNIOzs7K0JBRU1DLE0sRUFBUTtBQUNYLG1CQUFPLEtBQUtDLE9BQUwsQ0FBYUQsTUFBYixFQUFxQixRQUFyQixDQUFQO0FBQ0g7Ozs7RUFoQjRCRSw4Qjs7QUFtQmpDSCxZQUFZSSxHQUFaLEdBQW1CLENBQUMsU0FBRCxFQUFZLE9BQVosQ0FBRCxDQUF1QkMsSUFBdkIsQ0FBNEIsR0FBNUIsQ0FBbEIiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3ByZXBhaWQvc2FsZS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
