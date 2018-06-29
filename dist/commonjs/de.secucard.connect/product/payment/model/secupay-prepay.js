'use strict';

exports.__esModule = true;
exports.SecupayPrepay = undefined;

var _transaction = require('./transaction');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SecupayPrepay = exports.SecupayPrepay = function (_Transaction) {
    _inherits(SecupayPrepay, _Transaction);

    function SecupayPrepay(transfer_purpose, transfer_account, customer, contract, amount, currency, purpose, order_id, trans_id, status, transaction_status) {
        _classCallCheck(this, SecupayPrepay);

        var _this = _possibleConstructorReturn(this, _Transaction.call(this, customer, contract, amount, currency, purpose, order_id, trans_id, status, transaction_status));

        _this.transfer_purpose = transfer_purpose;
        _this.transfer_account = transfer_account;

        return _this;
    }

    return SecupayPrepay;
}(_transaction.Transaction);