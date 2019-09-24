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
                    return ['loyalty', 'transactions'];
                };

                TransactionService.prototype.getEventTargets = function getEventTargets() {
                    return ['loyalty.transactions'];
                };

                TransactionService.prototype.retrieveTemplates = function retrieveTemplates(merchantId) {
                    return this.retrieveWithAction('me', 'templateList', merchantId);
                };

                return TransactionService;
            })(ProductService);

            _export('TransactionService', TransactionService);

            TransactionService.Uid = ['loyalty', 'transactions'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L3RyYW5zYWN0aW9uLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLGtCQUFrQjs7Ozs7Ozs7NkNBRnZCLGNBQWM7OztBQUVULDhCQUFrQjswQkFBbEIsa0JBQWtCOztBQUVoQix5QkFGRixrQkFBa0IsR0FFYjswQ0FGTCxrQkFBa0I7O0FBR3ZCLDhDQUFPLENBQUE7aUJBQ1Y7O0FBSlEsa0NBQWtCLFdBTTNCLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO2lCQUN0Qzs7QUFSUSxrQ0FBa0IsV0FVM0IsZUFBZSxHQUFBLDJCQUFHO0FBQ2QsMkJBQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2lCQUNuQzs7QUFaUSxrQ0FBa0IsV0FjM0IsaUJBQWlCLEdBQUEsMkJBQUMsVUFBVSxFQUFFO0FBQzFCLDJCQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2lCQUNwRTs7dUJBaEJRLGtCQUFrQjtlQUFTLGNBQWM7Ozs7QUFtQnRELDhCQUFrQixDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvbG95YWx0eS90cmFuc2FjdGlvbi1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
