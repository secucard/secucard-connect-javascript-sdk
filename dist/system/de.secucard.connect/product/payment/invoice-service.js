System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, InvoiceService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            InvoiceService = (function (_ProductService) {
                _inherits(InvoiceService, _ProductService);

                function InvoiceService() {
                    _classCallCheck(this, InvoiceService);

                    _ProductService.call(this);
                }

                InvoiceService.prototype.getEndpoint = function getEndpoint() {
                    return ['payment', 'invoices'];
                };

                InvoiceService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return InvoiceService;
            })(ProductService);

            _export('InvoiceService', InvoiceService);

            InvoiceService.Uid = ['payment', 'invoices'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L2ludm9pY2Utc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBWWEsY0FBYzs7Ozs7Ozs7NkNBRG5CLGNBQWM7OztBQUNULDBCQUFjOzBCQUFkLGNBQWM7O0FBQ1oseUJBREYsY0FBYyxHQUNUOzBDQURMLGNBQWM7O0FBRW5CLDhDQUFPLENBQUE7aUJBQ1Y7O0FBSFEsOEJBQWMsV0FJdkIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQ2xDOztBQU5RLDhCQUFjLFdBT3ZCLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLEVBQUUsQ0FBQztpQkFDYjs7dUJBVFEsY0FBYztlQUFTLGNBQWM7Ozs7QUFXbEQsMEJBQWMsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3BheW1lbnQvaW52b2ljZS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
