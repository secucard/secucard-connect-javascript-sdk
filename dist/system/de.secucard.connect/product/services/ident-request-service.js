System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, IdentRequestService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			IdentRequestService = (function (_ProductService) {
				function IdentRequestService() {
					_classCallCheck(this, IdentRequestService);

					_ProductService.call(this);
				}

				_inherits(IdentRequestService, _ProductService);

				IdentRequestService.prototype.getEndpoint = function getEndpoint() {
					return ['services', 'identrequests'];
				};

				IdentRequestService.prototype.getEventTargets = function getEventTargets() {
					return [];
				};

				return IdentRequestService;
			})(ProductService);

			_export('IdentRequestService', IdentRequestService);

			IdentRequestService.Uid = ['services', 'identrequests'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zZXJ2aWNlcy9pZGVudC1yZXF1ZXN0LXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3FCQWFhLG1CQUFtQjs7Ozs7Ozs7b0NBRnhCLGNBQWM7OztBQUVULHNCQUFtQjtBQUVwQixhQUZDLG1CQUFtQixHQUVqQjsyQkFGRixtQkFBbUI7O0FBRzlCLCtCQUFPLENBQUE7S0FDUDs7Y0FKVyxtQkFBbUI7O0FBQW5CLHVCQUFtQixXQU0vQixXQUFXLEdBQUEsdUJBQUc7QUFDYixZQUFPLENBQUMsVUFBVSxFQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQ3BDOztBQVJXLHVCQUFtQixXQVUvQixlQUFlLEdBQUEsMkJBQUc7QUFDakIsWUFBTyxFQUFFLENBQUM7S0FDVjs7V0FaVyxtQkFBbUI7TUFBUyxjQUFjOztrQ0FBMUMsbUJBQW1COztBQWdCaEMsc0JBQW1CLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxVQUFVLEVBQUMsZUFBZSxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zZXJ2aWNlcy9pZGVudC1yZXF1ZXN0LXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9