System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, FileAccessService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			FileAccessService = (function (_ProductService) {
				function FileAccessService() {
					_classCallCheck(this, FileAccessService);

					_ProductService.call(this);
				}

				_inherits(FileAccessService, _ProductService);

				FileAccessService.prototype.getEndpoint = function getEndpoint() {
					return ['general', 'fileaccesses'];
				};

				FileAccessService.prototype.getEventTargets = function getEventTargets() {
					return [];
				};

				return FileAccessService;
			})(ProductService);

			_export('FileAccessService', FileAccessService);

			FileAccessService.Uid = ['general', 'fileaccesses'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL2ZpbGUtYWNjZXNzLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3FCQUVhLGlCQUFpQjs7Ozs7Ozs7b0NBRnRCLGNBQWM7OztBQUVULG9CQUFpQjtBQUVsQixhQUZDLGlCQUFpQixHQUVmOzJCQUZGLGlCQUFpQjs7QUFHNUIsK0JBQU8sQ0FBQTtLQUNQOztjQUpXLGlCQUFpQjs7QUFBakIscUJBQWlCLFdBTTdCLFdBQVcsR0FBQSx1QkFBRztBQUNiLFlBQU8sQ0FBQyxTQUFTLEVBQUMsY0FBYyxDQUFDLENBQUM7S0FDbEM7O0FBUlcscUJBQWlCLFdBVTdCLGVBQWUsR0FBQSwyQkFBRztBQUNqQixZQUFPLEVBQUUsQ0FBQztLQUNWOztXQVpXLGlCQUFpQjtNQUFTLGNBQWM7O2dDQUF4QyxpQkFBaUI7O0FBZ0I5QixvQkFBaUIsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFNBQVMsRUFBQyxjQUFjLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2dlbmVyYWwvZmlsZS1hY2Nlc3Mtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=