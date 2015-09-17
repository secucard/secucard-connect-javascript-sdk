System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, NotificationService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            NotificationService = (function (_ProductService) {
                function NotificationService() {
                    _classCallCheck(this, NotificationService);

                    _ProductService.call(this);
                }

                _inherits(NotificationService, _ProductService);

                NotificationService.prototype.getEndpoint = function getEndpoint() {
                    return ['general', 'notifications'];
                };

                NotificationService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return NotificationService;
            })(ProductService);

            _export('NotificationService', NotificationService);

            NotificationService.Uid = ['general', 'notifications'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL25vdGlmaWNhdGlvbi1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt3QkFhYSxtQkFBbUI7Ozs7Ozs7OzZDQUZ4QixjQUFjOzs7QUFFVCwrQkFBbUI7QUFFakIseUJBRkYsbUJBQW1CLEdBRWQ7MENBRkwsbUJBQW1COztBQUd4Qiw4Q0FBTyxDQUFBO2lCQUNWOzswQkFKUSxtQkFBbUI7O0FBQW5CLG1DQUFtQixXQU01QixXQUFXLEdBQUEsdUJBQUc7QUFDViwyQkFBTyxDQUFDLFNBQVMsRUFBRSxlQUFlLENBQUMsQ0FBQztpQkFDdkM7O0FBUlEsbUNBQW1CLFdBVTVCLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLEVBQUUsQ0FBQztpQkFDYjs7dUJBWlEsbUJBQW1CO2VBQVMsY0FBYzs7MkNBQTFDLG1CQUFtQjs7QUFnQmhDLCtCQUFtQixDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvZ2VuZXJhbC9ub3RpZmljYXRpb24tc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=