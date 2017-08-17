System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, IdentRequestService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            IdentRequestService = (function (_ProductService) {
                _inherits(IdentRequestService, _ProductService);

                function IdentRequestService() {
                    _classCallCheck(this, IdentRequestService);

                    _ProductService.call(this);
                }

                IdentRequestService.prototype.getEndpoint = function getEndpoint() {
                    return ['services', 'identrequests'];
                };

                IdentRequestService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return IdentRequestService;
            })(ProductService);

            _export('IdentRequestService', IdentRequestService);

            IdentRequestService.Uid = ['services', 'identrequests'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zZXJ2aWNlcy9pZGVudC1yZXF1ZXN0LXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLG1CQUFtQjs7Ozs7Ozs7NkNBRnhCLGNBQWM7OztBQUVULCtCQUFtQjswQkFBbkIsbUJBQW1COztBQUVqQix5QkFGRixtQkFBbUIsR0FFZDswQ0FGTCxtQkFBbUI7O0FBR3hCLDhDQUFPLENBQUE7aUJBQ1Y7O0FBSlEsbUNBQW1CLFdBTTVCLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsVUFBVSxFQUFFLGVBQWUsQ0FBQyxDQUFDO2lCQUN4Qzs7QUFSUSxtQ0FBbUIsV0FVNUIsZUFBZSxHQUFBLDJCQUFHO0FBQ2QsMkJBQU8sRUFBRSxDQUFDO2lCQUNiOzt1QkFaUSxtQkFBbUI7ZUFBUyxjQUFjOzs7O0FBZ0J2RCwrQkFBbUIsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3NlcnZpY2VzL2lkZW50LXJlcXVlc3Qtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
