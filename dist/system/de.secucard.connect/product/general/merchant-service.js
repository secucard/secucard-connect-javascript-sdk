System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, MerchantService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            MerchantService = (function (_ProductService) {
                _inherits(MerchantService, _ProductService);

                function MerchantService() {
                    _classCallCheck(this, MerchantService);

                    _ProductService.call(this);
                }

                MerchantService.prototype.getEndpoint = function getEndpoint() {
                    return ['general', 'merchants'];
                };

                MerchantService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                MerchantService.prototype.retrieveShowSecucardInvoice = function retrieveShowSecucardInvoice(merchantId) {
                    return this.retrieveWithAction(merchantId, 'showSecucardInvoice');
                };

                return MerchantService;
            })(ProductService);

            _export('MerchantService', MerchantService);

            MerchantService.Uid = ['general', 'merchants'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL21lcmNoYW50LXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLGVBQWU7Ozs7Ozs7OzZDQUZwQixjQUFjOzs7QUFFVCwyQkFBZTswQkFBZixlQUFlOztBQUViLHlCQUZGLGVBQWUsR0FFVjswQ0FGTCxlQUFlOztBQUdwQiw4Q0FBTyxDQUFBO2lCQUNWOztBQUpRLCtCQUFlLFdBTXhCLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2lCQUNuQzs7QUFSUSwrQkFBZSxXQVV4QixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxFQUFFLENBQUM7aUJBQ2I7O0FBWlEsK0JBQWUsV0FjeEIsMkJBQTJCLEdBQUEscUNBQUMsVUFBVSxFQUFFO0FBQ3BDLDJCQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUscUJBQXFCLENBQUMsQ0FBQztpQkFDckU7O3VCQWhCUSxlQUFlO2VBQVMsY0FBYzs7OztBQW1CbkQsMkJBQWUsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2dlbmVyYWwvbWVyY2hhbnQtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
