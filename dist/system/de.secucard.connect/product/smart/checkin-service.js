System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, CheckinService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			CheckinService = (function (_ProductService) {
				function CheckinService() {
					_classCallCheck(this, CheckinService);

					_ProductService.call(this);
				}

				_inherits(CheckinService, _ProductService);

				CheckinService.prototype.getEndpoint = function getEndpoint() {
					return ['smart', 'checkin'];
				};

				CheckinService.prototype.getEventTargets = function getEventTargets() {
					return ['smart.checkin'];
				};

				return CheckinService;
			})(ProductService);

			_export('CheckinService', CheckinService);

			CheckinService.Uid = ['smart', 'checkin'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9jaGVja2luLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3FCQUVhLGNBQWM7Ozs7Ozs7O29DQUZuQixjQUFjOzs7QUFFVCxpQkFBYztBQUVmLGFBRkMsY0FBYyxHQUVaOzJCQUZGLGNBQWM7O0FBR3pCLCtCQUFPLENBQUE7S0FDUDs7Y0FKVyxjQUFjOztBQUFkLGtCQUFjLFdBTTFCLFdBQVcsR0FBQSx1QkFBRztBQUNiLFlBQU8sQ0FBQyxPQUFPLEVBQUMsU0FBUyxDQUFDLENBQUM7S0FDM0I7O0FBUlcsa0JBQWMsV0FVMUIsZUFBZSxHQUFBLDJCQUFHO0FBQ2pCLFlBQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztLQUN6Qjs7V0FaVyxjQUFjO01BQVMsY0FBYzs7NkJBQXJDLGNBQWM7O0FBaUIzQixpQkFBYyxDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsT0FBTyxFQUFDLFNBQVMsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3Qvc21hcnQvY2hlY2tpbi1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==