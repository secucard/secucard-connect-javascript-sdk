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
                    return ['payment', 'contracts'];
                };

                ContractService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                ContractService.prototype.clone = function clone(contractId, cloneParams) {
                    return this.execute(contractId, 'clone');
                };

                ContractService.prototype.cloneMine = function cloneMine(cloneParams) {
                    return this.clone('me', cloneParams);
                };

                return ContractService;
            })(ProductService);

            _export('ContractService', ContractService);

            ContractService.Uid = ['payment', 'contracts'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L2NvbnRyYWN0LXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLGVBQWU7Ozs7Ozs7OzZDQUZwQixjQUFjOzs7QUFFVCwyQkFBZTswQkFBZixlQUFlOztBQUViLHlCQUZGLGVBQWUsR0FFVjswQ0FGTCxlQUFlOztBQUdwQiw4Q0FBTyxDQUFBO2lCQUNWOztBQUpRLCtCQUFlLFdBTXhCLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2lCQUNuQzs7QUFSUSwrQkFBZSxXQVV4QixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxFQUFFLENBQUM7aUJBQ2I7O0FBWlEsK0JBQWUsV0FjeEIsS0FBSyxHQUFBLGVBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRTtBQUMzQiwyQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFDNUM7O0FBaEJRLCtCQUFlLFdBa0J4QixTQUFTLEdBQUEsbUJBQUMsV0FBVyxFQUFFO0FBQ25CLDJCQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2lCQUN4Qzs7dUJBcEJRLGVBQWU7ZUFBUyxjQUFjOzs7O0FBd0JuRCwyQkFBZSxDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvcGF5bWVudC9jb250cmFjdC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==