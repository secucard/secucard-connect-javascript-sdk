System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, SkeletonService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			SkeletonService = (function (_ProductService) {
				function SkeletonService() {
					_classCallCheck(this, SkeletonService);

					_ProductService.call(this);
				}

				_inherits(SkeletonService, _ProductService);

				SkeletonService.prototype.getEndpoint = function getEndpoint() {
					return ['general', 'skeletons'];
				};

				SkeletonService.prototype.getEventTargets = function getEventTargets() {
					return ['general.skeletons'];
				};

				SkeletonService.prototype.demoEvent = function demoEvent() {
					return this.execute(1, 'demoevent');
				};

				return SkeletonService;
			})(ProductService);

			_export('SkeletonService', SkeletonService);

			SkeletonService.Uid = ['general', 'skeletons'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL3NrZWxldG9uLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3FCQWFhLGVBQWU7Ozs7Ozs7O29DQUZwQixjQUFjOzs7QUFFVCxrQkFBZTtBQUVoQixhQUZDLGVBQWUsR0FFYjsyQkFGRixlQUFlOztBQUcxQiwrQkFBTyxDQUFBO0tBQ1A7O2NBSlcsZUFBZTs7QUFBZixtQkFBZSxXQU0zQixXQUFXLEdBQUEsdUJBQUc7QUFDYixZQUFPLENBQUMsU0FBUyxFQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQy9COztBQVJXLG1CQUFlLFdBVTNCLGVBQWUsR0FBQSwyQkFBRztBQUNqQixZQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztLQUM3Qjs7QUFaVyxtQkFBZSxXQWMzQixTQUFTLEdBQUEscUJBQUc7QUFHWCxZQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0tBRXBDOztXQW5CVyxlQUFlO01BQVMsY0FBYzs7OEJBQXRDLGVBQWU7O0FBdUI1QixrQkFBZSxDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsU0FBUyxFQUFDLFdBQVcsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvZ2VuZXJhbC9za2VsZXRvbi1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==