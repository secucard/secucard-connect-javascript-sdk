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

                PaymentContainerService.prototype.validateIban = function validateIban(data) {

                    if (data.iban && data.owner) {
                        return this.execute('me', 'validateIban', null, data);
                    } else {
                        throw new Error("Iban and owner are required");
                    }
                };

                return PaymentContainerService;
            })(ProductService);

            _export('PaymentContainerService', PaymentContainerService);

            PaymentContainerService.Uid = ['loyalty', 'paymentcontainers'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L3BheW1lbnQtY29udGFpbmVyLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLHVCQUF1Qjs7Ozs7Ozs7NkNBRjVCLGNBQWM7OztBQUVULG1DQUF1QjswQkFBdkIsdUJBQXVCOztBQUVyQix5QkFGRix1QkFBdUIsR0FFbEI7MENBRkwsdUJBQXVCOztBQUc1Qiw4Q0FBTyxDQUFBO2lCQUNWOztBQUpRLHVDQUF1QixXQU1oQyxXQUFXLEdBQUEsdUJBQUc7QUFDViwyQkFBTyxDQUFDLFNBQVMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO2lCQUMzQzs7QUFSUSx1Q0FBdUIsV0FVaEMsZUFBZSxHQUFBLDJCQUFHO0FBQ2QsMkJBQU8sRUFBRSxDQUFDO2lCQUNiOztBQVpRLHVDQUF1QixXQW1CaEMsWUFBWSxHQUFBLHNCQUFDLElBQUksRUFBRTs7QUFFZix3QkFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7QUFDekIsK0JBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztxQkFDekQsTUFBTTtBQUNILDhCQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7cUJBQ2xEO2lCQUNKOzt1QkExQlEsdUJBQXVCO2VBQVMsY0FBYzs7OztBQThCM0QsbUNBQXVCLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUUsbUJBQW1CLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2xveWFsdHkvcGF5bWVudC1jb250YWluZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
