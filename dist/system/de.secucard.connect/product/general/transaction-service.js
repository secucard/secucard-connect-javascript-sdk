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
					return ['general', 'transactions'];
				};

				TransactionService.prototype.getEventTargets = function getEventTargets() {
					return ['general.transactions'];
				};

				return TransactionService;
			})(ProductService);

			_export('TransactionService', TransactionService);

			TransactionService.Uid = ['general', 'transactions'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL3RyYW5zYWN0aW9uLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3FCQUVhLGtCQUFrQjs7Ozs7Ozs7b0NBRnZCLGNBQWM7OztBQUVULHFCQUFrQjtBQUVuQixhQUZDLGtCQUFrQixHQUVoQjsyQkFGRixrQkFBa0I7O0FBRzdCLCtCQUFPLENBQUE7S0FDUDs7Y0FKVyxrQkFBa0I7O0FBQWxCLHNCQUFrQixXQU05QixXQUFXLEdBQUEsdUJBQUc7QUFDYixZQUFPLENBQUMsU0FBUyxFQUFDLGNBQWMsQ0FBQyxDQUFDO0tBQ2xDOztBQVJXLHNCQUFrQixXQVU5QixlQUFlLEdBQUEsMkJBQUc7QUFDakIsWUFBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7S0FDaEM7O1dBWlcsa0JBQWtCO01BQVMsY0FBYzs7aUNBQXpDLGtCQUFrQjs7QUFnQi9CLHFCQUFrQixDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsU0FBUyxFQUFDLGNBQWMsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvZ2VuZXJhbC90cmFuc2FjdGlvbi1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==