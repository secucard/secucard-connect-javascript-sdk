'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SecupayPrepay = undefined;

var _transaction = require('./transaction');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SecupayPrepay = exports.SecupayPrepay = function (_Transaction) {
    _inherits(SecupayPrepay, _Transaction);

    function SecupayPrepay(transfer_purpose, transfer_account, customer, contract, amount, currency, purpose, order_id, trans_id, status, transaction_status) {
        _classCallCheck(this, SecupayPrepay);

        var _this = _possibleConstructorReturn(this, (SecupayPrepay.__proto__ || Object.getPrototypeOf(SecupayPrepay)).call(this, customer, contract, amount, currency, purpose, order_id, trans_id, status, transaction_status));

        _this.transfer_purpose = transfer_purpose;
        _this.transfer_account = transfer_account;

        return _this;
    }

    return SecupayPrepay;
}(_transaction.Transaction);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L21vZGVsL3NlY3VwYXktcHJlcGF5LmpzIl0sIm5hbWVzIjpbIlNlY3VwYXlQcmVwYXkiLCJ0cmFuc2Zlcl9wdXJwb3NlIiwidHJhbnNmZXJfYWNjb3VudCIsImN1c3RvbWVyIiwiY29udHJhY3QiLCJhbW91bnQiLCJjdXJyZW5jeSIsInB1cnBvc2UiLCJvcmRlcl9pZCIsInRyYW5zX2lkIiwic3RhdHVzIiwidHJhbnNhY3Rpb25fc3RhdHVzIiwiVHJhbnNhY3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFXQTs7Ozs7Ozs7SUFDYUEsYSxXQUFBQSxhOzs7QUFFVCwyQkFBWUMsZ0JBQVosRUFBOEJDLGdCQUE5QixFQUFnREMsUUFBaEQsRUFBMERDLFFBQTFELEVBQW9FQyxNQUFwRSxFQUE0RUMsUUFBNUUsRUFBc0ZDLE9BQXRGLEVBQStGQyxRQUEvRixFQUF5R0MsUUFBekcsRUFBbUhDLE1BQW5ILEVBQTJIQyxrQkFBM0gsRUFBK0k7QUFBQTs7QUFBQSxrSUFFcklSLFFBRnFJLEVBRTNIQyxRQUYySCxFQUVqSEMsTUFGaUgsRUFFekdDLFFBRnlHLEVBRS9GQyxPQUYrRixFQUV0RkMsUUFGc0YsRUFFNUVDLFFBRjRFLEVBRWxFQyxNQUZrRSxFQUUxREMsa0JBRjBEOztBQUczSSxjQUFLVixnQkFBTCxHQUF3QkEsZ0JBQXhCO0FBQ0EsY0FBS0MsZ0JBQUwsR0FBd0JBLGdCQUF4Qjs7QUFKMkk7QUFNOUk7OztFQVI4QlUsd0IiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3BheW1lbnQvbW9kZWwvc2VjdXBheS1wcmVwYXkuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
