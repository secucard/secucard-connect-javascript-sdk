System.register(['babel-runtime/helpers/class-call-check', './transaction-service'], function (_export) {
	var _classCallCheck, TransactionService, Smart, Basket;

	return {
		setters: [function (_babelRuntimeHelpersClassCallCheck) {
			_classCallCheck = _babelRuntimeHelpersClassCallCheck['default'];
		}, function (_transactionService) {
			TransactionService = _transactionService.TransactionService;
		}],
		execute: function () {
			'use strict';

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9zbWFydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzBDQUVhLEtBQUssRUFRTCxNQUFNOzs7Ozs7NENBVlgsa0JBQWtCOzs7OztBQUViLFFBQUssR0FFTixTQUZDLEtBQUssR0FFSjswQkFGRCxLQUFLO0lBSWhCOztvQkFKVyxLQUFLOztBQVFMLFNBQU0sR0FFUCxTQUZDLE1BQU0sR0FFTDswQkFGRCxNQUFNOztBQUlqQixRQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNuQixRQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUVoQjs7cUJBUFcsTUFBTTs7QUFZbkIsUUFBSyxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9zbWFydC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=