System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, ProgramService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            ProgramService = (function (_ProductService) {
                _inherits(ProgramService, _ProductService);

                function ProgramService() {
                    _classCallCheck(this, ProgramService);

                    _ProductService.call(this);
                }

                ProgramService.prototype.getEndpoint = function getEndpoint() {
                    return ['loyalty', 'programs'];
                };

                ProgramService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return ProgramService;
            })(ProductService);

            _export('ProgramService', ProgramService);

            ProgramService.Uid = ['loyalty', 'programs'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L3Byb2dyYW0tc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsY0FBYzs7Ozs7Ozs7NkNBRm5CLGNBQWM7OztBQUVULDBCQUFjOzBCQUFkLGNBQWM7O0FBRVoseUJBRkYsY0FBYyxHQUVUOzBDQUZMLGNBQWM7O0FBR25CLDhDQUFPLENBQUE7aUJBQ1Y7O0FBSlEsOEJBQWMsV0FNdkIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQ2xDOztBQVJRLDhCQUFjLFdBVXZCLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLEVBQUUsQ0FBQztpQkFDYjs7dUJBWlEsY0FBYztlQUFTLGNBQWM7Ozs7QUFnQmxELDBCQUFjLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L3Byb2dyYW0tc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
