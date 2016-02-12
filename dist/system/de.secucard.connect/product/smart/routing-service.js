System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, RoutingService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            RoutingService = (function (_ProductService) {
                function RoutingService() {
                    _classCallCheck(this, RoutingService);

                    _ProductService.call(this);
                }

                _inherits(RoutingService, _ProductService);

                RoutingService.prototype.getEndpoint = function getEndpoint() {
                    return ['smart', 'routings'];
                };

                RoutingService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return RoutingService;
            })(ProductService);

            _export('RoutingService', RoutingService);

            RoutingService.Uid = ['smart', 'routings'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9yb3V0aW5nLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLGNBQWM7Ozs7Ozs7OzZDQUZuQixjQUFjOzs7QUFFVCwwQkFBYztBQUVaLHlCQUZGLGNBQWMsR0FFVDswQ0FGTCxjQUFjOztBQUduQiw4Q0FBTyxDQUFBO2lCQUNWOzswQkFKUSxjQUFjOztBQUFkLDhCQUFjLFdBTXZCLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2lCQUNoQzs7QUFSUSw4QkFBYyxXQVV2QixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxFQUFFLENBQUM7aUJBQ2I7O3VCQVpRLGNBQWM7ZUFBUyxjQUFjOztzQ0FBckMsY0FBYzs7QUFnQjNCLDBCQUFjLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9yb3V0aW5nLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9