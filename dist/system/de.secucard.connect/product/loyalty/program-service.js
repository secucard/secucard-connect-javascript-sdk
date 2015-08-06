System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, ProgramService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			ProgramService = (function (_ProductService) {
				function ProgramService() {
					_classCallCheck(this, ProgramService);

					_ProductService.call(this);
				}

				_inherits(ProgramService, _ProductService);

				ProgramService.prototype.getEndpoint = function getEndpoint() {
					return ['loyalty', 'programs'];
				};

				ProgramService.prototype.getEventTargets = function getEventTargets() {
					return [];
				};

				return ProgramService;
			})(ProductService);

			_export('ProgramService', ProgramService);

			ProgramService.Uid = ['loyalty', 'programs'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L3Byb2dyYW0tc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7cUJBYWEsY0FBYzs7Ozs7Ozs7b0NBRm5CLGNBQWM7OztBQUVULGlCQUFjO0FBRWYsYUFGQyxjQUFjLEdBRVo7MkJBRkYsY0FBYzs7QUFHekIsK0JBQU8sQ0FBQTtLQUNQOztjQUpXLGNBQWM7O0FBQWQsa0JBQWMsV0FNMUIsV0FBVyxHQUFBLHVCQUFHO0FBQ2IsWUFBTyxDQUFDLFNBQVMsRUFBQyxVQUFVLENBQUMsQ0FBQztLQUM5Qjs7QUFSVyxrQkFBYyxXQVUxQixlQUFlLEdBQUEsMkJBQUc7QUFDakIsWUFBTyxFQUFFLENBQUM7S0FDVjs7V0FaVyxjQUFjO01BQVMsY0FBYzs7NkJBQXJDLGNBQWM7O0FBZ0IzQixpQkFBYyxDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsU0FBUyxFQUFDLFVBQVUsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvbG95YWx0eS9wcm9ncmFtLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9