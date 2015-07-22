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

				AccountService.prototype.create = function create(data, options) {

					options = Object.assign({}, options, {
						channelConfig: ['rest'],
						useAuth: false });

					return _ProductService.prototype.create.call(this, data, options);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL2FjY291bnQtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7cUJBRWEsY0FBYzs7Ozs7Ozs7b0NBRm5CLGNBQWM7OztBQUVULGlCQUFjO0FBRWYsYUFGQyxjQUFjLEdBRVo7MkJBRkYsY0FBYzs7QUFHekIsK0JBQU8sQ0FBQTtLQUNQOztjQUpXLGNBQWM7O0FBQWQsa0JBQWMsV0FNMUIsV0FBVyxHQUFBLHVCQUFHO0FBQ2IsWUFBTyxDQUFDLFNBQVMsRUFBQyxVQUFVLENBQUMsQ0FBQztLQUM5Qjs7QUFSVyxrQkFBYyxXQVUxQixlQUFlLEdBQUEsMkJBQUc7QUFDakIsWUFBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7S0FDNUI7O0FBWlcsa0JBQWMsV0FjMUIsTUFBTSxHQUFBLGdCQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7O0FBRXJCLFlBQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUU7QUFDcEMsbUJBQWEsRUFBRSxDQUFDLE1BQU0sQ0FBQztBQUN2QixhQUFPLEVBQUUsS0FBSyxFQUNkLENBQUMsQ0FBQzs7QUFFSCxZQUFPLDBCQUFNLE1BQU0sS0FBQSxPQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztLQUVuQzs7QUF2Qlcsa0JBQWMsV0F5QjFCLGNBQWMsR0FBQSx3QkFBQyxTQUFTLEVBQUUsUUFBUSxFQUFFO0FBQ25DLFlBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQ3BFOztBQTNCVyxrQkFBYyxXQTZCMUIsYUFBYSxHQUFBLHVCQUFDLFVBQVUsRUFBRTtBQUN6QixZQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQzFFOztBQS9CVyxrQkFBYyxXQWlDMUIsU0FBUyxHQUFBLG1CQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7QUFDekIsWUFBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDMUQ7O1dBbkNXLGNBQWM7TUFBUyxjQUFjOzs2QkFBckMsY0FBYzs7QUF1QzNCLGlCQUFjLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUMsVUFBVSxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL2FjY291bnQtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=