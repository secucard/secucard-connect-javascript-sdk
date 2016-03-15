System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, SecupayPrepayService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            SecupayPrepayService = (function (_ProductService) {
                _inherits(SecupayPrepayService, _ProductService);

                function SecupayPrepayService() {
                    _classCallCheck(this, SecupayPrepayService);

                    _ProductService.call(this);
                }

                SecupayPrepayService.prototype.getEndpoint = function getEndpoint() {
                    return ['payment', 'secupayprepays'];
                };

                SecupayPrepayService.prototype.getEventTargets = function getEventTargets() {
                    return ['payment.secupayprepays'];
                };

                SecupayPrepayService.prototype.cancel = function cancel(id) {
                    return this.execute(id, 'cancel');
                };

                return SecupayPrepayService;
            })(ProductService);

            _export('SecupayPrepayService', SecupayPrepayService);

            SecupayPrepayService.Uid = ['payment', 'secupayprepays'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3NlY3VwYXktcHJlcGF5LXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLG9CQUFvQjs7Ozs7Ozs7NkNBRnpCLGNBQWM7OztBQUVULGdDQUFvQjswQkFBcEIsb0JBQW9COztBQUVsQix5QkFGRixvQkFBb0IsR0FFZjswQ0FGTCxvQkFBb0I7O0FBR3pCLDhDQUFPLENBQUE7aUJBQ1Y7O0FBSlEsb0NBQW9CLFdBTTdCLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsU0FBUyxFQUFFLGdCQUFnQixDQUFDLENBQUM7aUJBQ3hDOztBQVJRLG9DQUFvQixXQVU3QixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7aUJBQ3JDOztBQVpRLG9DQUFvQixXQWM3QixNQUFNLEdBQUEsZ0JBQUMsRUFBRSxFQUFFO0FBQ1AsMkJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7aUJBQ3JDOzt1QkFoQlEsb0JBQW9CO2VBQVMsY0FBYzs7OztBQW9CeEQsZ0NBQW9CLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3BheW1lbnQvc2VjdXBheS1wcmVwYXktc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=