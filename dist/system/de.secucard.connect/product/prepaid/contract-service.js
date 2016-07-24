System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, ContractService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            ContractService = (function (_ProductService) {
                _inherits(ContractService, _ProductService);

                function ContractService() {
                    _classCallCheck(this, ContractService);

                    _ProductService.call(this);
                }

                ContractService.prototype.getEndpoint = function getEndpoint() {
                    return ['prepaid', 'contracts'];
                };

                ContractService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return ContractService;
            })(ProductService);

            _export('ContractService', ContractService);

            ContractService.Uid = ['prepaid', 'contracts'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wcmVwYWlkL2NvbnRyYWN0LXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLGVBQWU7Ozs7Ozs7OzZDQUZwQixjQUFjOzs7QUFFVCwyQkFBZTswQkFBZixlQUFlOztBQUViLHlCQUZGLGVBQWUsR0FFVjswQ0FGTCxlQUFlOztBQUdwQiw4Q0FBTyxDQUFBO2lCQUNWOztBQUpRLCtCQUFlLFdBTXhCLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2lCQUNuQzs7QUFSUSwrQkFBZSxXQVV4QixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxFQUFFLENBQUM7aUJBQ2I7O3VCQVpRLGVBQWU7ZUFBUyxjQUFjOzs7O0FBcUJuRCwyQkFBZSxDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvcHJlcGFpZC9jb250cmFjdC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==