System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, IdentCaseService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            IdentCaseService = (function (_ProductService) {
                _inherits(IdentCaseService, _ProductService);

                function IdentCaseService() {
                    _classCallCheck(this, IdentCaseService);

                    _ProductService.call(this);
                }

                IdentCaseService.prototype.getEndpoint = function getEndpoint() {
                    return ['services', 'identcases'];
                };

                IdentCaseService.prototype.getEventTargets = function getEventTargets() {
                    return ['services.identcases'];
                };

                IdentCaseService.prototype.start = function start(id) {
                    return this.execute(id, "start");
                };

                IdentCaseService.prototype.task = function task(id, taskId, data) {
                    return this.updateWithAction(id, "task", taskId, data);
                };

                IdentCaseService.prototype.close = function close(id) {
                    return this.execute(id, "close");
                };

                return IdentCaseService;
            })(ProductService);

            _export('IdentCaseService', IdentCaseService);

            IdentCaseService.Uid = ['services', 'identcases'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zZXJ2aWNlcy9pZGVudC1jYXNlLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLGdCQUFnQjs7Ozs7Ozs7NkNBRnJCLGNBQWM7OztBQUVULDRCQUFnQjswQkFBaEIsZ0JBQWdCOztBQUVkLHlCQUZGLGdCQUFnQixHQUVYOzBDQUZMLGdCQUFnQjs7QUFHckIsOENBQU8sQ0FBQTtpQkFDVjs7QUFKUSxnQ0FBZ0IsV0FNekIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7aUJBQ3JDOztBQVJRLGdDQUFnQixXQVV6QixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7aUJBQ2xDOztBQVpRLGdDQUFnQixXQWN6QixLQUFLLEdBQUEsZUFBQyxFQUFFLEVBQUU7QUFDTiwyQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFDcEM7O0FBaEJRLGdDQUFnQixXQWtCekIsSUFBSSxHQUFBLGNBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFDbkIsMkJBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUMxRDs7QUFwQlEsZ0NBQWdCLFdBc0J6QixLQUFLLEdBQUEsZUFBQyxFQUFFLEVBQUU7QUFDTiwyQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFDcEM7O3VCQXhCUSxnQkFBZ0I7ZUFBUyxjQUFjOzs7O0FBNEJwRCw0QkFBZ0IsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3NlcnZpY2VzL2lkZW50LWNhc2Utc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
