System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, ClearingSepaoutrecordsService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            ClearingSepaoutrecordsService = (function (_ProductService) {
                _inherits(ClearingSepaoutrecordsService, _ProductService);

                function ClearingSepaoutrecordsService() {
                    _classCallCheck(this, ClearingSepaoutrecordsService);

                    _ProductService.call(this);
                }

                ClearingSepaoutrecordsService.prototype.getEndpoint = function getEndpoint() {
                    return ['clearing', 'sepaoutrecords'];
                };

                ClearingSepaoutrecordsService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return ClearingSepaoutrecordsService;
            })(ProductService);

            _export('ClearingSepaoutrecordsService', ClearingSepaoutrecordsService);

            ClearingSepaoutrecordsService.Uid = ['clearing', 'sepaoutrecords'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9jbGVhcmluZy9jbGVhcmluZy1zZXBhLW91dHJlY29yZHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLDZCQUE2Qjs7Ozs7Ozs7NkNBRmxDLGNBQWM7OztBQUVULHlDQUE2QjswQkFBN0IsNkJBQTZCOztBQUUzQix5QkFGRiw2QkFBNkIsR0FFeEI7MENBRkwsNkJBQTZCOztBQUdsQyw4Q0FBTyxDQUFBO2lCQUNWOztBQUpRLDZDQUE2QixXQU10QyxXQUFXLEdBQUEsdUJBQUc7QUFDViwyQkFBTyxDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO2lCQUN6Qzs7QUFSUSw2Q0FBNkIsV0FVdEMsZUFBZSxHQUFBLDJCQUFHO0FBQ2QsMkJBQU8sRUFBRSxDQUFDO2lCQUNiOzt1QkFaUSw2QkFBNkI7ZUFBUyxjQUFjOzs7O0FBZ0JqRSx5Q0FBNkIsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvY2xlYXJpbmcvY2xlYXJpbmctc2VwYS1vdXRyZWNvcmRzLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
