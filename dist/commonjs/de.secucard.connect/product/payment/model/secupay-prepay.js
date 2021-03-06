'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _transaction = require('./transaction');

var SecupayPrepay = (function (_Transaction) {
    _inherits(SecupayPrepay, _Transaction);

    function SecupayPrepay(transfer_purpose, transfer_account, customer, contract, amount, currency, purpose, order_id, trans_id, status, transaction_status) {
        _classCallCheck(this, SecupayPrepay);

        _Transaction.call(this, customer, contract, amount, currency, purpose, order_id, trans_id, status, transaction_status);
        this.transfer_purpose = transfer_purpose;
        this.transfer_account = transfer_account;
    }

    return SecupayPrepay;
})(_transaction.Transaction);

exports.SecupayPrepay = SecupayPrepay;