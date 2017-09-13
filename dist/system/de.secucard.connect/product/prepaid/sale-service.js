System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, SaleService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            SaleService = (function (_ProductService) {
                function SaleService() {
                    _classCallCheck(this, SaleService);

                    _ProductService.call(this);
                }

                _inherits(SaleService, _ProductService);

                SaleService.prototype.getEndpoint = function getEndpoint() {
                    return ['prepaid', 'sales'];
                };

                SaleService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                SaleService.prototype.cancel = function cancel(saleId) {
                    return this.execute(saleId, 'cancel');
                };

                return SaleService;
            })(ProductService);

            _export('SaleService', SaleService);

            SaleService.Uid = ['prepaid', 'sales'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wcmVwYWlkL3NhbGUtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsV0FBVzs7Ozs7Ozs7NkNBRmhCLGNBQWM7OztBQUVULHVCQUFXO0FBRVQseUJBRkYsV0FBVyxHQUVOOzBDQUZMLFdBQVc7O0FBR2hCLDhDQUFPLENBQUE7aUJBQ1Y7OzBCQUpRLFdBQVc7O0FBQVgsMkJBQVcsV0FNcEIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQy9COztBQVJRLDJCQUFXLFdBVXBCLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLEVBQUUsQ0FBQztpQkFDYjs7QUFaUSwyQkFBVyxXQWNwQixNQUFNLEdBQUEsZ0JBQUMsTUFBTSxFQUFFO0FBQ1gsMkJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7aUJBQ3pDOzt1QkFoQlEsV0FBVztlQUFTLGNBQWM7O21DQUFsQyxXQUFXOztBQW1CeEIsdUJBQVcsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3ByZXBhaWQvc2FsZS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==