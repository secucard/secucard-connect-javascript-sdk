System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, SecupayDebitService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			SecupayDebitService = (function (_ProductService) {
				function SecupayDebitService() {
					_classCallCheck(this, SecupayDebitService);

					_ProductService.call(this);
				}

				_inherits(SecupayDebitService, _ProductService);

				SecupayDebitService.prototype.getEndpoint = function getEndpoint() {
					return ['payment', 'secupaydebit'];
				};

				SecupayDebitService.prototype.getEventTargets = function getEventTargets() {
					return ['payment.secupaydebit'];
				};

				SecupayDebitService.prototype.cancel = function cancel(id) {
					return this.execute(id, 'cancel');
				};

				return SecupayDebitService;
			})(ProductService);

			_export('SecupayDebitService', SecupayDebitService);

			SecupayDebitService.Uid = ['payment', 'secupaydebit'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3NlY3VwYXktZGViaXQtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7cUJBYWEsbUJBQW1COzs7Ozs7OztvQ0FGeEIsY0FBYzs7O0FBRVQsc0JBQW1CO0FBRXBCLGFBRkMsbUJBQW1CLEdBRWpCOzJCQUZGLG1CQUFtQjs7QUFHOUIsK0JBQU8sQ0FBQTtLQUNQOztjQUpXLG1CQUFtQjs7QUFBbkIsdUJBQW1CLFdBTS9CLFdBQVcsR0FBQSx1QkFBRztBQUNiLFlBQU8sQ0FBQyxTQUFTLEVBQUMsY0FBYyxDQUFDLENBQUM7S0FDbEM7O0FBUlcsdUJBQW1CLFdBVS9CLGVBQWUsR0FBQSwyQkFBRztBQUNqQixZQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztLQUNoQzs7QUFaVyx1QkFBbUIsV0FjL0IsTUFBTSxHQUFBLGdCQUFDLEVBQUUsRUFBRTtBQUNWLFlBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDbEM7O1dBaEJXLG1CQUFtQjtNQUFTLGNBQWM7O2tDQUExQyxtQkFBbUI7O0FBb0JoQyxzQkFBbUIsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFNBQVMsRUFBQyxjQUFjLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3BheW1lbnQvc2VjdXBheS1kZWJpdC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==