'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _transaction = require('./transaction');

var SecupayPrepay = (function (_Transaction) {
  _inherits(SecupayPrepay, _Transaction);

  function SecupayPrepay(transferPurpose, transferAccount, purpose, customer, recipient, basket, experience, accrual, subscription, redirectUrl, optData, paymentAction, contract, amount, currency, orderId, transId, status, transactionStatus) {
    _classCallCheck(this, SecupayPrepay);

    _Transaction.call(this, purpose, customer, recipient, basket, experience, accrual, subscription, redirectUrl, optData, paymentAction, contract, amount, currency, orderId, transId, status, transactionStatus);
    this['transfer_purpose'] = transferPurpose;
    this['transfer_account'] = transferAccount;
  }

  return SecupayPrepay;
})(_transaction.Transaction);

exports.SecupayPrepay = SecupayPrepay;