System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, IdentContractService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			IdentContractService = (function (_ProductService) {
				function IdentContractService() {
					_classCallCheck(this, IdentContractService);

					_ProductService.call(this);
				}

				_inherits(IdentContractService, _ProductService);

				IdentContractService.prototype.getEndpoint = function getEndpoint() {
					return ['services', 'identcontracts'];
				};

				IdentContractService.prototype.getEventTargets = function getEventTargets() {
					return [];
				};

				return IdentContractService;
			})(ProductService);

			_export('IdentContractService', IdentContractService);

			IdentContractService.Uid = ['services', 'identcontracts'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zZXJ2aWNlcy9pZGVudC1jb250cmFjdC1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztxQkFFYSxvQkFBb0I7Ozs7Ozs7O29DQUZ6QixjQUFjOzs7QUFFVCx1QkFBb0I7QUFFckIsYUFGQyxvQkFBb0IsR0FFbEI7MkJBRkYsb0JBQW9COztBQUcvQiwrQkFBTyxDQUFBO0tBQ1A7O2NBSlcsb0JBQW9COztBQUFwQix3QkFBb0IsV0FNaEMsV0FBVyxHQUFBLHVCQUFHO0FBQ2IsWUFBTyxDQUFDLFVBQVUsRUFBQyxnQkFBZ0IsQ0FBQyxDQUFDO0tBQ3JDOztBQVJXLHdCQUFvQixXQVVoQyxlQUFlLEdBQUEsMkJBQUc7QUFDakIsWUFBTyxFQUFFLENBQUM7S0FDVjs7V0FaVyxvQkFBb0I7TUFBUyxjQUFjOzttQ0FBM0Msb0JBQW9COztBQWdCakMsdUJBQW9CLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxVQUFVLEVBQUMsZ0JBQWdCLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3NlcnZpY2VzL2lkZW50LWNvbnRyYWN0LXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9