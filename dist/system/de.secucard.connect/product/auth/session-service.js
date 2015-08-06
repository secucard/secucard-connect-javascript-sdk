System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, SessionService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			SessionService = (function (_ProductService) {
				function SessionService() {
					_classCallCheck(this, SessionService);

					_ProductService.call(this);
				}

				_inherits(SessionService, _ProductService);

				SessionService.prototype.getEndpoint = function getEndpoint() {
					return ['auth', 'sessions'];
				};

				SessionService.prototype.getEventTargets = function getEventTargets() {
					return [];
				};

				SessionService.prototype.check = function check() {
					return this.retrieveWithAction('me', 'debug');
				};

				return SessionService;
			})(ProductService);

			_export('SessionService', SessionService);

			SessionService.Uid = ['auth', 'sessions'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9hdXRoL3Nlc3Npb24tc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7cUJBYWEsY0FBYzs7Ozs7Ozs7b0NBRm5CLGNBQWM7OztBQUVULGlCQUFjO0FBRWYsYUFGQyxjQUFjLEdBRVo7MkJBRkYsY0FBYzs7QUFHekIsK0JBQU8sQ0FBQTtLQUNQOztjQUpXLGNBQWM7O0FBQWQsa0JBQWMsV0FNMUIsV0FBVyxHQUFBLHVCQUFHO0FBQ2IsWUFBTyxDQUFDLE1BQU0sRUFBQyxVQUFVLENBQUMsQ0FBQztLQUMzQjs7QUFSVyxrQkFBYyxXQVUxQixlQUFlLEdBQUEsMkJBQUc7QUFDakIsWUFBTyxFQUFFLENBQUM7S0FDVjs7QUFaVyxrQkFBYyxXQWMxQixLQUFLLEdBQUEsaUJBQUc7QUFDUCxZQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDOUM7O1dBaEJXLGNBQWM7TUFBUyxjQUFjOzs2QkFBckMsY0FBYzs7QUFvQjNCLGlCQUFjLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxNQUFNLEVBQUMsVUFBVSxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9hdXRoL3Nlc3Npb24tc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=