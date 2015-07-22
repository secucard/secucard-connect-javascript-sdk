System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, IdentResultService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			IdentResultService = (function (_ProductService) {
				function IdentResultService() {
					_classCallCheck(this, IdentResultService);

					_ProductService.call(this);
				}

				_inherits(IdentResultService, _ProductService);

				IdentResultService.prototype.getEndpoint = function getEndpoint() {
					return ['services', 'identresults'];
				};

				IdentResultService.prototype.getEventTargets = function getEventTargets() {
					return ['services.identresults'];
				};

				return IdentResultService;
			})(ProductService);

			_export('IdentResultService', IdentResultService);

			IdentResultService.Uid = ['services', 'identresults'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zZXJ2aWNlcy9pZGVudC1yZXN1bHQtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7cUJBRWEsa0JBQWtCOzs7Ozs7OztvQ0FGdkIsY0FBYzs7O0FBRVQscUJBQWtCO0FBRW5CLGFBRkMsa0JBQWtCLEdBRWhCOzJCQUZGLGtCQUFrQjs7QUFHN0IsK0JBQU8sQ0FBQTtLQUNQOztjQUpXLGtCQUFrQjs7QUFBbEIsc0JBQWtCLFdBTTlCLFdBQVcsR0FBQSx1QkFBRztBQUNiLFlBQU8sQ0FBQyxVQUFVLEVBQUMsY0FBYyxDQUFDLENBQUM7S0FDbkM7O0FBUlcsc0JBQWtCLFdBVTlCLGVBQWUsR0FBQSwyQkFBRztBQUNqQixZQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQztLQUNqQzs7V0FaVyxrQkFBa0I7TUFBUyxjQUFjOztpQ0FBekMsa0JBQWtCOztBQWdCL0IscUJBQWtCLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxVQUFVLEVBQUMsY0FBYyxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zZXJ2aWNlcy9pZGVudC1yZXN1bHQtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=