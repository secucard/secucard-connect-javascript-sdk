System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, SepaInbatchsService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            SepaInbatchsService = (function (_ProductService) {
                _inherits(SepaInbatchsService, _ProductService);

                function SepaInbatchsService() {
                    _classCallCheck(this, SepaInbatchsService);

                    _ProductService.call(this);
                }

                SepaInbatchsService.prototype.getEndpoint = function getEndpoint() {
                    return ['clearing', 'sepainbatchs'];
                };

                SepaInbatchsService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return SepaInbatchsService;
            })(ProductService);

            _export('SepaInbatchsService', SepaInbatchsService);

            SepaInbatchsService.Uid = ['clearing', 'sepainbatchs'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9jbGVhcmluZy9zZXBhLWluYmF0Y2hzLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLG1CQUFtQjs7Ozs7Ozs7NkNBRnhCLGNBQWM7OztBQUVULCtCQUFtQjswQkFBbkIsbUJBQW1COztBQUVqQix5QkFGRixtQkFBbUIsR0FFZDswQ0FGTCxtQkFBbUI7O0FBR3hCLDhDQUFPLENBQUE7aUJBQ1Y7O0FBSlEsbUNBQW1CLFdBTTVCLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDO2lCQUN2Qzs7QUFSUSxtQ0FBbUIsV0FVNUIsZUFBZSxHQUFBLDJCQUFHO0FBQ2QsMkJBQU8sRUFBRSxDQUFDO2lCQUNiOzt1QkFaUSxtQkFBbUI7ZUFBUyxjQUFjOzs7O0FBZ0J2RCwrQkFBbUIsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2NsZWFyaW5nL3NlcGEtaW5iYXRjaHMtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
