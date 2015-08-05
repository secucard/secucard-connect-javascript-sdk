System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, IdentService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			IdentService = (function (_ProductService) {
				function IdentService() {
					_classCallCheck(this, IdentService);

					_ProductService.call(this);
				}

				_inherits(IdentService, _ProductService);

				IdentService.prototype.getEndpoint = function getEndpoint() {
					return ['smart', 'idents'];
				};

				IdentService.prototype.getEventTargets = function getEventTargets() {
					return [];
				};

				IdentService.prototype.validate = function validate(id) {
					return this.execute(id, 'validate');
				};

				IdentService.prototype.read = function read(id) {
					return this.execute(id, 'read');
				};

				return IdentService;
			})(ProductService);

			_export('IdentService', IdentService);

			IdentService.Uid = ['smart', 'idents'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9pZGVudC1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztxQkFhYSxZQUFZOzs7Ozs7OztvQ0FGakIsY0FBYzs7O0FBRVQsZUFBWTtBQUViLGFBRkMsWUFBWSxHQUVWOzJCQUZGLFlBQVk7O0FBR3ZCLCtCQUFPLENBQUE7S0FDUDs7Y0FKVyxZQUFZOztBQUFaLGdCQUFZLFdBTXhCLFdBQVcsR0FBQSx1QkFBRztBQUNiLFlBQU8sQ0FBQyxPQUFPLEVBQUMsUUFBUSxDQUFDLENBQUM7S0FDMUI7O0FBUlcsZ0JBQVksV0FVeEIsZUFBZSxHQUFBLDJCQUFHO0FBQ2pCLFlBQU8sRUFBRSxDQUFDO0tBQ1Y7O0FBWlcsZ0JBQVksV0FjeEIsUUFBUSxHQUFBLGtCQUFDLEVBQUUsRUFBRTtBQUNaLFlBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDcEM7O0FBaEJXLGdCQUFZLFdBa0J4QixJQUFJLEdBQUEsY0FBQyxFQUFFLEVBQUU7QUFDUixZQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQ2hDOztXQXBCVyxZQUFZO01BQVMsY0FBYzs7MkJBQW5DLFlBQVk7O0FBd0J6QixlQUFZLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxPQUFPLEVBQUMsUUFBUSxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9pZGVudC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==