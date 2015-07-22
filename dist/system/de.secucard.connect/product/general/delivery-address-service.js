System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, DeliveryAddressService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			DeliveryAddressService = (function (_ProductService) {
				function DeliveryAddressService() {
					_classCallCheck(this, DeliveryAddressService);

					_ProductService.call(this);
				}

				_inherits(DeliveryAddressService, _ProductService);

				DeliveryAddressService.prototype.getEndpoint = function getEndpoint() {
					return ['general', 'deliveryaddresses'];
				};

				DeliveryAddressService.prototype.getEventTargets = function getEventTargets() {
					return [];
				};

				return DeliveryAddressService;
			})(ProductService);

			_export('DeliveryAddressService', DeliveryAddressService);

			DeliveryAddressService.Uid = ['general', 'deliveryaddresses'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL2RlbGl2ZXJ5LWFkZHJlc3Mtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7cUJBRWEsc0JBQXNCOzs7Ozs7OztvQ0FGM0IsY0FBYzs7O0FBRVQseUJBQXNCO0FBRXZCLGFBRkMsc0JBQXNCLEdBRXBCOzJCQUZGLHNCQUFzQjs7QUFHakMsK0JBQU8sQ0FBQTtLQUNQOztjQUpXLHNCQUFzQjs7QUFBdEIsMEJBQXNCLFdBTWxDLFdBQVcsR0FBQSx1QkFBRztBQUNiLFlBQU8sQ0FBQyxTQUFTLEVBQUMsbUJBQW1CLENBQUMsQ0FBQztLQUN2Qzs7QUFSVywwQkFBc0IsV0FVbEMsZUFBZSxHQUFBLDJCQUFHO0FBQ2pCLFlBQU8sRUFBRSxDQUFDO0tBQ1Y7O1dBWlcsc0JBQXNCO01BQVMsY0FBYzs7cUNBQTdDLHNCQUFzQjs7QUFnQm5DLHlCQUFzQixDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsU0FBUyxFQUFDLG1CQUFtQixDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL2RlbGl2ZXJ5LWFkZHJlc3Mtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=