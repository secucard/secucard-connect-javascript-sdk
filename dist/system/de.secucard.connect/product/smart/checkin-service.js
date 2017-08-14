System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, CheckinService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            CheckinService = (function (_ProductService) {
                _inherits(CheckinService, _ProductService);

                function CheckinService() {
                    _classCallCheck(this, CheckinService);

                    _ProductService.call(this);
                }

                CheckinService.prototype.getEndpoint = function getEndpoint() {
                    return ['smart', 'checkins'];
                };

                CheckinService.prototype.getEventTargets = function getEventTargets() {
                    return ['smart.checkins'];
                };

                return CheckinService;
            })(ProductService);

            _export('CheckinService', CheckinService);

            CheckinService.Uid = ['smart', 'checkins'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9jaGVja2luLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLGNBQWM7Ozs7Ozs7OzZDQUZuQixjQUFjOzs7QUFFVCwwQkFBYzswQkFBZCxjQUFjOztBQUVaLHlCQUZGLGNBQWMsR0FFVDswQ0FGTCxjQUFjOztBQUduQiw4Q0FBTyxDQUFBO2lCQUNWOztBQUpRLDhCQUFjLFdBTXZCLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2lCQUNoQzs7QUFSUSw4QkFBYyxXQVV2QixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7aUJBQzdCOzt1QkFaUSxjQUFjO2VBQVMsY0FBYzs7OztBQWlCbEQsMEJBQWMsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3NtYXJ0L2NoZWNraW4tc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
