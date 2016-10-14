System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, ActionSmsConfigService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            ActionSmsConfigService = (function (_ProductService) {
                function ActionSmsConfigService() {
                    _classCallCheck(this, ActionSmsConfigService);

                    _ProductService.call(this);
                }

                _inherits(ActionSmsConfigService, _ProductService);

                ActionSmsConfigService.prototype.getEndpoint = function getEndpoint() {
                    return ['loyalty', 'actionsmsconfigs'];
                };

                ActionSmsConfigService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return ActionSmsConfigService;
            })(ProductService);

            _export('ActionSmsConfigService', ActionSmsConfigService);

            ActionSmsConfigService.Uid = ['loyalty', 'actionsmsconfigs'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2FjdGlvbi1zbXMtY29uZmlnLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLHNCQUFzQjs7Ozs7Ozs7NkNBRjNCLGNBQWM7OztBQUVULGtDQUFzQjtBQUVwQix5QkFGRixzQkFBc0IsR0FFakI7MENBRkwsc0JBQXNCOztBQUczQiw4Q0FBTyxDQUFBO2lCQUNWOzswQkFKUSxzQkFBc0I7O0FBQXRCLHNDQUFzQixXQU0vQixXQUFXLEdBQUEsdUJBQUc7QUFDViwyQkFBTyxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO2lCQUMxQzs7QUFSUSxzQ0FBc0IsV0FVL0IsZUFBZSxHQUFBLDJCQUFHO0FBQ2QsMkJBQU8sRUFBRSxDQUFDO2lCQUNiOzt1QkFaUSxzQkFBc0I7ZUFBUyxjQUFjOzs4Q0FBN0Msc0JBQXNCOztBQWdCbkMsa0NBQXNCLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2xveWFsdHkvYWN0aW9uLXNtcy1jb25maWctc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=