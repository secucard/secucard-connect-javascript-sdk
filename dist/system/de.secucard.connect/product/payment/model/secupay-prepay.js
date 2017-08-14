System.register(['./transaction'], function (_export) {
  'use strict';

  var Transaction, SecupayPrepay;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_transaction) {
      Transaction = _transaction.Transaction;
    }],
    execute: function () {
      SecupayPrepay = (function (_Transaction) {
        _inherits(SecupayPrepay, _Transaction);

        function SecupayPrepay(transferPurpose, transferAccount, purpose, customer, recipient, basket, experience, accrual, subscription, redirectUrl, optData, paymentAction, contract, amount, currency, orderId, transId, status, transactionStatus) {
          _classCallCheck(this, SecupayPrepay);

          _Transaction.call(this, purpose, customer, recipient, basket, experience, accrual, subscription, redirectUrl, optData, paymentAction, contract, amount, currency, orderId, transId, status, transactionStatus);
          this['transfer_purpose'] = transferPurpose;
          this['transfer_account'] = transferAccount;
        }

        return SecupayPrepay;
      })(Transaction);

      _export('SecupayPrepay', SecupayPrepay);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L21vZGVsL3NlY3VwYXktcHJlcGF5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OzttQkFDYSxhQUFhOzs7Ozs7OztpQ0FEbEIsV0FBVzs7O0FBQ04sbUJBQWE7a0JBQWIsYUFBYTs7QUFDYixpQkFEQSxhQUFhLENBRXRCLGVBQWUsRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUN6RyxXQUFXLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRTtnQ0FIckcsYUFBYTs7QUFJdEIsa0NBQU0sT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUNoSCxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQzNFLGNBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLGVBQWUsQ0FBQztBQUMzQyxjQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxlQUFlLENBQUM7U0FDNUM7O2VBUlUsYUFBYTtTQUFTLFdBQVciLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3BheW1lbnQvbW9kZWwvc2VjdXBheS1wcmVwYXkuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
