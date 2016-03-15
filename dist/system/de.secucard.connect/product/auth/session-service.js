System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, SessionService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            SessionService = (function (_ProductService) {
                _inherits(SessionService, _ProductService);

                function SessionService() {
                    _classCallCheck(this, SessionService);

                    _ProductService.call(this);
                }

                SessionService.prototype.getEndpoint = function getEndpoint() {
                    return ['auth', 'sessions'];
                };

                SessionService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                SessionService.prototype.check = function check() {
                    return this.retrieveWithAction('me', 'debug');
                };

                return SessionService;
            })(ProductService);

            _export('SessionService', SessionService);

            SessionService.Uid = ['auth', 'sessions'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9hdXRoL3Nlc3Npb24tc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsY0FBYzs7Ozs7Ozs7NkNBRm5CLGNBQWM7OztBQUVULDBCQUFjOzBCQUFkLGNBQWM7O0FBRVoseUJBRkYsY0FBYyxHQUVUOzBDQUZMLGNBQWM7O0FBR25CLDhDQUFPLENBQUE7aUJBQ1Y7O0FBSlEsOEJBQWMsV0FNdkIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQy9COztBQVJRLDhCQUFjLFdBVXZCLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLEVBQUUsQ0FBQztpQkFDYjs7QUFaUSw4QkFBYyxXQWN2QixLQUFLLEdBQUEsaUJBQUc7QUFDSiwyQkFBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2lCQUNqRDs7dUJBaEJRLGNBQWM7ZUFBUyxjQUFjOzs7O0FBb0JsRCwwQkFBYyxDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvYXV0aC9zZXNzaW9uLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9