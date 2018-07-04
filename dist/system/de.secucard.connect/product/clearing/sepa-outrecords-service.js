System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, SepaOutrecordsService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            SepaOutrecordsService = (function (_ProductService) {
                _inherits(SepaOutrecordsService, _ProductService);

                function SepaOutrecordsService() {
                    _classCallCheck(this, SepaOutrecordsService);

                    _ProductService.call(this);
                }

                SepaOutrecordsService.prototype.getEndpoint = function getEndpoint() {
                    return ['clearing', 'sepaoutrecords'];
                };

                SepaOutrecordsService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return SepaOutrecordsService;
            })(ProductService);

            _export('SepaOutrecordsService', SepaOutrecordsService);

            SepaOutrecordsService.Uid = ['clearing', 'sepaoutrecords'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9jbGVhcmluZy9zZXBhLW91dHJlY29yZHMtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEscUJBQXFCOzs7Ozs7Ozs2Q0FGMUIsY0FBYzs7O0FBRVQsaUNBQXFCOzBCQUFyQixxQkFBcUI7O0FBRW5CLHlCQUZGLHFCQUFxQixHQUVoQjswQ0FGTCxxQkFBcUI7O0FBRzFCLDhDQUFPLENBQUE7aUJBQ1Y7O0FBSlEscUNBQXFCLFdBTTlCLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsVUFBVSxFQUFFLGdCQUFnQixDQUFDLENBQUM7aUJBQ3pDOztBQVJRLHFDQUFxQixXQVU5QixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxFQUFFLENBQUM7aUJBQ2I7O3VCQVpRLHFCQUFxQjtlQUFTLGNBQWM7Ozs7QUFnQnpELGlDQUFxQixDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsVUFBVSxFQUFFLGdCQUFnQixDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9jbGVhcmluZy9zZXBhLW91dHJlY29yZHMtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
