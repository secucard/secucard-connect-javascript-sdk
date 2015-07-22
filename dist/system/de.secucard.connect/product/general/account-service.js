System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, AccountService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			AccountService = (function (_ProductService) {
				function AccountService() {
					_classCallCheck(this, AccountService);

					_ProductService.call(this);
				}

				_inherits(AccountService, _ProductService);

				AccountService.prototype.getEndpoint = function getEndpoint() {
					return ['general', 'accounts'];
				};

				AccountService.prototype.getEventTargets = function getEventTargets() {
					return ['general.accounts'];
				};

				AccountService.prototype.updateLocation = function updateLocation(accountId, location) {
					return this.updateWithAction(accountId, 'location', null, location);
				};

				AccountService.prototype.updateBeacons = function updateBeacons(beaconList) {
					return this.updateWithAction('me', 'beaconEnvironment', null, beaconList);
				};

				AccountService.prototype.updateGCM = function updateGCM(accountId, gcm) {
					return this.updateWithAction(accountId, 'gcm', null, gcm);
				};

				return AccountService;
			})(ProductService);

			_export('AccountService', AccountService);

			AccountService.Uid = ['general', 'accounts'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL2FjY291bnQtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7cUJBRWEsY0FBYzs7Ozs7Ozs7b0NBRm5CLGNBQWM7OztBQUVULGlCQUFjO0FBRWYsYUFGQyxjQUFjLEdBRVo7MkJBRkYsY0FBYzs7QUFHekIsK0JBQU8sQ0FBQTtLQUNQOztjQUpXLGNBQWM7O0FBQWQsa0JBQWMsV0FNMUIsV0FBVyxHQUFBLHVCQUFHO0FBQ2IsWUFBTyxDQUFDLFNBQVMsRUFBQyxVQUFVLENBQUMsQ0FBQztLQUM5Qjs7QUFSVyxrQkFBYyxXQVUxQixlQUFlLEdBQUEsMkJBQUc7QUFDakIsWUFBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7S0FDNUI7O0FBWlcsa0JBQWMsV0FjMUIsY0FBYyxHQUFBLHdCQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUU7QUFDbkMsWUFBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDcEU7O0FBaEJXLGtCQUFjLFdBa0IxQixhQUFhLEdBQUEsdUJBQUMsVUFBVSxFQUFFO0FBQ3pCLFlBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDMUU7O0FBcEJXLGtCQUFjLFdBc0IxQixTQUFTLEdBQUEsbUJBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtBQUN6QixZQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztLQUMxRDs7V0F4QlcsY0FBYztNQUFTLGNBQWM7OzZCQUFyQyxjQUFjOztBQTRCM0IsaUJBQWMsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFNBQVMsRUFBQyxVQUFVLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2dlbmVyYWwvYWNjb3VudC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==