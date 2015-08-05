System.register(['../product-service', '../../util/mixins'], function (_export) {
	'use strict';

	var ProductService, mixins, AppService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}, function (_utilMixins) {
			mixins = _utilMixins['default'];
		}],
		execute: function () {
			AppService = (function (_ProductService) {
				function AppService() {
					_classCallCheck(this, AppService);

					_ProductService.call(this);
					this.isApp = true;
					this.init();
				}

				_inherits(AppService, _ProductService);

				AppService.prototype.init = function init() {};

				AppService.prototype.getEndpoint = function getEndpoint() {
					return ['general', 'apps'];
				};

				AppService.prototype.getEventTargets = function getEventTargets() {
					return [];
				};

				AppService.prototype.getUid = function getUid() {
					return _ProductService.prototype.getUid.call(this) + '.' + this.getAppId();
				};

				return AppService;
			})(ProductService);

			_export('AppService', AppService);

			AppService.createWithMixin = function (ServiceMixin) {

				var Mixed = mixins(AppService, ServiceMixin);
				return new Mixed();
			};
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9hcHAvYXBwLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzZCQWFhLFVBQVU7Ozs7Ozs7O29DQUZmLGNBQWM7Ozs7O0FBRVQsYUFBVTtBQUlYLGFBSkMsVUFBVSxHQUlSOzJCQUpGLFVBQVU7O0FBS3JCLCtCQUFPLENBQUM7VUFIVCxLQUFLLEdBQUcsSUFBSTtBQUlYLFNBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNaOztjQVBXLFVBQVU7O0FBQVYsY0FBVSxXQVN0QixJQUFJLEdBQUEsZ0JBQUcsRUFFTjs7QUFYVyxjQUFVLFdBYXRCLFdBQVcsR0FBQSx1QkFBRztBQUNiLFlBQU8sQ0FBQyxTQUFTLEVBQUMsTUFBTSxDQUFDLENBQUM7S0FDMUI7O0FBZlcsY0FBVSxXQWlCdEIsZUFBZSxHQUFBLDJCQUFHO0FBQ2pCLFlBQU8sRUFBRSxDQUFDO0tBQ1Y7O0FBbkJXLGNBQVUsV0FxQnRCLE1BQU0sR0FBQSxrQkFBRztBQUNSLFlBQU8sMEJBQU0sTUFBTSxLQUFBLE1BQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzlDOztXQXZCVyxVQUFVO01BQVMsY0FBYzs7eUJBQWpDLFVBQVU7O0FBMkJ2QixhQUFVLENBQUMsZUFBZSxHQUFHLFVBQUMsWUFBWSxFQUFLOztBQUU5QyxRQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQzdDLFdBQU8sSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUVuQixDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9hcHAvYXBwLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9