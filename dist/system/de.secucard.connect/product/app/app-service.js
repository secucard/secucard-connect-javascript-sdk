System.register(['../product-service', '../../util/mixins'], function (_export) {
    'use strict';

    var ProductService, mixins, AppService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }, function (_utilMixins) {
            mixins = _utilMixins['default'];
        }],
        execute: function () {
            AppService = (function (_ProductService) {
                _inherits(AppService, _ProductService);

                function AppService() {
                    _classCallCheck(this, AppService);

                    _ProductService.call(this);
                    this.isApp = true;
                    this.init();
                }

                AppService.prototype.init = function init() {};

                AppService.prototype.getEndpoint = function getEndpoint() {
                    return ['general', 'apps'];
                };

                AppService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                AppService.prototype.getUid = function getUid() {
                    return _ProductService.prototype.getUid.call(this) + '.' + this.getAppId();
                };

                return AppService;
            })(ProductService);

            _export('AppService', AppService);

            AppService.createWithMixin = function (ServiceMixin) {

                var Mixed = mixins(AppService, ServiceMixin);
                return new Mixed();
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9hcHAvYXBwLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2dDQWFhLFVBQVU7Ozs7Ozs7OzZDQUZmLGNBQWM7Ozs7O0FBRVQsc0JBQVU7MEJBQVYsVUFBVTs7QUFJUix5QkFKRixVQUFVLEdBSUw7MENBSkwsVUFBVTs7QUFLZiw4Q0FBTyxDQUFDO3lCQUhaLEtBQUssR0FBRyxJQUFJO0FBSVIsd0JBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDZjs7QUFQUSwwQkFBVSxXQVNuQixJQUFJLEdBQUEsZ0JBQUcsRUFFTjs7QUFYUSwwQkFBVSxXQWFuQixXQUFXLEdBQUEsdUJBQUc7QUFDViwyQkFBTyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDOUI7O0FBZlEsMEJBQVUsV0FtQm5CLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLEVBQUUsQ0FBQztpQkFDYjs7QUFyQlEsMEJBQVUsV0F1Qm5CLE1BQU0sR0FBQSxrQkFBRztBQUNMLDJCQUFPLDBCQUFNLE1BQU0sS0FBQSxNQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDakQ7O3VCQXpCUSxVQUFVO2VBQVMsY0FBYzs7OztBQTZCOUMsc0JBQVUsQ0FBQyxlQUFlLEdBQUcsVUFBQyxZQUFZLEVBQUs7O0FBRTNDLG9CQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQzdDLHVCQUFPLElBQUksS0FBSyxFQUFFLENBQUM7YUFFdEIsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvYXBwL2FwcC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==