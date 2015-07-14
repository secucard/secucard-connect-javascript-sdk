System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, TransactionService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC90cmFuc2FjdGlvbi1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztxQkFFYSxrQkFBa0I7Ozs7Ozs7O29DQUZ2QixjQUFjOzs7QUFFVCxxQkFBa0I7QUFFbkIsYUFGQyxrQkFBa0IsR0FFaEI7MkJBRkYsa0JBQWtCOztBQUc3QiwrQkFBTyxDQUFBO0tBQ1A7O2NBSlcsa0JBQWtCOztBQUFsQixzQkFBa0IsV0FNOUIsV0FBVyxHQUFBLHVCQUFHO0FBQ2IsWUFBTyxDQUFDLE9BQU8sRUFBQyxjQUFjLENBQUMsQ0FBQztLQUNoQzs7V0FSVyxrQkFBa0I7TUFBUyxjQUFjOztpQ0FBekMsa0JBQWtCIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC90cmFuc2FjdGlvbi1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==