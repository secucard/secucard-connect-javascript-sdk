System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, NewsService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			NewsService = (function (_ProductService) {
				function NewsService() {
					_classCallCheck(this, NewsService);

					_ProductService.call(this);
				}

				_inherits(NewsService, _ProductService);

				NewsService.prototype.getEndpoint = function getEndpoint() {
					return ['general', 'news'];
				};

				NewsService.prototype.getEventTargets = function getEventTargets() {
					return [];
				};

				NewsService.prototype.markRead = function markRead(newsId) {
					return this.updateWithAction(newsId, 'markRead');
				};

				return NewsService;
			})(ProductService);

			_export('NewsService', NewsService);

			NewsService.Uid = ['general', 'news'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL25ld3Mtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7cUJBYWEsV0FBVzs7Ozs7Ozs7b0NBRmhCLGNBQWM7OztBQUVULGNBQVc7QUFFWixhQUZDLFdBQVcsR0FFVDsyQkFGRixXQUFXOztBQUd0QiwrQkFBTyxDQUFBO0tBQ1A7O2NBSlcsV0FBVzs7QUFBWCxlQUFXLFdBTXZCLFdBQVcsR0FBQSx1QkFBRztBQUNiLFlBQU8sQ0FBQyxTQUFTLEVBQUMsTUFBTSxDQUFDLENBQUM7S0FDMUI7O0FBUlcsZUFBVyxXQVV2QixlQUFlLEdBQUEsMkJBQUc7QUFDakIsWUFBTyxFQUFFLENBQUM7S0FDVjs7QUFaVyxlQUFXLFdBY3ZCLFFBQVEsR0FBQSxrQkFBQyxNQUFNLEVBQUU7QUFDaEIsWUFBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQ2pEOztXQWhCVyxXQUFXO01BQVMsY0FBYzs7MEJBQWxDLFdBQVc7O0FBb0J4QixjQUFXLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUMsTUFBTSxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL25ld3Mtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=