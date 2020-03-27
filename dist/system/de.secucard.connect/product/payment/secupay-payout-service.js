System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, SecupayPayoutService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            SecupayPayoutService = (function (_ProductService) {
                _inherits(SecupayPayoutService, _ProductService);

                function SecupayPayoutService() {
                    _classCallCheck(this, SecupayPayoutService);

                    _ProductService.call(this);
                }

                SecupayPayoutService.prototype.getEndpoint = function getEndpoint() {
                    return ['payment', 'secupaypayout'];
                };

                SecupayPayoutService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                SecupayPayoutService.prototype.payoutWithoutCustomer = function payoutWithoutCustomer() {
                    return this.execute('me', 'PayoutWithoutCustomer', null, data);
                };

                return SecupayPayoutService;
            })(ProductService);

            _export('SecupayPayoutService', SecupayPayoutService);

            SecupayPayoutService.Uid = ['payment', 'secupaypayout'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3NlY3VwYXktcGF5b3V0LXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLG9CQUFvQjs7Ozs7Ozs7NkNBRnpCLGNBQWM7OztBQUVULGdDQUFvQjswQkFBcEIsb0JBQW9COztBQUVsQix5QkFGRixvQkFBb0IsR0FFZjswQ0FGTCxvQkFBb0I7O0FBR3pCLDhDQUFPLENBQUE7aUJBQ1Y7O0FBSlEsb0NBQW9CLFdBTTdCLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFDO2lCQUN2Qzs7QUFSUSxvQ0FBb0IsV0FVN0IsZUFBZSxHQUFBLDJCQUFHO0FBQ2QsMkJBQU8sRUFBRSxDQUFDO2lCQUNiOztBQVpRLG9DQUFvQixXQWM3QixxQkFBcUIsR0FBQSxpQ0FBRztBQUNwQiwyQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSx1QkFBdUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ2xFOzt1QkFoQlEsb0JBQW9CO2VBQVMsY0FBYzs7OztBQW1CeEQsZ0NBQW9CLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3NlY3VwYXktcGF5b3V0LXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
