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
					return ['smart', 'transactions'];
				};

				TransactionService.prototype.getEventTargets = function getEventTargets() {
					return ['general.notifications'];
				};

				TransactionService.prototype.start = function start(id, type) {
					return this.execute(id, 'start', type);
				};

				TransactionService.prototype.cancel = function cancel(id) {
					return this.execute(id, 'cancel');
				};

				return TransactionService;
			})(ProductService);

			_export('TransactionService', TransactionService);

			TransactionService.Uid = ['smart', 'transactions'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC90cmFuc2FjdGlvbi1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztxQkFhYSxrQkFBa0I7Ozs7Ozs7O29DQUZ2QixjQUFjOzs7QUFFVCxxQkFBa0I7QUFFbkIsYUFGQyxrQkFBa0IsR0FFaEI7MkJBRkYsa0JBQWtCOztBQUc3QiwrQkFBTyxDQUFBO0tBQ1A7O2NBSlcsa0JBQWtCOztBQUFsQixzQkFBa0IsV0FNOUIsV0FBVyxHQUFBLHVCQUFHO0FBQ2IsWUFBTyxDQUFDLE9BQU8sRUFBQyxjQUFjLENBQUMsQ0FBQztLQUNoQzs7QUFSVyxzQkFBa0IsV0FVOUIsZUFBZSxHQUFBLDJCQUFHO0FBQ2pCLFlBQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0tBQ2pDOztBQVpXLHNCQUFrQixXQWM5QixLQUFLLEdBQUEsZUFBQyxFQUFFLEVBQUUsSUFBSSxFQUFFO0FBQ2YsWUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDdkM7O0FBaEJXLHNCQUFrQixXQWtCOUIsTUFBTSxHQUFBLGdCQUFDLEVBQUUsRUFBRTtBQUNWLFlBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDbEM7O1dBcEJXLGtCQUFrQjtNQUFTLGNBQWM7O2lDQUF6QyxrQkFBa0I7O0FBd0IvQixxQkFBa0IsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLE9BQU8sRUFBQyxjQUFjLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3NtYXJ0L3RyYW5zYWN0aW9uLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9