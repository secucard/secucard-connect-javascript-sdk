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
          return this.execute(contractId, 'clone', null, cloneParams);
        };

        ContractService.prototype.cloneMine = function cloneMine(cloneParams) {
          return this.clone('me', cloneParams);
        };

        ContractService.prototype.createSubContract = function createSubContract(createSubContractRequest) {
          return this.execute('me', 'requestId', null, createSubContractRequest);
        };

        return ContractService;
      })(ProductService);

      _export('ContractService', ContractService);

      ContractService.Uid = ['payment', 'contracts'].join('.');
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L2NvbnRyYWN0LXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3NCQUVhLGVBQWU7Ozs7Ozs7O3VDQUZwQixjQUFjOzs7QUFFVCxxQkFBZTtrQkFBZixlQUFlOztBQUVmLGlCQUZBLGVBQWUsR0FFWjtnQ0FGSCxlQUFlOztBQUd4QixvQ0FBTyxDQUFDO1NBQ1Q7O0FBSlUsdUJBQWUsV0FNMUIsV0FBVyxHQUFBLHVCQUFHO0FBQ1osaUJBQU8sQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUM7U0FDakM7O0FBUlUsdUJBQWUsV0FVMUIsZUFBZSxHQUFBLDJCQUFHO0FBQ2hCLGlCQUFPLEVBQUUsQ0FBQztTQUNYOztBQVpVLHVCQUFlLFdBYzFCLEtBQUssR0FBQSxlQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUU7QUFDN0IsaUJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztTQUM3RDs7QUFoQlUsdUJBQWUsV0FrQjFCLFNBQVMsR0FBQSxtQkFBQyxXQUFXLEVBQUU7QUFDckIsaUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7U0FDdEM7O0FBcEJVLHVCQUFlLFdBc0IxQixpQkFBaUIsR0FBQSwyQkFBQyx3QkFBd0IsRUFBRTtBQUMxQyxpQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLHdCQUF3QixDQUFDLENBQUE7U0FDdkU7O2VBeEJVLGVBQWU7U0FBUyxjQUFjOzs7O0FBNEJuRCxxQkFBZSxDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvcGF5bWVudC9jb250cmFjdC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
