System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, CardGroupService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			CardGroupService = (function (_ProductService) {
				function CardGroupService() {
					_classCallCheck(this, CardGroupService);

					_ProductService.call(this);
				}

				_inherits(CardGroupService, _ProductService);

				CardGroupService.prototype.getEndpoint = function getEndpoint() {
					return ['loyalty', 'cardgroups'];
				};

				CardGroupService.prototype.getEventTargets = function getEventTargets() {
					return [];
				};

				return CardGroupService;
			})(ProductService);

			_export('CardGroupService', CardGroupService);

			CardGroupService.Uid = ['loyalty', 'cardgroups'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2NhcmQtZ3JvdXAtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7cUJBYWEsZ0JBQWdCOzs7Ozs7OztvQ0FGckIsY0FBYzs7O0FBRVQsbUJBQWdCO0FBRWpCLGFBRkMsZ0JBQWdCLEdBRWQ7MkJBRkYsZ0JBQWdCOztBQUczQiwrQkFBTyxDQUFBO0tBQ1A7O2NBSlcsZ0JBQWdCOztBQUFoQixvQkFBZ0IsV0FNNUIsV0FBVyxHQUFBLHVCQUFHO0FBQ2IsWUFBTyxDQUFDLFNBQVMsRUFBQyxZQUFZLENBQUMsQ0FBQztLQUNoQzs7QUFSVyxvQkFBZ0IsV0FVNUIsZUFBZSxHQUFBLDJCQUFHO0FBQ2pCLFlBQU8sRUFBRSxDQUFDO0tBQ1Y7O1dBWlcsZ0JBQWdCO01BQVMsY0FBYzs7K0JBQXZDLGdCQUFnQjs7QUFnQjdCLG1CQUFnQixDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsU0FBUyxFQUFDLFlBQVksQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvbG95YWx0eS9jYXJkLWdyb3VwLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9