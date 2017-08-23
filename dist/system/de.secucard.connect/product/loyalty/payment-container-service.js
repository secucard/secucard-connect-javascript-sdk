System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, PaymentContainerService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            PaymentContainerService = (function (_ProductService) {
                _inherits(PaymentContainerService, _ProductService);

                function PaymentContainerService() {
                    _classCallCheck(this, PaymentContainerService);

                    _ProductService.call(this);
                }

                PaymentContainerService.prototype.getEndpoint = function getEndpoint() {
                    return ['loyalty', 'paymentcontainers'];
                };

                PaymentContainerService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return PaymentContainerService;
            })(ProductService);

            _export('PaymentContainerService', PaymentContainerService);

            PaymentContainerService.Uid = ['loyalty', 'paymentcontainers'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L3BheW1lbnQtY29udGFpbmVyLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLHVCQUF1Qjs7Ozs7Ozs7NkNBRjVCLGNBQWM7OztBQUVULG1DQUF1QjswQkFBdkIsdUJBQXVCOztBQUVyQix5QkFGRix1QkFBdUIsR0FFbEI7MENBRkwsdUJBQXVCOztBQUc1Qiw4Q0FBTyxDQUFBO2lCQUNWOztBQUpRLHVDQUF1QixXQU1oQyxXQUFXLEdBQUEsdUJBQUc7QUFDViwyQkFBTyxDQUFDLFNBQVMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO2lCQUMzQzs7QUFSUSx1Q0FBdUIsV0FVaEMsZUFBZSxHQUFBLDJCQUFHO0FBQ2QsMkJBQU8sRUFBRSxDQUFDO2lCQUNiOzt1QkFaUSx1QkFBdUI7ZUFBUyxjQUFjOzs7O0FBZ0IzRCxtQ0FBdUIsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFNBQVMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvbG95YWx0eS9wYXltZW50LWNvbnRhaW5lci1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
