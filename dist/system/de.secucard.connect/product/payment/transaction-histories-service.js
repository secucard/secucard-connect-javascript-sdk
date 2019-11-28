System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, TransactionHistoriesService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			TransactionHistoriesService = (function (_ProductService) {
				_inherits(TransactionHistoriesService, _ProductService);

				function TransactionHistoriesService() {
					_classCallCheck(this, TransactionHistoriesService);

					_ProductService.call(this);
				}

				TransactionHistoriesService.prototype.getEndpoint = function getEndpoint() {
					return ['payment', 'transactionhistories'];
				};

				TransactionHistoriesService.prototype.getEventTargets = function getEventTargets() {
					return [];
				};

				return TransactionHistoriesService;
			})(ProductService);

			_export('TransactionHistoriesService', TransactionHistoriesService);

			TransactionHistoriesService.Uid = ['payment', 'transactionhistories'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3RyYW5zYWN0aW9uLWhpc3Rvcmllcy1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztxQkFFYSwyQkFBMkI7Ozs7Ozs7O29DQUZoQyxjQUFjOzs7QUFFVCw4QkFBMkI7Y0FBM0IsMkJBQTJCOztBQUM1QixhQURDLDJCQUEyQixHQUN6QjsyQkFERiwyQkFBMkI7O0FBRXRDLCtCQUFPLENBQUE7S0FDUDs7QUFIVywrQkFBMkIsV0FLdkMsV0FBVyxHQUFBLHVCQUFHO0FBQ2IsWUFBTyxDQUFDLFNBQVMsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO0tBQzNDOztBQVBXLCtCQUEyQixXQVN2QyxlQUFlLEdBQUEsMkJBQUc7QUFDakIsWUFBTyxFQUFFLENBQUM7S0FDVjs7V0FYVywyQkFBMkI7TUFBUyxjQUFjOzs7O0FBYy9ELDhCQUEyQixDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsU0FBUyxFQUFFLHNCQUFzQixDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3RyYW5zYWN0aW9uLWhpc3Rvcmllcy1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
