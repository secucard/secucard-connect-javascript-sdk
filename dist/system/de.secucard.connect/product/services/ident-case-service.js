System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, IdentCaseService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            IdentCaseService = (function (_ProductService) {
                function IdentCaseService() {
                    _classCallCheck(this, IdentCaseService);

                    _ProductService.call(this);
                }

                _inherits(IdentCaseService, _ProductService);

                IdentCaseService.prototype.getEndpoint = function getEndpoint() {
                    return ['services', 'identcases'];
                };

                IdentCaseService.prototype.getEventTargets = function getEventTargets() {
                    return ['services.identcases'];
                };

                IdentCaseService.prototype.start = function start(id) {
                    return this.execute(id, 'start');
                };

                IdentCaseService.prototype.task = function task(id, taskId, data) {
                    return this.updateWithAction(id, 'task', taskId, data);
                };

                IdentCaseService.prototype.close = function close(id) {
                    return this.execute(id, 'close');
                };

                return IdentCaseService;
            })(ProductService);

            _export('IdentCaseService', IdentCaseService);

            IdentCaseService.Uid = ['services', 'identcases'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zZXJ2aWNlcy9pZGVudC1jYXNlLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLGdCQUFnQjs7Ozs7Ozs7NkNBRnJCLGNBQWM7OztBQUVULDRCQUFnQjtBQUVkLHlCQUZGLGdCQUFnQixHQUVYOzBDQUZMLGdCQUFnQjs7QUFHckIsOENBQU8sQ0FBQTtpQkFDVjs7MEJBSlEsZ0JBQWdCOztBQUFoQixnQ0FBZ0IsV0FNekIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7aUJBQ3JDOztBQVJRLGdDQUFnQixXQVV6QixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7aUJBQ2xDOztBQVpRLGdDQUFnQixXQWN6QixLQUFLLEdBQUEsZUFBQyxFQUFFLEVBQUU7QUFDTiwyQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFDcEM7O0FBaEJRLGdDQUFnQixXQWtCekIsSUFBSSxHQUFBLGNBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFDbkIsMkJBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUMxRDs7QUFwQlEsZ0NBQWdCLFdBc0J6QixLQUFLLEdBQUEsZUFBQyxFQUFFLEVBQUU7QUFDTiwyQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFDcEM7O3VCQXhCUSxnQkFBZ0I7ZUFBUyxjQUFjOzt3Q0FBdkMsZ0JBQWdCOztBQTRCN0IsNEJBQWdCLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zZXJ2aWNlcy9pZGVudC1jYXNlLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9