System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, SaleService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			SaleService = (function (_ProductService) {
				function SaleService() {
					_classCallCheck(this, SaleService);

					_ProductService.call(this);
				}

				_inherits(SaleService, _ProductService);

				SaleService.prototype.getEndpoint = function getEndpoint() {
					return ['loyalty', 'sales'];
				};

				SaleService.prototype.getEventTargets = function getEventTargets() {
					return [];
				};

				return SaleService;
			})(ProductService);

			_export('SaleService', SaleService);

			SaleService.Uid = ['loyalty', 'sales'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L3NhbGUtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7cUJBYWEsV0FBVzs7Ozs7Ozs7b0NBRmhCLGNBQWM7OztBQUVULGNBQVc7QUFFWixhQUZDLFdBQVcsR0FFVDsyQkFGRixXQUFXOztBQUd0QiwrQkFBTyxDQUFBO0tBQ1A7O2NBSlcsV0FBVzs7QUFBWCxlQUFXLFdBTXZCLFdBQVcsR0FBQSx1QkFBRztBQUNiLFlBQU8sQ0FBQyxTQUFTLEVBQUMsT0FBTyxDQUFDLENBQUM7S0FDM0I7O0FBUlcsZUFBVyxXQVV2QixlQUFlLEdBQUEsMkJBQUc7QUFDakIsWUFBTyxFQUFFLENBQUM7S0FDVjs7V0FaVyxXQUFXO01BQVMsY0FBYzs7MEJBQWxDLFdBQVc7O0FBZ0J4QixjQUFXLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUMsT0FBTyxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L3NhbGUtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=