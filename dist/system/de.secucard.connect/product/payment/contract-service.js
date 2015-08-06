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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L2NvbnRyYWN0LXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3FCQWFhLGVBQWU7Ozs7Ozs7O29DQUZwQixjQUFjOzs7QUFFVCxrQkFBZTtBQUVoQixhQUZDLGVBQWUsR0FFYjsyQkFGRixlQUFlOztBQUcxQiwrQkFBTyxDQUFBO0tBQ1A7O2NBSlcsZUFBZTs7QUFBZixtQkFBZSxXQU0zQixXQUFXLEdBQUEsdUJBQUc7QUFDYixZQUFPLENBQUMsU0FBUyxFQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQy9COztBQVJXLG1CQUFlLFdBVTNCLGVBQWUsR0FBQSwyQkFBRztBQUNqQixZQUFPLEVBQUUsQ0FBQztLQUNWOztBQVpXLG1CQUFlLFdBYzNCLEtBQUssR0FBQSxlQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUU7QUFDOUIsWUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUN6Qzs7QUFoQlcsbUJBQWUsV0FrQjNCLFNBQVMsR0FBQSxtQkFBQyxXQUFXLEVBQUU7QUFDdEIsWUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztLQUNyQzs7V0FwQlcsZUFBZTtNQUFTLGNBQWM7OzhCQUF0QyxlQUFlOztBQXdCNUIsa0JBQWUsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFNBQVMsRUFBQyxXQUFXLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3BheW1lbnQvY29udHJhY3Qtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=