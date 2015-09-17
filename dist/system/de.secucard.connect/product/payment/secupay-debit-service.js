System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, SecupayDebitService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            SecupayDebitService = (function (_ProductService) {
                function SecupayDebitService() {
                    _classCallCheck(this, SecupayDebitService);

                    _ProductService.call(this);
                }

                _inherits(SecupayDebitService, _ProductService);

                SecupayDebitService.prototype.getEndpoint = function getEndpoint() {
                    return ['payment', 'secupaydebit'];
                };

                SecupayDebitService.prototype.getEventTargets = function getEventTargets() {
                    return ['payment.secupaydebit'];
                };

                SecupayDebitService.prototype.cancel = function cancel(id) {
                    return this.execute(id, 'cancel');
                };

                return SecupayDebitService;
            })(ProductService);

            _export('SecupayDebitService', SecupayDebitService);

            SecupayDebitService.Uid = ['payment', 'secupaydebit'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3NlY3VwYXktZGViaXQtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsbUJBQW1COzs7Ozs7Ozs2Q0FGeEIsY0FBYzs7O0FBRVQsK0JBQW1CO0FBRWpCLHlCQUZGLG1CQUFtQixHQUVkOzBDQUZMLG1CQUFtQjs7QUFHeEIsOENBQU8sQ0FBQTtpQkFDVjs7MEJBSlEsbUJBQW1COztBQUFuQixtQ0FBbUIsV0FNNUIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7aUJBQ3RDOztBQVJRLG1DQUFtQixXQVU1QixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7aUJBQ25DOztBQVpRLG1DQUFtQixXQWM1QixNQUFNLEdBQUEsZ0JBQUMsRUFBRSxFQUFFO0FBQ1AsMkJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7aUJBQ3JDOzt1QkFoQlEsbUJBQW1CO2VBQVMsY0FBYzs7MkNBQTFDLG1CQUFtQjs7QUFvQmhDLCtCQUFtQixDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvcGF5bWVudC9zZWN1cGF5LWRlYml0LXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9