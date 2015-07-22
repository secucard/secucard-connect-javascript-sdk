System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, PublicMerchantService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			PublicMerchantService = (function (_ProductService) {
				function PublicMerchantService() {
					_classCallCheck(this, PublicMerchantService);

					_ProductService.call(this);
				}

				_inherits(PublicMerchantService, _ProductService);

				PublicMerchantService.prototype.getEndpoint = function getEndpoint() {
					return ['general', 'publicmerchants'];
				};

				PublicMerchantService.prototype.getEventTargets = function getEventTargets() {
					return [];
				};

				return PublicMerchantService;
			})(ProductService);

			_export('PublicMerchantService', PublicMerchantService);

			PublicMerchantService.Uid = ['general', 'publicmerchants'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL3B1YmxpYy1tZXJjaGFudC1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztxQkFFYSxxQkFBcUI7Ozs7Ozs7O29DQUYxQixjQUFjOzs7QUFFVCx3QkFBcUI7QUFFdEIsYUFGQyxxQkFBcUIsR0FFbkI7MkJBRkYscUJBQXFCOztBQUdoQywrQkFBTyxDQUFBO0tBQ1A7O2NBSlcscUJBQXFCOztBQUFyQix5QkFBcUIsV0FNakMsV0FBVyxHQUFBLHVCQUFHO0FBQ2IsWUFBTyxDQUFDLFNBQVMsRUFBQyxpQkFBaUIsQ0FBQyxDQUFDO0tBQ3JDOztBQVJXLHlCQUFxQixXQVVqQyxlQUFlLEdBQUEsMkJBQUc7QUFDakIsWUFBTyxFQUFFLENBQUM7S0FDVjs7V0FaVyxxQkFBcUI7TUFBUyxjQUFjOztvQ0FBNUMscUJBQXFCOztBQWdCbEMsd0JBQXFCLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUMsaUJBQWlCLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2dlbmVyYWwvcHVibGljLW1lcmNoYW50LXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9