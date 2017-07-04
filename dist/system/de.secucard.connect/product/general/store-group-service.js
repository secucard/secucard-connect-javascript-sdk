System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, StoreGroupService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            StoreGroupService = (function (_ProductService) {
                function StoreGroupService() {
                    _classCallCheck(this, StoreGroupService);

                    _ProductService.call(this);
                }

                _inherits(StoreGroupService, _ProductService);

                StoreGroupService.prototype.getEndpoint = function getEndpoint() {
                    return ['general', 'storegroups'];
                };

                StoreGroupService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return StoreGroupService;
            })(ProductService);

            _export('StoreGroupService', StoreGroupService);

            StoreGroupService.Uid = ['general', 'storegroups'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL3N0b3JlLWdyb3VwLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLGlCQUFpQjs7Ozs7Ozs7NkNBRnRCLGNBQWM7OztBQUVULDZCQUFpQjtBQUVmLHlCQUZGLGlCQUFpQixHQUVaOzBDQUZMLGlCQUFpQjs7QUFHdEIsOENBQU8sQ0FBQTtpQkFDVjs7MEJBSlEsaUJBQWlCOztBQUFqQixpQ0FBaUIsV0FNMUIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7aUJBQ3JDOztBQVJRLGlDQUFpQixXQVUxQixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxFQUFFLENBQUM7aUJBQ2I7O3VCQVpRLGlCQUFpQjtlQUFTLGNBQWM7O3lDQUF4QyxpQkFBaUI7O0FBZ0I5Qiw2QkFBaUIsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2dlbmVyYWwvc3RvcmUtZ3JvdXAtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=