System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, StoreService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			StoreService = (function (_ProductService) {
				function StoreService() {
					_classCallCheck(this, StoreService);

					_ProductService.call(this);
				}

				_inherits(StoreService, _ProductService);

				StoreService.prototype.getEndpoint = function getEndpoint() {
					return ['general', 'stores'];
				};

				StoreService.prototype.getEventTargets = function getEventTargets() {
					return [];
				};

				StoreService.prototype.checkIn = function checkIn(storeId, checkInState) {
					return this.updateWithAction(storeId, 'checkin', checkInState);
				};

				StoreService.prototype.setDefault = function setDefault(storeId) {
					return this.updateWithAction(storeId, 'setDefault');
				};

				return StoreService;
			})(ProductService);

			_export('StoreService', StoreService);

			StoreService.Uid = ['general', 'stores'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL3N0b3JlLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3FCQUVhLFlBQVk7Ozs7Ozs7O29DQUZqQixjQUFjOzs7QUFFVCxlQUFZO0FBRWIsYUFGQyxZQUFZLEdBRVY7MkJBRkYsWUFBWTs7QUFHdkIsK0JBQU8sQ0FBQTtLQUNQOztjQUpXLFlBQVk7O0FBQVosZ0JBQVksV0FNeEIsV0FBVyxHQUFBLHVCQUFHO0FBQ2IsWUFBTyxDQUFDLFNBQVMsRUFBQyxRQUFRLENBQUMsQ0FBQztLQUM1Qjs7QUFSVyxnQkFBWSxXQVV4QixlQUFlLEdBQUEsMkJBQUc7QUFDakIsWUFBTyxFQUFFLENBQUM7S0FDVjs7QUFaVyxnQkFBWSxXQWN4QixPQUFPLEdBQUEsaUJBQUMsT0FBTyxFQUFFLFlBQVksRUFBRTtBQUM5QixZQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO0tBQy9EOztBQWhCVyxnQkFBWSxXQWtCeEIsVUFBVSxHQUFBLG9CQUFDLE9BQU8sRUFBRTtBQUNuQixZQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7S0FDcEQ7O1dBcEJXLFlBQVk7TUFBUyxjQUFjOzsyQkFBbkMsWUFBWTs7QUF3QnpCLGVBQVksQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFNBQVMsRUFBQyxRQUFRLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2dlbmVyYWwvc3RvcmUtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=