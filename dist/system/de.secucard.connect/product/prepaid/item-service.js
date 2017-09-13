System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, ItemService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            ItemService = (function (_ProductService) {
                function ItemService() {
                    _classCallCheck(this, ItemService);

                    _ProductService.call(this);
                }

                _inherits(ItemService, _ProductService);

                ItemService.prototype.getEndpoint = function getEndpoint() {
                    return ['prepaid', 'items'];
                };

                ItemService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return ItemService;
            })(ProductService);

            _export('ItemService', ItemService);

            ItemService.Uid = ['prepaid', 'items'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wcmVwYWlkL2l0ZW0tc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsV0FBVzs7Ozs7Ozs7NkNBRmhCLGNBQWM7OztBQUVULHVCQUFXO0FBRVQseUJBRkYsV0FBVyxHQUVOOzBDQUZMLFdBQVc7O0FBR2hCLDhDQUFPLENBQUE7aUJBQ1Y7OzBCQUpRLFdBQVc7O0FBQVgsMkJBQVcsV0FNcEIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQy9COztBQVJRLDJCQUFXLFdBVXBCLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLEVBQUUsQ0FBQztpQkFDYjs7dUJBWlEsV0FBVztlQUFTLGNBQWM7O21DQUFsQyxXQUFXOztBQWV4Qix1QkFBVyxDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvcHJlcGFpZC9pdGVtLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9