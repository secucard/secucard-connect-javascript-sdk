System.register(['./transaction'], function (_export) {
  'use strict';

  var Transaction, SecupayDebit;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_transaction) {
      Transaction = _transaction.Transaction;
    }],
    execute: function () {
      SecupayDebit = (function (_Transaction) {
        _inherits(SecupayDebit, _Transaction);

        function SecupayDebit(container, purpose, customer, recipient, basket, experience, accrual, subscription, redirectUrl, optData, paymentAction, contract, amount, currency, orderId, transId, status, transactionStatus) {
          _classCallCheck(this, SecupayDebit);

          _Transaction.call(this, purpose, customer, recipient, basket, experience, accrual, subscription, redirectUrl, optData, paymentAction, contract, amount, currency, orderId, transId, status, transactionStatus);
          this['container'] = container;
        }

        return SecupayDebit;
      })(Transaction);

      _export('SecupayDebit', SecupayDebit);
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L21vZGVsL3NlY3VwYXktZGViaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O21CQUNhLFlBQVk7Ozs7Ozs7O2lDQURqQixXQUFXOzs7QUFDTixrQkFBWTtrQkFBWixZQUFZOztBQUNaLGlCQURBLFlBQVksQ0FFckIsU0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUN4RyxhQUFhLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUU7Z0NBSC9FLFlBQVk7O0FBSXJCLGtDQUFNLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFDaEgsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztBQUMzRSxjQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsU0FBUyxDQUFDO1NBQy9COztlQVBVLFlBQVk7U0FBUyxXQUFXIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L21vZGVsL3NlY3VwYXktZGViaXQuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
