System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, CustomerService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			CustomerService = (function (_ProductService) {
				function CustomerService() {
					_classCallCheck(this, CustomerService);

					_ProductService.call(this);
				}

				_inherits(CustomerService, _ProductService);

				CustomerService.prototype.getEndpoint = function getEndpoint() {
					return ['loyalty', 'customers'];
				};

				CustomerService.prototype.getEventTargets = function getEventTargets() {
					return [];
				};

				return CustomerService;
			})(ProductService);

			_export('CustomerService', CustomerService);

			CustomerService.Uid = ['loyalty', 'customers'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2N1c3RvbWVyLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3FCQUVhLGVBQWU7Ozs7Ozs7O29DQUZwQixjQUFjOzs7QUFFVCxrQkFBZTtBQUVoQixhQUZDLGVBQWUsR0FFYjsyQkFGRixlQUFlOztBQUcxQiwrQkFBTyxDQUFBO0tBQ1A7O2NBSlcsZUFBZTs7QUFBZixtQkFBZSxXQU0zQixXQUFXLEdBQUEsdUJBQUc7QUFDYixZQUFPLENBQUMsU0FBUyxFQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQy9COztBQVJXLG1CQUFlLFdBVTNCLGVBQWUsR0FBQSwyQkFBRztBQUNqQixZQUFPLEVBQUUsQ0FBQztLQUNWOztXQVpXLGVBQWU7TUFBUyxjQUFjOzs4QkFBdEMsZUFBZTs7QUFnQjVCLGtCQUFlLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUMsV0FBVyxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2N1c3RvbWVyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9