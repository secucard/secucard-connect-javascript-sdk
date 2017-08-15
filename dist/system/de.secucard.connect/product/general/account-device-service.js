System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, AccountDeviceService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            AccountDeviceService = (function (_ProductService) {
                _inherits(AccountDeviceService, _ProductService);

                function AccountDeviceService() {
                    _classCallCheck(this, AccountDeviceService);

                    _ProductService.call(this);
                }

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL2FjY291bnQtZGV2aWNlLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLG9CQUFvQjs7Ozs7Ozs7NkNBRnpCLGNBQWM7OztBQUVULGdDQUFvQjswQkFBcEIsb0JBQW9COztBQUVsQix5QkFGRixvQkFBb0IsR0FFZjswQ0FGTCxvQkFBb0I7O0FBR3pCLDhDQUFPLENBQUE7aUJBQ1Y7O0FBSlEsb0NBQW9CLFdBTTdCLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsU0FBUyxFQUFFLGdCQUFnQixDQUFDLENBQUM7aUJBQ3hDOztBQVJRLG9DQUFvQixXQVU3QixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7aUJBQ3JDOzt1QkFaUSxvQkFBb0I7ZUFBUyxjQUFjOzs7O0FBZ0J4RCxnQ0FBb0IsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFNBQVMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvZ2VuZXJhbC9hY2NvdW50LWRldmljZS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
