System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, DeviceService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            DeviceService = (function (_ProductService) {
                _inherits(DeviceService, _ProductService);

                function DeviceService() {
                    _classCallCheck(this, DeviceService);

                    _ProductService.call(this);
                }

                DeviceService.prototype.getEndpoint = function getEndpoint() {
                    return ['smart', 'devices'];
                };

                DeviceService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return DeviceService;
            })(ProductService);

            _export('DeviceService', DeviceService);

            DeviceService.Uid = ['smart', 'devices'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9kZXZpY2Utc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsYUFBYTs7Ozs7Ozs7NkNBRmxCLGNBQWM7OztBQUVULHlCQUFhOzBCQUFiLGFBQWE7O0FBRVgseUJBRkYsYUFBYSxHQUVSOzBDQUZMLGFBQWE7O0FBR2xCLDhDQUFPLENBQUE7aUJBQ1Y7O0FBSlEsNkJBQWEsV0FNdEIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7aUJBQy9COztBQVJRLDZCQUFhLFdBVXRCLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLEVBQUUsQ0FBQztpQkFDYjs7dUJBWlEsYUFBYTtlQUFTLGNBQWM7Ozs7QUFnQmpELHlCQUFhLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9kZXZpY2Utc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=