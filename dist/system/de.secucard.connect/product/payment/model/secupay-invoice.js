System.register(['./transaction'], function (_export) {
  'use strict';

  var Transaction, SecupayInvoice;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_transaction) {
      Transaction = _transaction.Transaction;
    }],
    execute: function () {
      SecupayInvoice = (function (_Transaction) {
        _inherits(SecupayInvoice, _Transaction);

        function SecupayInvoice(purpose, customer, recipient, basket, experience, accrual, subscription, redirectUrl, optData, paymentAction, contract, amount, currency, orderId, transId, status, transactionStatus) {
          _classCallCheck(this, SecupayInvoice);

          _Transaction.call(this, purpose, customer, recipient, basket, experience, accrual, subscription, redirectUrl, optData, paymentAction, contract, amount, currency, orderId, transId, status, transactionStatus);
        }

        return SecupayInvoice;
      })(Transaction);

      _export('SecupayInvoice', SecupayInvoice);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L21vZGVsL3NlY3VwYXktaW52b2ljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7bUJBQ2EsY0FBYzs7Ozs7Ozs7aUNBRG5CLFdBQVc7OztBQUNOLG9CQUFjO2tCQUFkLGNBQWM7O0FBQ2QsaUJBREEsY0FBYyxDQUV2QixPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQzVHLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFO2dDQUhoRSxjQUFjOztBQUl2QixrQ0FBTSxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQ2hILFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixDQUFDLENBQUM7U0FDNUU7O2VBTlUsY0FBYztTQUFTLFdBQVciLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3BheW1lbnQvbW9kZWwvc2VjdXBheS1pbnZvaWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
