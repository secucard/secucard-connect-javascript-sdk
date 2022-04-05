System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, AcceptancePointTemplatesService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            AcceptancePointTemplatesService = (function (_ProductService) {
                _inherits(AcceptancePointTemplatesService, _ProductService);

                function AcceptancePointTemplatesService() {
                    _classCallCheck(this, AcceptancePointTemplatesService);

                    _ProductService.call(this);
                }

                AcceptancePointTemplatesService.prototype.getEndpoint = function getEndpoint() {
                    return ['loyalty', 'acceptancepointtemplates'];
                };

                AcceptancePointTemplatesService.prototype.getEventTargets = function getEventTargets() {
                    return ['loyalty.acceptancepointtemplates'];
                };

                return AcceptancePointTemplatesService;
            })(ProductService);

            _export('AcceptancePointTemplatesService', AcceptancePointTemplatesService);

            AcceptancePointTemplatesService.Uid = ['loyalty', 'acceptancepointtemplates'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2FjY2VwdGFuY2UtdGVtcGxhdGVzLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLCtCQUErQjs7Ozs7Ozs7NkNBRnBDLGNBQWM7OztBQUVULDJDQUErQjswQkFBL0IsK0JBQStCOztBQUU3Qix5QkFGRiwrQkFBK0IsR0FFMUI7MENBRkwsK0JBQStCOztBQUdwQyw4Q0FBTyxDQUFBO2lCQUNWOztBQUpRLCtDQUErQixXQU14QyxXQUFXLEdBQUEsdUJBQUc7QUFDViwyQkFBTyxDQUFDLFNBQVMsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO2lCQUNsRDs7QUFSUSwrQ0FBK0IsV0FVeEMsZUFBZSxHQUFBLDJCQUFHO0FBQ2QsMkJBQU8sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO2lCQUMvQzs7dUJBWlEsK0JBQStCO2VBQVMsY0FBYzs7OztBQWVuRSwyQ0FBK0IsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFNBQVMsRUFBRSwwQkFBMEIsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvbG95YWx0eS9hY2NlcHRhbmNlLXRlbXBsYXRlcy1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
