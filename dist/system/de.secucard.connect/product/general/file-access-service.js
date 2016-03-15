System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, FileAccessService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            FileAccessService = (function (_ProductService) {
                _inherits(FileAccessService, _ProductService);

                function FileAccessService() {
                    _classCallCheck(this, FileAccessService);

                    _ProductService.call(this);
                }

                FileAccessService.prototype.getEndpoint = function getEndpoint() {
                    return ['general', 'fileaccesses'];
                };

                FileAccessService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return FileAccessService;
            })(ProductService);

            _export('FileAccessService', FileAccessService);

            FileAccessService.Uid = ['general', 'fileaccesses'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL2ZpbGUtYWNjZXNzLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLGlCQUFpQjs7Ozs7Ozs7NkNBRnRCLGNBQWM7OztBQUVULDZCQUFpQjswQkFBakIsaUJBQWlCOztBQUVmLHlCQUZGLGlCQUFpQixHQUVaOzBDQUZMLGlCQUFpQjs7QUFHdEIsOENBQU8sQ0FBQTtpQkFDVjs7QUFKUSxpQ0FBaUIsV0FNMUIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7aUJBQ3RDOztBQVJRLGlDQUFpQixXQVUxQixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxFQUFFLENBQUM7aUJBQ2I7O3VCQVpRLGlCQUFpQjtlQUFTLGNBQWM7Ozs7QUFnQnJELDZCQUFpQixDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvZ2VuZXJhbC9maWxlLWFjY2Vzcy1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==