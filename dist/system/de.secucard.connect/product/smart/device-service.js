System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, DeviceService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            DeviceService = (function (_ProductService) {
                function DeviceService() {
                    _classCallCheck(this, DeviceService);

                    _ProductService.call(this);
                }

                _inherits(DeviceService, _ProductService);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9kZXZpY2Utc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsYUFBYTs7Ozs7Ozs7NkNBRmxCLGNBQWM7OztBQUVULHlCQUFhO0FBRVgseUJBRkYsYUFBYSxHQUVSOzBDQUZMLGFBQWE7O0FBR2xCLDhDQUFPLENBQUE7aUJBQ1Y7OzBCQUpRLGFBQWE7O0FBQWIsNkJBQWEsV0FNdEIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7aUJBQy9COztBQVJRLDZCQUFhLFdBVXRCLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLEVBQUUsQ0FBQztpQkFDYjs7dUJBWlEsYUFBYTtlQUFTLGNBQWM7O3FDQUFwQyxhQUFhOztBQWdCMUIseUJBQWEsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3NtYXJ0L2RldmljZS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==