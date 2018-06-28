System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, DeviceHistoriesService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            DeviceHistoriesService = (function (_ProductService) {
                _inherits(DeviceHistoriesService, _ProductService);

                function DeviceHistoriesService() {
                    _classCallCheck(this, DeviceHistoriesService);

                    _ProductService.call(this);
                }

                DeviceHistoriesService.prototype.getEndpoint = function getEndpoint() {
                    return ['smart', 'devicehistories'];
                };

                DeviceHistoriesService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return DeviceHistoriesService;
            })(ProductService);

            _export('DeviceHistoriesService', DeviceHistoriesService);

            DeviceHistoriesService.Uid = ['smart', 'devicehistories'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9kZXZpY2UtaGlzdG9yaWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt3QkFFYSxzQkFBc0I7Ozs7Ozs7OzZDQUYzQixjQUFjOzs7QUFFVCxrQ0FBc0I7MEJBQXRCLHNCQUFzQjs7QUFFcEIseUJBRkYsc0JBQXNCLEdBRWpCOzBDQUZMLHNCQUFzQjs7QUFHM0IsOENBQU8sQ0FBQTtpQkFDVjs7QUFKUSxzQ0FBc0IsV0FNL0IsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztpQkFDdkM7O0FBUlEsc0NBQXNCLFdBVS9CLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLEVBQUUsQ0FBQztpQkFDYjs7dUJBWlEsc0JBQXNCO2VBQVMsY0FBYzs7OztBQWdCMUQsa0NBQXNCLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3NtYXJ0L2RldmljZS1oaXN0b3JpZXMuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
