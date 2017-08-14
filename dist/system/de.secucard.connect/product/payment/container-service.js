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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L2NvbnRhaW5lci1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztzQkFFYSxnQkFBZ0I7Ozs7Ozs7O3VDQUZyQixjQUFjOzs7QUFFVCxzQkFBZ0I7a0JBQWhCLGdCQUFnQjs7QUFFaEIsaUJBRkEsZ0JBQWdCLEdBRWI7Z0NBRkgsZ0JBQWdCOztBQUd6QixvQ0FBTyxDQUFDO1NBQ1Q7O0FBSlUsd0JBQWdCLFdBTTNCLFdBQVcsR0FBQSx1QkFBRztBQUNaLGlCQUFPLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO1NBQ2xDOztBQVJVLHdCQUFnQixXQVUzQixlQUFlLEdBQUEsMkJBQUc7QUFDaEIsaUJBQU8sRUFBRSxDQUFDO1NBQ1g7O0FBWlUsd0JBQWdCLFdBYzNCLGNBQWMsR0FBQSx3QkFBQyxXQUFXLEVBQUUsVUFBVSxFQUFFO0FBQ3RDLGlCQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUN4RDs7QUFoQlUsd0JBQWdCLFdBa0IzQixjQUFjLEdBQUEsd0JBQUMsV0FBVyxFQUFFO0FBQzFCLGlCQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDckQ7O2VBcEJVLGdCQUFnQjtTQUFTLGNBQWM7Ozs7QUF3QnBELHNCQUFnQixDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvcGF5bWVudC9jb250YWluZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
