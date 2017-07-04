System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, ContractService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            ContractService = (function (_ProductService) {
                function ContractService() {
                    _classCallCheck(this, ContractService);

                    _ProductService.call(this);
                }

                _inherits(ContractService, _ProductService);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wcmVwYWlkL2NvbnRyYWN0LXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLGVBQWU7Ozs7Ozs7OzZDQUZwQixjQUFjOzs7QUFFVCwyQkFBZTtBQUViLHlCQUZGLGVBQWUsR0FFVjswQ0FGTCxlQUFlOztBQUdwQiw4Q0FBTyxDQUFBO2lCQUNWOzswQkFKUSxlQUFlOztBQUFmLCtCQUFlLFdBTXhCLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2lCQUNuQzs7QUFSUSwrQkFBZSxXQVV4QixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxFQUFFLENBQUM7aUJBQ2I7O3VCQVpRLGVBQWU7ZUFBUyxjQUFjOzt1Q0FBdEMsZUFBZTs7QUFxQjVCLDJCQUFlLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wcmVwYWlkL2NvbnRyYWN0LXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9