System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, UploadService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			UploadService = (function (_ProductService) {
				function UploadService() {
					_classCallCheck(this, UploadService);

					_ProductService.call(this);
				}

				_inherits(UploadService, _ProductService);

				UploadService.prototype.getEndpoint = function getEndpoint() {
					return ['document', 'uploads'];
				};

				UploadService.prototype.getEventTargets = function getEventTargets() {
					return [];
				};

				UploadService.prototype.upload = function upload(base64str) {
					return _ProductService.prototype.execute.call(this, null, null, null, base64str);
				};

				return UploadService;
			})(ProductService);

			_export('UploadService', UploadService);

			UploadService.Uid = ['document', 'uploads'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9kb2N1bWVudC91cGxvYWQtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7cUJBRWEsYUFBYTs7Ozs7Ozs7b0NBRmxCLGNBQWM7OztBQUVULGdCQUFhO0FBRWQsYUFGQyxhQUFhLEdBRVg7MkJBRkYsYUFBYTs7QUFHeEIsK0JBQU8sQ0FBQTtLQUNQOztjQUpXLGFBQWE7O0FBQWIsaUJBQWEsV0FNekIsV0FBVyxHQUFBLHVCQUFHO0FBQ2IsWUFBTyxDQUFDLFVBQVUsRUFBQyxTQUFTLENBQUMsQ0FBQztLQUM5Qjs7QUFSVyxpQkFBYSxXQVV6QixlQUFlLEdBQUEsMkJBQUc7QUFDakIsWUFBTyxFQUFFLENBQUM7S0FDVjs7QUFaVyxpQkFBYSxXQWN6QixNQUFNLEdBQUEsZ0JBQUMsU0FBUyxFQUFFO0FBQ2pCLFlBQU8sMEJBQU0sT0FBTyxLQUFBLE9BQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7S0FDbEQ7O1dBaEJXLGFBQWE7TUFBUyxjQUFjOzs0QkFBcEMsYUFBYTs7QUFvQjFCLGdCQUFhLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxVQUFVLEVBQUMsU0FBUyxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9kb2N1bWVudC91cGxvYWQtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=