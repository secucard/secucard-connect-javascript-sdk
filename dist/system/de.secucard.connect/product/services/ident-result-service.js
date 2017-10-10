System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, IdentResultService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            IdentResultService = (function (_ProductService) {
                _inherits(IdentResultService, _ProductService);

                function IdentResultService() {
                    _classCallCheck(this, IdentResultService);

                    _ProductService.call(this);
                }

                IdentResultService.prototype.getEndpoint = function getEndpoint() {
                    return ['services', 'identresults'];
                };

                IdentResultService.prototype.getEventTargets = function getEventTargets() {
                    return ['services.identresults'];
                };

                return IdentResultService;
            })(ProductService);

            _export('IdentResultService', IdentResultService);

            IdentResultService.Uid = ['services', 'identresults'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zZXJ2aWNlcy9pZGVudC1yZXN1bHQtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsa0JBQWtCOzs7Ozs7Ozs2Q0FGdkIsY0FBYzs7O0FBRVQsOEJBQWtCOzBCQUFsQixrQkFBa0I7O0FBRWhCLHlCQUZGLGtCQUFrQixHQUViOzBDQUZMLGtCQUFrQjs7QUFHdkIsOENBQU8sQ0FBQTtpQkFDVjs7QUFKUSxrQ0FBa0IsV0FNM0IsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7aUJBQ3ZDOztBQVJRLGtDQUFrQixXQVUzQixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7aUJBQ3BDOzt1QkFaUSxrQkFBa0I7ZUFBUyxjQUFjOzs7O0FBZ0J0RCw4QkFBa0IsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3NlcnZpY2VzL2lkZW50LXJlc3VsdC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
