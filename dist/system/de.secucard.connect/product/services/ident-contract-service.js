System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, IdentContractService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            IdentContractService = (function (_ProductService) {
                _inherits(IdentContractService, _ProductService);

                function IdentContractService() {
                    _classCallCheck(this, IdentContractService);

                    _ProductService.call(this);
                }

                IdentContractService.prototype.getEndpoint = function getEndpoint() {
                    return ['services', 'identcontracts'];
                };

                IdentContractService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return IdentContractService;
            })(ProductService);

            _export('IdentContractService', IdentContractService);

            IdentContractService.Uid = ['services', 'identcontracts'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zZXJ2aWNlcy9pZGVudC1jb250cmFjdC1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt3QkFhYSxvQkFBb0I7Ozs7Ozs7OzZDQUZ6QixjQUFjOzs7QUFFVCxnQ0FBb0I7MEJBQXBCLG9CQUFvQjs7QUFFbEIseUJBRkYsb0JBQW9CLEdBRWY7MENBRkwsb0JBQW9COztBQUd6Qiw4Q0FBTyxDQUFBO2lCQUNWOztBQUpRLG9DQUFvQixXQU03QixXQUFXLEdBQUEsdUJBQUc7QUFDViwyQkFBTyxDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO2lCQUN6Qzs7QUFSUSxvQ0FBb0IsV0FVN0IsZUFBZSxHQUFBLDJCQUFHO0FBQ2QsMkJBQU8sRUFBRSxDQUFDO2lCQUNiOzt1QkFaUSxvQkFBb0I7ZUFBUyxjQUFjOzs7O0FBZ0J4RCxnQ0FBb0IsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3Qvc2VydmljZXMvaWRlbnQtY29udHJhY3Qtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=