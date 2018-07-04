System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, ClearingSepainbatchsService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            ClearingSepainbatchsService = (function (_ProductService) {
                _inherits(ClearingSepainbatchsService, _ProductService);

                function ClearingSepainbatchsService() {
                    _classCallCheck(this, ClearingSepainbatchsService);

                    _ProductService.call(this);
                }

                ClearingSepainbatchsService.prototype.getEndpoint = function getEndpoint() {
                    return ['clearing', 'sepainbatchs'];
                };

                ClearingSepainbatchsService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return ClearingSepainbatchsService;
            })(ProductService);

            _export('ClearingSepainbatchsService', ClearingSepainbatchsService);

            ClearingSepainbatchsService.Uid = ['clearing', 'sepainbatchs'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9jbGVhcmluZy9jbGVhcmluZy1zZXBhLWluYmF0Y2hzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt3QkFhYSwyQkFBMkI7Ozs7Ozs7OzZDQUZoQyxjQUFjOzs7QUFFVCx1Q0FBMkI7MEJBQTNCLDJCQUEyQjs7QUFFekIseUJBRkYsMkJBQTJCLEdBRXRCOzBDQUZMLDJCQUEyQjs7QUFHaEMsOENBQU8sQ0FBQTtpQkFDVjs7QUFKUSwyQ0FBMkIsV0FNcEMsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7aUJBQ3ZDOztBQVJRLDJDQUEyQixXQVVwQyxlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxFQUFFLENBQUM7aUJBQ2I7O3VCQVpRLDJCQUEyQjtlQUFTLGNBQWM7Ozs7QUFnQi9ELHVDQUEyQixDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvY2xlYXJpbmcvY2xlYXJpbmctc2VwYS1pbmJhdGNocy5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
