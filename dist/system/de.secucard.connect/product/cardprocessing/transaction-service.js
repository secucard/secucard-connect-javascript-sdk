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
                    return ['cardprocessing', 'transactions'];
                };

                TransactionService.prototype.getEventTargets = function getEventTargets() {
                    return ['cardprocessing.transactions'];
                };

                return TransactionService;
            })(ProductService);

            _export('TransactionService', TransactionService);

            TransactionService.Uid = ['cardprocessing', 'transactions'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9jYXJkcHJvY2Vzc2luZy90cmFuc2FjdGlvbi1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt3QkFhYSxrQkFBa0I7Ozs7Ozs7OzZDQUZ2QixjQUFjOzs7QUFFVCw4QkFBa0I7MEJBQWxCLGtCQUFrQjs7QUFFaEIseUJBRkYsa0JBQWtCLEdBRWI7MENBRkwsa0JBQWtCOztBQUd2Qiw4Q0FBTyxDQUFBO2lCQUNWOztBQUpRLGtDQUFrQixXQU0zQixXQUFXLEdBQUEsdUJBQUc7QUFDViwyQkFBTyxDQUFDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxDQUFDO2lCQUM3Qzs7QUFSUSxrQ0FBa0IsV0FVM0IsZUFBZSxHQUFBLDJCQUFHO0FBQ2QsMkJBQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO2lCQUMxQzs7dUJBWlEsa0JBQWtCO2VBQVMsY0FBYzs7OztBQWlCdEQsOEJBQWtCLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxjQUFjLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2NhcmRwcm9jZXNzaW5nL3RyYW5zYWN0aW9uLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
