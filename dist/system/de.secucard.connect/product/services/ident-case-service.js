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

                return IdentCaseService;
            })(ProductService);

            _export('IdentCaseService', IdentCaseService);

            IdentCaseService.Uid = ['services', 'identcases'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zZXJ2aWNlcy9pZGVudC1jYXNlLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLGdCQUFnQjs7Ozs7Ozs7NkNBRnJCLGNBQWM7OztBQUVULDRCQUFnQjtBQUVkLHlCQUZGLGdCQUFnQixHQUVYOzBDQUZMLGdCQUFnQjs7QUFHckIsOENBQU8sQ0FBQTtpQkFDVjs7MEJBSlEsZ0JBQWdCOztBQUFoQixnQ0FBZ0IsV0FNekIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7aUJBQ3JDOztBQVJRLGdDQUFnQixXQVV6QixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7aUJBQ2xDOzt1QkFaUSxnQkFBZ0I7ZUFBUyxjQUFjOzt3Q0FBdkMsZ0JBQWdCOztBQWdCN0IsNEJBQWdCLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zZXJ2aWNlcy9pZGVudC1jYXNlLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9