System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, PublicMerchantService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            PublicMerchantService = (function (_ProductService) {
                _inherits(PublicMerchantService, _ProductService);

                function PublicMerchantService() {
                    _classCallCheck(this, PublicMerchantService);

                    _ProductService.call(this);
                }

                PublicMerchantService.prototype.getEndpoint = function getEndpoint() {
                    return ['general', 'publicmerchants'];
                };

                PublicMerchantService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return PublicMerchantService;
            })(ProductService);

            _export('PublicMerchantService', PublicMerchantService);

            PublicMerchantService.Uid = ['general', 'publicmerchants'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL3B1YmxpYy1tZXJjaGFudC1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt3QkFhYSxxQkFBcUI7Ozs7Ozs7OzZDQUYxQixjQUFjOzs7QUFFVCxpQ0FBcUI7MEJBQXJCLHFCQUFxQjs7QUFFbkIseUJBRkYscUJBQXFCLEdBRWhCOzBDQUZMLHFCQUFxQjs7QUFHMUIsOENBQU8sQ0FBQTtpQkFDVjs7QUFKUSxxQ0FBcUIsV0FNOUIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztpQkFDekM7O0FBUlEscUNBQXFCLFdBVTlCLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLEVBQUUsQ0FBQztpQkFDYjs7dUJBWlEscUJBQXFCO2VBQVMsY0FBYzs7OztBQWdCekQsaUNBQXFCLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2dlbmVyYWwvcHVibGljLW1lcmNoYW50LXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
