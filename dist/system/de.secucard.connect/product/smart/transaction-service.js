System.register(['babel-runtime/helpers/inherits', 'babel-runtime/helpers/class-call-check', '../product-service'], function (_export) {
	var _inherits, _classCallCheck, ProductService, TransactionService;

	return {
		setters: [function (_babelRuntimeHelpersInherits) {
			_inherits = _babelRuntimeHelpersInherits['default'];
		}, function (_babelRuntimeHelpersClassCallCheck) {
			_classCallCheck = _babelRuntimeHelpersClassCallCheck['default'];
		}, function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			'use strict';

			TransactionService = (function (_ProductService) {
				function TransactionService() {
					_classCallCheck(this, TransactionService);

					_ProductService.call(this);
				}

				_inherits(TransactionService, _ProductService);

				TransactionService.prototype.getEndpoint = function getEndpoint() {
					return ['Smart', 'Transactions'];
				};

				return TransactionService;
			})(ProductService);

			_export('TransactionService', TransactionService);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC90cmFuc2FjdGlvbi1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7aURBRWEsa0JBQWtCOzs7Ozs7OztvQ0FGdkIsY0FBYzs7Ozs7QUFFVCxxQkFBa0I7QUFFbkIsYUFGQyxrQkFBa0IsR0FFaEI7MkJBRkYsa0JBQWtCOztBQUc3QiwrQkFBTyxDQUFBO0tBQ1A7O2NBSlcsa0JBQWtCOztBQUFsQixzQkFBa0IsV0FNOUIsV0FBVyxHQUFBLHVCQUFHO0FBQ2IsWUFBTyxDQUFDLE9BQU8sRUFBQyxjQUFjLENBQUMsQ0FBQztLQUNoQzs7V0FSVyxrQkFBa0I7TUFBUyxjQUFjOztpQ0FBekMsa0JBQWtCIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC90cmFuc2FjdGlvbi1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==