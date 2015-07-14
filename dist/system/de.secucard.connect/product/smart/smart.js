System.register(['./transaction-service'], function (_export) {
	'use strict';

	var TransactionService, Smart, Basket;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [function (_transactionService) {
			TransactionService = _transactionService.TransactionService;
		}],
		execute: function () {
			Smart = function Smart() {
				_classCallCheck(this, Smart);
			};

			_export('Smart', Smart);

			Basket = function Basket() {
				_classCallCheck(this, Basket);

				this.products = [];
				this.texts = [];
			};

			_export('Basket', Basket);

			Smart.TransactionService = TransactionService;
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9zbWFydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7eUJBRWEsS0FBSyxFQVFMLE1BQU07Ozs7Ozs0Q0FWWCxrQkFBa0I7OztBQUViLFFBQUssR0FFTixTQUZDLEtBQUssR0FFSjswQkFGRCxLQUFLO0lBSWhCOztvQkFKVyxLQUFLOztBQVFMLFNBQU0sR0FFUCxTQUZDLE1BQU0sR0FFTDswQkFGRCxNQUFNOztBQUlqQixRQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNuQixRQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUVoQjs7cUJBUFcsTUFBTTs7QUFZbkIsUUFBSyxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9zbWFydC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=