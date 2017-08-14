System.register(['./transaction'], function (_export) {
  'use strict';

  var Transaction, SecupayCreditcard;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_transaction) {
      Transaction = _transaction.Transaction;
    }],
    execute: function () {
      SecupayCreditcard = (function (_Transaction) {
        _inherits(SecupayCreditcard, _Transaction);

        function SecupayCreditcard(purpose, customer, recipient, basket, experience, accrual, subscription, redirectUrl, optData, paymentAction, contract, amount, currency, orderId, transId, status, transactionStatus) {
          _classCallCheck(this, SecupayCreditcard);

          _Transaction.call(this, purpose, customer, recipient, basket, experience, accrual, subscription, redirectUrl, optData, paymentAction, contract, amount, currency, orderId, transId, status, transactionStatus);
        }

        return SecupayCreditcard;
      })(Transaction);

      _export('SecupayCreditcard', SecupayCreditcard);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L21vZGVsL3NlY3VwYXktY3JlZGl0Y2FyZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7bUJBQ2EsaUJBQWlCOzs7Ozs7OztpQ0FEdEIsV0FBVzs7O0FBQ04sdUJBQWlCO2tCQUFqQixpQkFBaUI7O0FBQ2pCLGlCQURBLGlCQUFpQixDQUUxQixPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQzVHLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFO2dDQUhoRSxpQkFBaUI7O0FBSTFCLGtDQUFNLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFDaEgsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztTQUM1RTs7ZUFOVSxpQkFBaUI7U0FBUyxXQUFXIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L21vZGVsL3NlY3VwYXktY3JlZGl0Y2FyZC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
