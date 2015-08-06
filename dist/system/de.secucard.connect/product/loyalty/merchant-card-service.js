System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, MerchantCardService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			MerchantCardService = (function (_ProductService) {
				function MerchantCardService() {
					_classCallCheck(this, MerchantCardService);

					_ProductService.call(this);
				}

				_inherits(MerchantCardService, _ProductService);

				MerchantCardService.prototype.getEndpoint = function getEndpoint() {
					return ['loyalty', 'merchantcards'];
				};

				MerchantCardService.prototype.getEventTargets = function getEventTargets() {
					return [];
				};

				return MerchantCardService;
			})(ProductService);

			_export('MerchantCardService', MerchantCardService);

			MerchantCardService.Uid = ['loyalty', 'merchantcards'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L21lcmNoYW50LWNhcmQtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7cUJBYWEsbUJBQW1COzs7Ozs7OztvQ0FGeEIsY0FBYzs7O0FBRVQsc0JBQW1CO0FBRXBCLGFBRkMsbUJBQW1CLEdBRWpCOzJCQUZGLG1CQUFtQjs7QUFHOUIsK0JBQU8sQ0FBQTtLQUNQOztjQUpXLG1CQUFtQjs7QUFBbkIsdUJBQW1CLFdBTS9CLFdBQVcsR0FBQSx1QkFBRztBQUNiLFlBQU8sQ0FBQyxTQUFTLEVBQUMsZUFBZSxDQUFDLENBQUM7S0FDbkM7O0FBUlcsdUJBQW1CLFdBVS9CLGVBQWUsR0FBQSwyQkFBRztBQUNqQixZQUFPLEVBQUUsQ0FBQztLQUNWOztXQVpXLG1CQUFtQjtNQUFTLGNBQWM7O2tDQUExQyxtQkFBbUI7O0FBZ0JoQyxzQkFBbUIsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFNBQVMsRUFBQyxlQUFlLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2xveWFsdHkvbWVyY2hhbnQtY2FyZC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==