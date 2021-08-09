System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, WebsiteService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			WebsiteService = (function (_ProductService) {
				_inherits(WebsiteService, _ProductService);

				function WebsiteService() {
					_classCallCheck(this, WebsiteService);

					_ProductService.call(this);
				}

				WebsiteService.prototype.getEndpoint = function getEndpoint() {
					return ['public', 'website'];
				};

				WebsiteService.prototype.getEventTargets = function getEventTargets() {
					return [];
				};

				return WebsiteService;
			})(ProductService);

			_export('WebsiteService', WebsiteService);

			WebsiteService.Uid = ['public', 'website'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wdWJsaWMvd2Vic2l0ZS1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztxQkFFYSxjQUFjOzs7Ozs7OztvQ0FGbkIsY0FBYzs7O0FBRVQsaUJBQWM7Y0FBZCxjQUFjOztBQUVmLGFBRkMsY0FBYyxHQUVaOzJCQUZGLGNBQWM7O0FBR3pCLCtCQUFPLENBQUM7S0FDUjs7QUFKVyxrQkFBYyxXQU0xQixXQUFXLEdBQUEsdUJBQUc7QUFDYixZQUFPLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0tBQzdCOztBQVJXLGtCQUFjLFdBVTFCLGVBQWUsR0FBQSwyQkFBRztBQUNqQixZQUFPLEVBQUUsQ0FBQztLQUNWOztXQVpXLGNBQWM7TUFBUyxjQUFjOzs7O0FBZWxELGlCQUFjLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wdWJsaWMvd2Vic2l0ZS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
