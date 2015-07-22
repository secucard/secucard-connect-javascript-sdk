System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, CardService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			CardService = (function (_ProductService) {
				function CardService() {
					_classCallCheck(this, CardService);

					_ProductService.call(this);
				}

				_inherits(CardService, _ProductService);

				CardService.prototype.getEndpoint = function getEndpoint() {
					return ['loyalty', 'cards'];
				};

				CardService.prototype.getEventTargets = function getEventTargets() {
					return [];
				};

				CardService.prototype.assignUser = function assignUser(cardNumber, pin) {
					return this.execute(cardNumber, 'assignUser', 'me', pin);
				};

				CardService.prototype.removeUser = function removeUser(cardNumber) {
					return this.removeWithAction(cardNumber, 'assignUser', 'me');
				};

				return CardService;
			})(ProductService);

			_export('CardService', CardService);

			CardService.Uid = ['loyalty', 'cards'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2NhcmQtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7cUJBRWEsV0FBVzs7Ozs7Ozs7b0NBRmhCLGNBQWM7OztBQUVULGNBQVc7QUFFWixhQUZDLFdBQVcsR0FFVDsyQkFGRixXQUFXOztBQUd0QiwrQkFBTyxDQUFBO0tBQ1A7O2NBSlcsV0FBVzs7QUFBWCxlQUFXLFdBTXZCLFdBQVcsR0FBQSx1QkFBRztBQUNiLFlBQU8sQ0FBQyxTQUFTLEVBQUMsT0FBTyxDQUFDLENBQUM7S0FDM0I7O0FBUlcsZUFBVyxXQVV2QixlQUFlLEdBQUEsMkJBQUc7QUFDakIsWUFBTyxFQUFFLENBQUM7S0FDVjs7QUFaVyxlQUFXLFdBY3ZCLFVBQVUsR0FBQSxvQkFBQyxVQUFVLEVBQUUsR0FBRyxFQUFFO0FBQzNCLFlBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztLQUN6RDs7QUFoQlcsZUFBVyxXQWtCdkIsVUFBVSxHQUFBLG9CQUFDLFVBQVUsRUFBRTtBQUN0QixZQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzdEOztXQXBCVyxXQUFXO01BQVMsY0FBYzs7MEJBQWxDLFdBQVc7O0FBd0J4QixjQUFXLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUMsT0FBTyxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2NhcmQtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=