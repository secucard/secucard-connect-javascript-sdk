System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, TransactionService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            TransactionService = (function (_ProductService) {
                _inherits(TransactionService, _ProductService);

                function TransactionService() {
                    _classCallCheck(this, TransactionService);

                    _ProductService.call(this);
                }

                TransactionService.prototype.getEndpoint = function getEndpoint() {
                    return ['smart', 'transactions'];
                };

                TransactionService.prototype.getEventTargets = function getEventTargets() {
                    return ['general.notifications'];
                };

                TransactionService.prototype.start = function start(id, type) {
                    return this.execute(id, "start", type);
                };

                TransactionService.prototype.cancel = function cancel(id) {
                    return this.execute(id, "cancel");
                };

                return TransactionService;
            })(ProductService);

            _export('TransactionService', TransactionService);

            TransactionService.Uid = ['smart', 'transactions'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC90cmFuc2FjdGlvbi1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt3QkFhYSxrQkFBa0I7Ozs7Ozs7OzZDQUZ2QixjQUFjOzs7QUFFVCw4QkFBa0I7MEJBQWxCLGtCQUFrQjs7QUFFaEIseUJBRkYsa0JBQWtCLEdBRWI7MENBRkwsa0JBQWtCOztBQUd2Qiw4Q0FBTyxDQUFBO2lCQUNWOztBQUpRLGtDQUFrQixXQU0zQixXQUFXLEdBQUEsdUJBQUc7QUFDViwyQkFBTyxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztpQkFDcEM7O0FBUlEsa0NBQWtCLFdBVTNCLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQztpQkFDcEM7O0FBWlEsa0NBQWtCLFdBYzNCLEtBQUssR0FBQSxlQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUU7QUFDWiwyQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQzFDOztBQWhCUSxrQ0FBa0IsV0FrQjNCLE1BQU0sR0FBQSxnQkFBQyxFQUFFLEVBQUU7QUFDUCwyQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztpQkFDckM7O3VCQXBCUSxrQkFBa0I7ZUFBUyxjQUFjOzs7O0FBd0J0RCw4QkFBa0IsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3NtYXJ0L3RyYW5zYWN0aW9uLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9