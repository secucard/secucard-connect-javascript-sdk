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
                    return ['cardprocessing', 'invoices'];
                };

                InvoiceService.prototype.getEventTargets = function getEventTargets() {
                    return ['cardprocessing.invoices'];
                };

                return InvoiceService;
            })(ProductService);

            _export('InvoiceService', InvoiceService);

            InvoiceService.Uid = ['cardprocessing', 'invoices'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9jYXJkcHJvY2Vzc2luZy9pbnZvaWNlLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLGNBQWM7Ozs7Ozs7OzZDQUZuQixjQUFjOzs7QUFFVCwwQkFBYzswQkFBZCxjQUFjOztBQUVaLHlCQUZGLGNBQWMsR0FFVDswQ0FGTCxjQUFjOztBQUduQiw4Q0FBTyxDQUFBO2lCQUNWOztBQUpRLDhCQUFjLFdBTXZCLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQ3pDOztBQVJRLDhCQUFjLFdBVXZCLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztpQkFDdEM7O3VCQVpRLGNBQWM7ZUFBUyxjQUFjOzs7O0FBaUJsRCwwQkFBYyxDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9jYXJkcHJvY2Vzc2luZy9pbnZvaWNlLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
