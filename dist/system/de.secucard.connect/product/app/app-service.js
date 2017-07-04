System.register(['../product-service', '../../util/mixins'], function (_export) {
    'use strict';

    var ProductService, mixins, AppService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }, function (_utilMixins) {
            mixins = _utilMixins['default'];
        }],
        execute: function () {
            AppService = (function (_ProductService) {
                function AppService() {
                    _classCallCheck(this, AppService);

                    _ProductService.call(this);
                    this.isApp = true;
                    this.init();
                }

                _inherits(AppService, _ProductService);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9hcHAvYXBwLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2dDQWFhLFVBQVU7Ozs7Ozs7OzZDQUZmLGNBQWM7Ozs7O0FBRVQsc0JBQVU7QUFJUix5QkFKRixVQUFVLEdBSUw7MENBSkwsVUFBVTs7QUFLZiw4Q0FBTyxDQUFDO3lCQUhaLEtBQUssR0FBRyxJQUFJO0FBSVIsd0JBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDZjs7MEJBUFEsVUFBVTs7QUFBViwwQkFBVSxXQVNuQixJQUFJLEdBQUEsZ0JBQUcsRUFFTjs7QUFYUSwwQkFBVSxXQWFuQixXQUFXLEdBQUEsdUJBQUc7QUFDViwyQkFBTyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDOUI7O0FBZlEsMEJBQVUsV0FtQm5CLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLEVBQUUsQ0FBQztpQkFDYjs7QUFyQlEsMEJBQVUsV0F1Qm5CLE1BQU0sR0FBQSxrQkFBRztBQUNMLDJCQUFPLDBCQUFNLE1BQU0sS0FBQSxNQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDakQ7O3VCQXpCUSxVQUFVO2VBQVMsY0FBYzs7a0NBQWpDLFVBQVU7O0FBNkJ2QixzQkFBVSxDQUFDLGVBQWUsR0FBRyxVQUFDLFlBQVksRUFBSzs7QUFFM0Msb0JBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDN0MsdUJBQU8sSUFBSSxLQUFLLEVBQUUsQ0FBQzthQUV0QixDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9hcHAvYXBwLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9