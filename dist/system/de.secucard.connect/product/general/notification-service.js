System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, NotificationService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			NotificationService = (function (_ProductService) {
				function NotificationService() {
					_classCallCheck(this, NotificationService);

					_ProductService.call(this);
				}

				_inherits(NotificationService, _ProductService);

				NotificationService.prototype.getEndpoint = function getEndpoint() {
					return ['general', 'notifications'];
				};

				NotificationService.prototype.getEventTargets = function getEventTargets() {
					return [];
				};

				return NotificationService;
			})(ProductService);

			_export('NotificationService', NotificationService);

			NotificationService.Uid = ['general', 'notifications'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL25vdGlmaWNhdGlvbi1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztxQkFFYSxtQkFBbUI7Ozs7Ozs7O29DQUZ4QixjQUFjOzs7QUFFVCxzQkFBbUI7QUFFcEIsYUFGQyxtQkFBbUIsR0FFakI7MkJBRkYsbUJBQW1COztBQUc5QiwrQkFBTyxDQUFBO0tBQ1A7O2NBSlcsbUJBQW1COztBQUFuQix1QkFBbUIsV0FNL0IsV0FBVyxHQUFBLHVCQUFHO0FBQ2IsWUFBTyxDQUFDLFNBQVMsRUFBQyxlQUFlLENBQUMsQ0FBQztLQUNuQzs7QUFSVyx1QkFBbUIsV0FVL0IsZUFBZSxHQUFBLDJCQUFHO0FBQ2pCLFlBQU8sRUFBRSxDQUFDO0tBQ1Y7O1dBWlcsbUJBQW1CO01BQVMsY0FBYzs7a0NBQTFDLG1CQUFtQjs7QUFnQmhDLHNCQUFtQixDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsU0FBUyxFQUFDLGVBQWUsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvZ2VuZXJhbC9ub3RpZmljYXRpb24tc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=