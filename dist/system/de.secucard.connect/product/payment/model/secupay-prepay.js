System.register(['./transaction'], function (_export) {
  'use strict';

  var Transaction, SecupayPrepay;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  return {
    setters: [function (_transaction) {
      Transaction = _transaction.Transaction;
    }],
    execute: function () {
      SecupayPrepay = (function (_Transaction) {
        function SecupayPrepay(transfer_purpose, transfer_account, customer, contract, amount, currency, purpose, order_id, trans_id, status, transaction_status) {
          _classCallCheck(this, SecupayPrepay);

          _Transaction.call(this, customer, contract, amount, currency, purpose, order_id, trans_id, status, transaction_status);
          this.transfer_purpose = transfer_purpose;
          this.transfer_account = transfer_account;
        }

        _inherits(SecupayPrepay, _Transaction);

        return SecupayPrepay;
      })(Transaction);

      _export('SecupayPrepay', SecupayPrepay);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L21vZGVsL3NlY3VwYXktcHJlcGF5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OzttQkFZYSxhQUFhOzs7Ozs7OztpQ0FEbEIsV0FBVzs7O0FBQ04sbUJBQWE7QUFFZCxpQkFGQyxhQUFhLENBRWIsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRTtnQ0FGbkksYUFBYTs7QUFJeEIsa0NBQU0sUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3JHLGNBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztBQUN6QyxjQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7U0FFekM7O2tCQVJXLGFBQWE7O2VBQWIsYUFBYTtTQUFTLFdBQVc7OytCQUFqQyxhQUFhIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L21vZGVsL3NlY3VwYXktcHJlcGF5LmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==