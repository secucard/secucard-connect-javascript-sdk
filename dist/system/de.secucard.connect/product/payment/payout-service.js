System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, PayoutService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            PayoutService = (function (_ProductService) {
                _inherits(PayoutService, _ProductService);

                function PayoutService() {
                    _classCallCheck(this, PayoutService);

                    _ProductService.call(this);
                }

                PayoutService.prototype.getEndpoint = function getEndpoint() {
                    return ['payment', 'payouts'];
                };

                PayoutService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return PayoutService;
            })(ProductService);

            _export('PayoutService', PayoutService);

            PayoutService.Uid = ['payment', 'payouts'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3BheW91dC1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt3QkFZYSxhQUFhOzs7Ozs7Ozs2Q0FEbEIsY0FBYzs7O0FBQ1QseUJBQWE7MEJBQWIsYUFBYTs7QUFDWCx5QkFERixhQUFhLEdBQ1I7MENBREwsYUFBYTs7QUFFbEIsOENBQU8sQ0FBQTtpQkFDVjs7QUFIUSw2QkFBYSxXQUl0QixXQUFXLEdBQUEsdUJBQUc7QUFDViwyQkFBTyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztpQkFDakM7O0FBTlEsNkJBQWEsV0FPdEIsZUFBZSxHQUFBLDJCQUFHO0FBQ2QsMkJBQU8sRUFBRSxDQUFDO2lCQUNiOzt1QkFUUSxhQUFhO2VBQVMsY0FBYzs7OztBQVdqRCx5QkFBYSxDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvcGF5bWVudC9wYXlvdXQtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
