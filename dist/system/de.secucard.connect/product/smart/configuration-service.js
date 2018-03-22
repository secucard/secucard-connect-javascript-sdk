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

                ConfigurationService.prototype.importConfiguration = function importConfiguration(id, data) {
                    return this.execute(id, "importConfiguration", null, data, null);
                };

                return ConfigurationService;
            })(ProductService);

            _export('ConfigurationService', ConfigurationService);

            ConfigurationService.Uid = ['smart', 'configurations'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9jb25maWd1cmF0aW9uLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLG9CQUFvQjs7Ozs7Ozs7NkNBRnpCLGNBQWM7OztBQUVULGdDQUFvQjswQkFBcEIsb0JBQW9COztBQUVsQix5QkFGRixvQkFBb0IsR0FFZjswQ0FGTCxvQkFBb0I7O0FBR3pCLDhDQUFPLENBQUE7aUJBQ1Y7O0FBSlEsb0NBQW9CLFdBTTdCLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUM7aUJBQ3RDOztBQVJRLG9DQUFvQixXQVU3QixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxFQUFFLENBQUM7aUJBQ2I7O0FBWlEsb0NBQW9CLFdBdUI3QixtQkFBbUIsR0FBQSw2QkFBQyxFQUFFLEVBQUUsSUFBSSxFQUFFO0FBQzFCLDJCQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLHFCQUFxQixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ3BFOzt1QkF6QlEsb0JBQW9CO2VBQVMsY0FBYzs7OztBQTZCeEQsZ0NBQW9CLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3NtYXJ0L2NvbmZpZ3VyYXRpb24tc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
