System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, ItemGroupService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            ItemGroupService = (function (_ProductService) {
                function ItemGroupService() {
                    _classCallCheck(this, ItemGroupService);

                    _ProductService.call(this);
                }

                _inherits(ItemGroupService, _ProductService);

                ItemGroupService.prototype.getEndpoint = function getEndpoint() {
                    return ['prepaid', 'itemgroups'];
                };

                ItemGroupService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return ItemGroupService;
            })(ProductService);

            _export('ItemGroupService', ItemGroupService);

            ItemGroupService.Uid = ['prepaid', 'itemgroups'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wcmVwYWlkL2l0ZW0tZ3JvdXAtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsZ0JBQWdCOzs7Ozs7Ozs2Q0FGckIsY0FBYzs7O0FBRVQsNEJBQWdCO0FBRWQseUJBRkYsZ0JBQWdCLEdBRVg7MENBRkwsZ0JBQWdCOztBQUdyQiw4Q0FBTyxDQUFBO2lCQUNWOzswQkFKUSxnQkFBZ0I7O0FBQWhCLGdDQUFnQixXQU16QixXQUFXLEdBQUEsdUJBQUc7QUFDViwyQkFBTyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztpQkFDcEM7O0FBUlEsZ0NBQWdCLFdBVXpCLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLEVBQUUsQ0FBQztpQkFDYjs7dUJBWlEsZ0JBQWdCO2VBQVMsY0FBYzs7d0NBQXZDLGdCQUFnQjs7QUFnQjdCLDRCQUFnQixDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvcHJlcGFpZC9pdGVtLWdyb3VwLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9