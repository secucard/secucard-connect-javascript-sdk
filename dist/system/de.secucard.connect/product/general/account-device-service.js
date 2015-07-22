System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, AccountDeviceService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			AccountDeviceService = (function (_ProductService) {
				function AccountDeviceService() {
					_classCallCheck(this, AccountDeviceService);

					_ProductService.call(this);
				}

				_inherits(AccountDeviceService, _ProductService);

				AccountDeviceService.prototype.getEndpoint = function getEndpoint() {
					return ['general', 'accountdevices'];
				};

				AccountDeviceService.prototype.getEventTargets = function getEventTargets() {
					return ['general.accountdevices'];
				};

				return AccountDeviceService;
			})(ProductService);

			_export('AccountDeviceService', AccountDeviceService);

			AccountDeviceService.Uid = ['general', 'accountdevices'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL2FjY291bnQtZGV2aWNlLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3FCQUVhLG9CQUFvQjs7Ozs7Ozs7b0NBRnpCLGNBQWM7OztBQUVULHVCQUFvQjtBQUVyQixhQUZDLG9CQUFvQixHQUVsQjsyQkFGRixvQkFBb0I7O0FBRy9CLCtCQUFPLENBQUE7S0FDUDs7Y0FKVyxvQkFBb0I7O0FBQXBCLHdCQUFvQixXQU1oQyxXQUFXLEdBQUEsdUJBQUc7QUFDYixZQUFPLENBQUMsU0FBUyxFQUFDLGdCQUFnQixDQUFDLENBQUM7S0FDcEM7O0FBUlcsd0JBQW9CLFdBVWhDLGVBQWUsR0FBQSwyQkFBRztBQUNqQixZQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQztLQUNsQzs7V0FaVyxvQkFBb0I7TUFBUyxjQUFjOzttQ0FBM0Msb0JBQW9COztBQWdCakMsdUJBQW9CLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUMsZ0JBQWdCLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2dlbmVyYWwvYWNjb3VudC1kZXZpY2Utc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=