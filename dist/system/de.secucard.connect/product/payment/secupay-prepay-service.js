System.register(['../product-service'], function (_export) {
	'use strict';

	var ProductService, SecupayPrepayService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_productService) {
			ProductService = _productService.ProductService;
		}],
		execute: function () {
			SecupayPrepayService = (function (_ProductService) {
				function SecupayPrepayService() {
					_classCallCheck(this, SecupayPrepayService);

					_ProductService.call(this);
				}

				_inherits(SecupayPrepayService, _ProductService);

				SecupayPrepayService.prototype.getEndpoint = function getEndpoint() {
					return ['payment', 'secupayprepay'];
				};

				SecupayPrepayService.prototype.getEventTargets = function getEventTargets() {
					return ['payment.secupayprepay'];
				};

				SecupayPrepayService.prototype.cancel = function cancel(id) {
					return this.execute(id, 'cancel');
				};

				return SecupayPrepayService;
			})(ProductService);

			_export('SecupayPrepayService', SecupayPrepayService);

			SecupayPrepayService.Uid = ['payment', 'secupayprepay'].join('.');
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3NlY3VwYXktcHJlcGF5LXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3FCQWFhLG9CQUFvQjs7Ozs7Ozs7b0NBRnpCLGNBQWM7OztBQUVULHVCQUFvQjtBQUVyQixhQUZDLG9CQUFvQixHQUVsQjsyQkFGRixvQkFBb0I7O0FBRy9CLCtCQUFPLENBQUE7S0FDUDs7Y0FKVyxvQkFBb0I7O0FBQXBCLHdCQUFvQixXQU1oQyxXQUFXLEdBQUEsdUJBQUc7QUFDYixZQUFPLENBQUMsU0FBUyxFQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQ25DOztBQVJXLHdCQUFvQixXQVVoQyxlQUFlLEdBQUEsMkJBQUc7QUFDakIsWUFBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7S0FDakM7O0FBWlcsd0JBQW9CLFdBY2hDLE1BQU0sR0FBQSxnQkFBQyxFQUFFLEVBQUU7QUFDVixZQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQ2xDOztXQWhCVyxvQkFBb0I7TUFBUyxjQUFjOzttQ0FBM0Msb0JBQW9COztBQW9CakMsdUJBQW9CLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUMsZUFBZSxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3NlY3VwYXktcHJlcGF5LXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9