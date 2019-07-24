System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, TransactionsService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            TransactionsService = (function (_ProductService) {
                _inherits(TransactionsService, _ProductService);

                function TransactionsService() {
                    _classCallCheck(this, TransactionsService);

                    _ProductService.call(this);
                }

                TransactionsService.prototype.getEndpoint = function getEndpoint() {
                    return ['pos', 'transactions'];
                };

                TransactionsService.prototype.getEventTargets = function getEventTargets() {
                    return ['pos.transactions'];
                };

                return TransactionsService;
            })(ProductService);

            _export('TransactionsService', TransactionsService);

            TransactionsService.Uid = ['pos', 'transactions'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wb3MvdHJhbnNhY3Rpb25zLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLG1CQUFtQjs7Ozs7Ozs7NkNBRnhCLGNBQWM7OztBQUVULCtCQUFtQjswQkFBbkIsbUJBQW1COztBQUVqQix5QkFGRixtQkFBbUIsR0FFZDswQ0FGTCxtQkFBbUI7O0FBR3hCLDhDQUFPLENBQUE7aUJBQ1Y7O0FBSlEsbUNBQW1CLFdBTTVCLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxDQUFDO2lCQUNsQzs7QUFSUSxtQ0FBbUIsV0FVNUIsZUFBZSxHQUFBLDJCQUFHO0FBQ2QsMkJBQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2lCQUMvQjs7dUJBWlEsbUJBQW1CO2VBQVMsY0FBYzs7OztBQWlCdkQsK0JBQW1CLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxLQUFLLEVBQUUsY0FBYyxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wb3MvdHJhbnNhY3Rpb25zLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
