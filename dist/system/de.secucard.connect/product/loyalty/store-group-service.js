System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, StoreGroupService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            StoreGroupService = (function (_ProductService) {
                _inherits(StoreGroupService, _ProductService);

                function StoreGroupService() {
                    _classCallCheck(this, StoreGroupService);

                    _ProductService.call(this);
                }

                StoreGroupService.prototype.getEndpoint = function getEndpoint() {
                    return ['loyalty', 'storegroups'];
                };

                StoreGroupService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return StoreGroupService;
            })(ProductService);

            _export('StoreGroupService', StoreGroupService);

            StoreGroupService.Uid = ['loyalty', 'storegroups'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L3N0b3JlLWdyb3VwLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLGlCQUFpQjs7Ozs7Ozs7NkNBRnRCLGNBQWM7OztBQUVULDZCQUFpQjswQkFBakIsaUJBQWlCOztBQUVmLHlCQUZGLGlCQUFpQixHQUVaOzBDQUZMLGlCQUFpQjs7QUFHdEIsOENBQU8sQ0FBQTtpQkFDVjs7QUFKUSxpQ0FBaUIsV0FNMUIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7aUJBQ3JDOztBQVJRLGlDQUFpQixXQVUxQixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxFQUFFLENBQUM7aUJBQ2I7O3VCQVpRLGlCQUFpQjtlQUFTLGNBQWM7Ozs7QUFnQnJELDZCQUFpQixDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvbG95YWx0eS9zdG9yZS1ncm91cC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==