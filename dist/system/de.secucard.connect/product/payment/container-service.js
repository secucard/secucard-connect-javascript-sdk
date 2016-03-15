System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, ContainerService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            ContainerService = (function (_ProductService) {
                _inherits(ContainerService, _ProductService);

                function ContainerService() {
                    _classCallCheck(this, ContainerService);

                    _ProductService.call(this);
                }

                ContainerService.prototype.getEndpoint = function getEndpoint() {
                    return ['payment', 'containers'];
                };

                ContainerService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                ContainerService.prototype.assignCustomer = function assignCustomer(containerId, customerId) {
                    return this.execute(containerId, 'assign', customerId);
                };

                ContainerService.prototype.removeCustomer = function removeCustomer(containerId) {
                    return this.removeWithAction(containerId, 'assign');
                };

                return ContainerService;
            })(ProductService);

            _export('ContainerService', ContainerService);

            ContainerService.Uid = ['payment', 'containers'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L2NvbnRhaW5lci1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt3QkFhYSxnQkFBZ0I7Ozs7Ozs7OzZDQUZyQixjQUFjOzs7QUFFVCw0QkFBZ0I7MEJBQWhCLGdCQUFnQjs7QUFFZCx5QkFGRixnQkFBZ0IsR0FFWDswQ0FGTCxnQkFBZ0I7O0FBR3JCLDhDQUFPLENBQUE7aUJBQ1Y7O0FBSlEsZ0NBQWdCLFdBTXpCLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO2lCQUNwQzs7QUFSUSxnQ0FBZ0IsV0FVekIsZUFBZSxHQUFBLDJCQUFHO0FBQ2QsMkJBQU8sRUFBRSxDQUFDO2lCQUNiOztBQVpRLGdDQUFnQixXQWN6QixjQUFjLEdBQUEsd0JBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRTtBQUNwQywyQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQzFEOztBQWhCUSxnQ0FBZ0IsV0FrQnpCLGNBQWMsR0FBQSx3QkFBQyxXQUFXLEVBQUU7QUFDeEIsMkJBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztpQkFDdkQ7O3VCQXBCUSxnQkFBZ0I7ZUFBUyxjQUFjOzs7O0FBd0JwRCw0QkFBZ0IsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3BheW1lbnQvY29udGFpbmVyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9