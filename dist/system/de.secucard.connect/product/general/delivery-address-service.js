System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, DeliveryAddressService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            DeliveryAddressService = (function (_ProductService) {
                function DeliveryAddressService() {
                    _classCallCheck(this, DeliveryAddressService);

                    _ProductService.call(this);
                }

                _inherits(DeliveryAddressService, _ProductService);

                DeliveryAddressService.prototype.getEndpoint = function getEndpoint() {
                    return ['general', 'deliveryaddresses'];
                };

                DeliveryAddressService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return DeliveryAddressService;
            })(ProductService);

            _export('DeliveryAddressService', DeliveryAddressService);

            DeliveryAddressService.Uid = ['general', 'deliveryaddresses'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL2RlbGl2ZXJ5LWFkZHJlc3Mtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsc0JBQXNCOzs7Ozs7Ozs2Q0FGM0IsY0FBYzs7O0FBRVQsa0NBQXNCO0FBRXBCLHlCQUZGLHNCQUFzQixHQUVqQjswQ0FGTCxzQkFBc0I7O0FBRzNCLDhDQUFPLENBQUE7aUJBQ1Y7OzBCQUpRLHNCQUFzQjs7QUFBdEIsc0NBQXNCLFdBTS9CLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsU0FBUyxFQUFFLG1CQUFtQixDQUFDLENBQUM7aUJBQzNDOztBQVJRLHNDQUFzQixXQVUvQixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxFQUFFLENBQUM7aUJBQ2I7O3VCQVpRLHNCQUFzQjtlQUFTLGNBQWM7OzhDQUE3QyxzQkFBc0I7O0FBZ0JuQyxrQ0FBc0IsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFNBQVMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvZ2VuZXJhbC9kZWxpdmVyeS1hZGRyZXNzLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9