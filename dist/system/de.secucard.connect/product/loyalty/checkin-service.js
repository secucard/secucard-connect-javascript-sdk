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
                    return ['loyalty', 'checkins'];
                };

                CheckinService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return CheckinService;
            })(ProductService);

            _export('CheckinService', CheckinService);

            CheckinService.Uid = ['loyalty', 'checkins'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2NoZWNraW4tc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsY0FBYzs7Ozs7Ozs7NkNBRm5CLGNBQWM7OztBQUVULDBCQUFjOzBCQUFkLGNBQWM7O0FBRVoseUJBRkYsY0FBYyxHQUVUOzBDQUZMLGNBQWM7O0FBR25CLDhDQUFPLENBQUE7aUJBQ1Y7O0FBSlEsOEJBQWMsV0FNdkIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQ2xDOztBQVJRLDhCQUFjLFdBVXZCLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLEVBQUUsQ0FBQztpQkFDYjs7dUJBWlEsY0FBYztlQUFTLGNBQWM7Ozs7QUFnQmxELDBCQUFjLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2NoZWNraW4tc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=