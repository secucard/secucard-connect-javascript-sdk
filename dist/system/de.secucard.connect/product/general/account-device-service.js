System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, AccountDeviceService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            AccountDeviceService = (function (_ProductService) {
                function AccountDeviceService() {
                    _classCallCheck(this, AccountDeviceService);

                    _ProductService.call(this);
                }

                _inherits(AccountDeviceService, _ProductService);

                AccountDeviceService.prototype.getEndpoint = function getEndpoint() {
                    return ['general', 'accountdevices'];
                };

                AccountDeviceService.prototype.getEventTargets = function getEventTargets() {
                    return ['general.accountdevices'];
                };

                return AccountDeviceService;
            })(ProductService);

            _export('AccountDeviceService', AccountDeviceService);

            AccountDeviceService.Uid = ['general', 'accountdevices'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL2FjY291bnQtZGV2aWNlLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLG9CQUFvQjs7Ozs7Ozs7NkNBRnpCLGNBQWM7OztBQUVULGdDQUFvQjtBQUVsQix5QkFGRixvQkFBb0IsR0FFZjswQ0FGTCxvQkFBb0I7O0FBR3pCLDhDQUFPLENBQUE7aUJBQ1Y7OzBCQUpRLG9CQUFvQjs7QUFBcEIsb0NBQW9CLFdBTTdCLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsU0FBUyxFQUFFLGdCQUFnQixDQUFDLENBQUM7aUJBQ3hDOztBQVJRLG9DQUFvQixXQVU3QixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7aUJBQ3JDOzt1QkFaUSxvQkFBb0I7ZUFBUyxjQUFjOzs0Q0FBM0Msb0JBQW9COztBQWdCakMsZ0NBQW9CLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2dlbmVyYWwvYWNjb3VudC1kZXZpY2Utc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=