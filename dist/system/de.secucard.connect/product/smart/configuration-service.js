System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, ConfigurationService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            ConfigurationService = (function (_ProductService) {
                _inherits(ConfigurationService, _ProductService);

                function ConfigurationService() {
                    _classCallCheck(this, ConfigurationService);

                    _ProductService.call(this);
                }

                ConfigurationService.prototype.getEndpoint = function getEndpoint() {
                    return ['smart', 'configurations'];
                };

                ConfigurationService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return ConfigurationService;
            })(ProductService);

            _export('ConfigurationService', ConfigurationService);

            ConfigurationService.Uid = ['smart', 'configurations'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9jb25maWd1cmF0aW9uLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLG9CQUFvQjs7Ozs7Ozs7NkNBRnpCLGNBQWM7OztBQUVULGdDQUFvQjswQkFBcEIsb0JBQW9COztBQUVsQix5QkFGRixvQkFBb0IsR0FFZjswQ0FGTCxvQkFBb0I7O0FBR3pCLDhDQUFPLENBQUE7aUJBQ1Y7O0FBSlEsb0NBQW9CLFdBTTdCLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUM7aUJBQ3RDOztBQVJRLG9DQUFvQixXQVU3QixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxFQUFFLENBQUM7aUJBQ2I7O3VCQVpRLG9CQUFvQjtlQUFTLGNBQWM7Ozs7QUFnQnhELGdDQUFvQixDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9jb25maWd1cmF0aW9uLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
