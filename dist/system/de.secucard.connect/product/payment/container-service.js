System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, ContainerService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			ContainerService = (function (_ProductService) {
				function ContainerService() {
					_classCallCheck(this, ContainerService);

					_ProductService.call(this);
				}

				_inherits(ContainerService, _ProductService);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L2NvbnRhaW5lci1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztxQkFhYSxnQkFBZ0I7Ozs7Ozs7O29DQUZyQixjQUFjOzs7QUFFVCxtQkFBZ0I7QUFFakIsYUFGQyxnQkFBZ0IsR0FFZDsyQkFGRixnQkFBZ0I7O0FBRzNCLCtCQUFPLENBQUE7S0FDUDs7Y0FKVyxnQkFBZ0I7O0FBQWhCLG9CQUFnQixXQU01QixXQUFXLEdBQUEsdUJBQUc7QUFDYixZQUFPLENBQUMsU0FBUyxFQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ2hDOztBQVJXLG9CQUFnQixXQVU1QixlQUFlLEdBQUEsMkJBQUc7QUFDakIsWUFBTyxFQUFFLENBQUM7S0FDVjs7QUFaVyxvQkFBZ0IsV0FjNUIsY0FBYyxHQUFBLHdCQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUU7QUFDdkMsWUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDdkQ7O0FBaEJXLG9CQUFnQixXQWtCNUIsY0FBYyxHQUFBLHdCQUFDLFdBQVcsRUFBRTtBQUMzQixZQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDcEQ7O1dBcEJXLGdCQUFnQjtNQUFTLGNBQWM7OytCQUF2QyxnQkFBZ0I7O0FBd0I3QixtQkFBZ0IsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFNBQVMsRUFBQyxZQUFZLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3BheW1lbnQvY29udGFpbmVyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9