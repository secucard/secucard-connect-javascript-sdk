'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _transaction = require('./transaction');

var SecupayDebit = (function (_Transaction) {
    function SecupayDebit(container, customer, contract, amount, currency, purpose, order_id, trans_id, status, transaction_status) {
        _classCallCheck(this, SecupayDebit);

        _Transaction.call(this, customer, contract, amount, currency, purpose, order_id, trans_id, status, transaction_status);
        this.container = container;
    }

    _inherits(SecupayDebit, _Transaction);

    return SecupayDebit;
})(_transaction.Transaction);

exports.SecupayDebit = SecupayDebit;