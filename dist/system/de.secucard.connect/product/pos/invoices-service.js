System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, InvoicesService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            InvoicesService = (function (_ProductService) {
                _inherits(InvoicesService, _ProductService);

                function InvoicesService() {
                    _classCallCheck(this, InvoicesService);

                    _ProductService.call(this);
                }

                InvoicesService.prototype.getEndpoint = function getEndpoint() {
                    return ['pos', 'invoices'];
                };

                InvoicesService.prototype.getEventTargets = function getEventTargets() {
                    return ['pos.invoices'];
                };

                return InvoicesService;
            })(ProductService);

            _export('InvoicesService', InvoicesService);

            InvoicesService.Uid = ['pos', 'invoices'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wb3MvaW52b2ljZXMtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsZUFBZTs7Ozs7Ozs7NkNBRnBCLGNBQWM7OztBQUVULDJCQUFlOzBCQUFmLGVBQWU7O0FBRWIseUJBRkYsZUFBZSxHQUVWOzBDQUZMLGVBQWU7O0FBR3BCLDhDQUFPLENBQUE7aUJBQ1Y7O0FBSlEsK0JBQWUsV0FNeEIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQzlCOztBQVJRLCtCQUFlLFdBVXhCLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7aUJBQzNCOzt1QkFaUSxlQUFlO2VBQVMsY0FBYzs7OztBQWlCbkQsMkJBQWUsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3Bvcy9pbnZvaWNlcy1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
