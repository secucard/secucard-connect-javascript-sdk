System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, ChargeService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			ChargeService = (function (_ProductService) {
				function ChargeService() {
					_classCallCheck(this, ChargeService);

					_ProductService.call(this);
				}

				_inherits(ChargeService, _ProductService);

				ChargeService.prototype.getEndpoint = function getEndpoint() {
					return ['loyalty', 'charges'];
				};

				ChargeService.prototype.getEventTargets = function getEventTargets() {
					return [];
				};

				return ChargeService;
			})(ProductService);

			_export('ChargeService', ChargeService);

			ChargeService.Uid = ['loyalty', 'charges'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2NoYXJnZS1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztxQkFFYSxhQUFhOzs7Ozs7OztvQ0FGbEIsY0FBYzs7O0FBRVQsZ0JBQWE7QUFFZCxhQUZDLGFBQWEsR0FFWDsyQkFGRixhQUFhOztBQUd4QiwrQkFBTyxDQUFBO0tBQ1A7O2NBSlcsYUFBYTs7QUFBYixpQkFBYSxXQU16QixXQUFXLEdBQUEsdUJBQUc7QUFDYixZQUFPLENBQUMsU0FBUyxFQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQzdCOztBQVJXLGlCQUFhLFdBVXpCLGVBQWUsR0FBQSwyQkFBRztBQUNqQixZQUFPLEVBQUUsQ0FBQztLQUNWOztXQVpXLGFBQWE7TUFBUyxjQUFjOzs0QkFBcEMsYUFBYTs7QUFnQjFCLGdCQUFhLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUMsU0FBUyxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2NoYXJnZS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==