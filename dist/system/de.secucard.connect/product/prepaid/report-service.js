System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, ReportService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            ReportService = (function (_ProductService) {
                _inherits(ReportService, _ProductService);

                function ReportService() {
                    _classCallCheck(this, ReportService);

                    _ProductService.call(this);
                }

                ReportService.prototype.getEndpoint = function getEndpoint() {
                    return ['prepaid', 'reports'];
                };

                ReportService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return ReportService;
            })(ProductService);

            _export('ReportService', ReportService);

            ReportService.Uid = ['prepaid', 'reports'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wcmVwYWlkL3JlcG9ydC1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt3QkFhYSxhQUFhOzs7Ozs7Ozs2Q0FGbEIsY0FBYzs7O0FBRVQseUJBQWE7MEJBQWIsYUFBYTs7QUFFWCx5QkFGRixhQUFhLEdBRVI7MENBRkwsYUFBYTs7QUFHbEIsOENBQU8sQ0FBQTtpQkFDVjs7QUFKUSw2QkFBYSxXQU10QixXQUFXLEdBQUEsdUJBQUc7QUFDViwyQkFBTyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztpQkFDakM7O0FBUlEsNkJBQWEsV0FVdEIsZUFBZSxHQUFBLDJCQUFHO0FBQ2QsMkJBQU8sRUFBRSxDQUFDO2lCQUNiOzt1QkFaUSxhQUFhO2VBQVMsY0FBYzs7OztBQWdCakQseUJBQWEsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3ByZXBhaWQvcmVwb3J0LXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
