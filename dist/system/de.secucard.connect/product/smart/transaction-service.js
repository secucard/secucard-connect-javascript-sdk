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
            return ['smart', 'transactions'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return ['general.notifications'];
        }
    }, {
        key: 'start',
        value: function start(id, type) {
            return this.execute(id, "start", type);
        }
    }, {
        key: 'cancel',
        value: function cancel(id) {
            return this.execute(id, "cancel");
        }
    }]);

    return TransactionService;
}(_productService.ProductService);

TransactionService.Uid = ['smart', 'transactions'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC90cmFuc2FjdGlvbi1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbIlRyYW5zYWN0aW9uU2VydmljZSIsImlkIiwidHlwZSIsImV4ZWN1dGUiLCJQcm9kdWN0U2VydmljZSIsIlVpZCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQVdBOzs7Ozs7OztJQUVhQSxrQixXQUFBQSxrQjs7O0FBRVQsa0NBQWM7QUFBQTs7QUFBQTtBQUViOzs7O3NDQUVhO0FBQ1YsbUJBQU8sQ0FBQyxPQUFELEVBQVUsY0FBVixDQUFQO0FBQ0g7OzswQ0FFaUI7QUFDZCxtQkFBTyxDQUFDLHVCQUFELENBQVA7QUFDSDs7OzhCQUVLQyxFLEVBQUlDLEksRUFBTTtBQUNaLG1CQUFPLEtBQUtDLE9BQUwsQ0FBYUYsRUFBYixFQUFpQixPQUFqQixFQUEwQkMsSUFBMUIsQ0FBUDtBQUNIOzs7K0JBRU1ELEUsRUFBSTtBQUNQLG1CQUFPLEtBQUtFLE9BQUwsQ0FBYUYsRUFBYixFQUFpQixRQUFqQixDQUFQO0FBQ0g7Ozs7RUFwQm1DRyw4Qjs7QUF3QnhDSixtQkFBbUJLLEdBQW5CLEdBQTBCLENBQUMsT0FBRCxFQUFVLGNBQVYsQ0FBRCxDQUE0QkMsSUFBNUIsQ0FBaUMsR0FBakMsQ0FBekIiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3NtYXJ0L3RyYW5zYWN0aW9uLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
