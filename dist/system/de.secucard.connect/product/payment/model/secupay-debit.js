'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SecupayDebit = undefined;

var _transaction = require('./transaction');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SecupayDebit = exports.SecupayDebit = function (_Transaction) {
    _inherits(SecupayDebit, _Transaction);

    function SecupayDebit(container, customer, contract, amount, currency, purpose, order_id, trans_id, status, transaction_status) {
        _classCallCheck(this, SecupayDebit);

        var _this = _possibleConstructorReturn(this, (SecupayDebit.__proto__ || Object.getPrototypeOf(SecupayDebit)).call(this, customer, contract, amount, currency, purpose, order_id, trans_id, status, transaction_status));

        _this.container = container;

        return _this;
    }

    return SecupayDebit;
}(_transaction.Transaction);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L21vZGVsL3NlY3VwYXktZGViaXQuanMiXSwibmFtZXMiOlsiU2VjdXBheURlYml0IiwiY29udGFpbmVyIiwiY3VzdG9tZXIiLCJjb250cmFjdCIsImFtb3VudCIsImN1cnJlbmN5IiwicHVycG9zZSIsIm9yZGVyX2lkIiwidHJhbnNfaWQiLCJzdGF0dXMiLCJ0cmFuc2FjdGlvbl9zdGF0dXMiLCJUcmFuc2FjdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVdBOzs7Ozs7OztJQUNhQSxZLFdBQUFBLFk7OztBQUVULDBCQUFZQyxTQUFaLEVBQXVCQyxRQUF2QixFQUFpQ0MsUUFBakMsRUFBMkNDLE1BQTNDLEVBQW1EQyxRQUFuRCxFQUE2REMsT0FBN0QsRUFBc0VDLFFBQXRFLEVBQWdGQyxRQUFoRixFQUEwRkMsTUFBMUYsRUFBa0dDLGtCQUFsRyxFQUFzSDtBQUFBOztBQUFBLGdJQUU1R1IsUUFGNEcsRUFFbEdDLFFBRmtHLEVBRXhGQyxNQUZ3RixFQUVoRkMsUUFGZ0YsRUFFdEVDLE9BRnNFLEVBRTdEQyxRQUY2RCxFQUVuREMsUUFGbUQsRUFFekNDLE1BRnlDLEVBRWpDQyxrQkFGaUM7O0FBR2xILGNBQUtULFNBQUwsR0FBaUJBLFNBQWpCOztBQUhrSDtBQUtySDs7O0VBUDZCVSx3QiIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvcGF5bWVudC9tb2RlbC9zZWN1cGF5LWRlYml0LmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
