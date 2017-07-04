System.register(['./transaction'], function (_export) {
    'use strict';

    var Transaction, SecupayDebit;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_transaction) {
            Transaction = _transaction.Transaction;
        }],
        execute: function () {
            SecupayDebit = (function (_Transaction) {
                function SecupayDebit(container, customer, contract, amount, currency, purpose, order_id, trans_id, status, transaction_status) {
                    _classCallCheck(this, SecupayDebit);

                    _Transaction.call(this, customer, contract, amount, currency, purpose, order_id, trans_id, status, transaction_status);
                    this.container = container;
                }

                _inherits(SecupayDebit, _Transaction);

                return SecupayDebit;
            })(Transaction);

            _export('SecupayDebit', SecupayDebit);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L21vZGVsL3NlY3VwYXktZGViaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3FCQVlhLFlBQVk7Ozs7Ozs7O3VDQURqQixXQUFXOzs7QUFDTix3QkFBWTtBQUVWLHlCQUZGLFlBQVksQ0FFVCxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRTswQ0FGN0csWUFBWTs7QUFJakIsNENBQU0sUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3JHLHdCQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztpQkFFOUI7OzBCQVBRLFlBQVk7O3VCQUFaLFlBQVk7ZUFBUyxXQUFXOztvQ0FBaEMsWUFBWSIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvcGF5bWVudC9tb2RlbC9zZWN1cGF5LWRlYml0LmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==