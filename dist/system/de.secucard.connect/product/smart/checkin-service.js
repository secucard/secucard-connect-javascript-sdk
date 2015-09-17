System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, CheckinService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            CheckinService = (function (_ProductService) {
                function CheckinService() {
                    _classCallCheck(this, CheckinService);

                    _ProductService.call(this);
                }

                _inherits(CheckinService, _ProductService);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9jaGVja2luLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLGNBQWM7Ozs7Ozs7OzZDQUZuQixjQUFjOzs7QUFFVCwwQkFBYztBQUVaLHlCQUZGLGNBQWMsR0FFVDswQ0FGTCxjQUFjOztBQUduQiw4Q0FBTyxDQUFBO2lCQUNWOzswQkFKUSxjQUFjOztBQUFkLDhCQUFjLFdBTXZCLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2lCQUNoQzs7QUFSUSw4QkFBYyxXQVl2QixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7aUJBQzdCOzt1QkFkUSxjQUFjO2VBQVMsY0FBYzs7c0NBQXJDLGNBQWM7O0FBbUIzQiwwQkFBYyxDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3Qvc21hcnQvY2hlY2tpbi1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==