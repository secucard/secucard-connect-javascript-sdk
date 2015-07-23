System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, CheckinService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			CheckinService = (function (_ProductService) {
				function CheckinService() {
					_classCallCheck(this, CheckinService);

					_ProductService.call(this);
				}

				_inherits(CheckinService, _ProductService);

				CheckinService.prototype.getEndpoint = function getEndpoint() {
					return ['smart', 'checkins'];
				};

				CheckinService.prototype.getEventTargets = function getEventTargets() {
					return ['smart.checkins'];
				};

				return CheckinService;
			})(ProductService);

			_export('CheckinService', CheckinService);

			CheckinService.Uid = ['smart', 'checkins'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9jaGVja2luLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3FCQUVhLGNBQWM7Ozs7Ozs7O29DQUZuQixjQUFjOzs7QUFFVCxpQkFBYztBQUVmLGFBRkMsY0FBYyxHQUVaOzJCQUZGLGNBQWM7O0FBR3pCLCtCQUFPLENBQUE7S0FDUDs7Y0FKVyxjQUFjOztBQUFkLGtCQUFjLFdBTTFCLFdBQVcsR0FBQSx1QkFBRztBQUNiLFlBQU8sQ0FBQyxPQUFPLEVBQUMsVUFBVSxDQUFDLENBQUM7S0FDNUI7O0FBUlcsa0JBQWMsV0FVMUIsZUFBZSxHQUFBLDJCQUFHO0FBQ2pCLFlBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0tBQzFCOztXQVpXLGNBQWM7TUFBUyxjQUFjOzs2QkFBckMsY0FBYzs7QUFpQjNCLGlCQUFjLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxPQUFPLEVBQUMsVUFBVSxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9jaGVja2luLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9