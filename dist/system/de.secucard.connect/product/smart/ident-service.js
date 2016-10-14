System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, IdentService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            IdentService = (function (_ProductService) {
                function IdentService() {
                    _classCallCheck(this, IdentService);

                    _ProductService.call(this);
                }

                _inherits(IdentService, _ProductService);

                IdentService.prototype.getEndpoint = function getEndpoint() {
                    return ['smart', 'idents'];
                };

                IdentService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                IdentService.prototype.validate = function validate(id) {
                    return this.execute(id, 'validate');
                };

                IdentService.prototype.read = function read(id) {
                    return this.execute(id, 'read');
                };

                return IdentService;
            })(ProductService);

            _export('IdentService', IdentService);

            IdentService.Uid = ['smart', 'idents'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9pZGVudC1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt3QkFhYSxZQUFZOzs7Ozs7Ozs2Q0FGakIsY0FBYzs7O0FBRVQsd0JBQVk7QUFFVix5QkFGRixZQUFZLEdBRVA7MENBRkwsWUFBWTs7QUFHakIsOENBQU8sQ0FBQTtpQkFDVjs7MEJBSlEsWUFBWTs7QUFBWiw0QkFBWSxXQU1yQixXQUFXLEdBQUEsdUJBQUc7QUFDViwyQkFBTyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztpQkFDOUI7O0FBUlEsNEJBQVksV0FVckIsZUFBZSxHQUFBLDJCQUFHO0FBQ2QsMkJBQU8sRUFBRSxDQUFDO2lCQUNiOztBQVpRLDRCQUFZLFdBY3JCLFFBQVEsR0FBQSxrQkFBQyxFQUFFLEVBQUU7QUFDVCwyQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztpQkFDdkM7O0FBaEJRLDRCQUFZLFdBa0JyQixJQUFJLEdBQUEsY0FBQyxFQUFFLEVBQUU7QUFDTCwyQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDbkM7O3VCQXBCUSxZQUFZO2VBQVMsY0FBYzs7b0NBQW5DLFlBQVk7O0FBd0J6Qix3QkFBWSxDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3Qvc21hcnQvaWRlbnQtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=