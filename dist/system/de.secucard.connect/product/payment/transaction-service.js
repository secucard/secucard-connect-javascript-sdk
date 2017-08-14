System.register(['../product-service'], function (_export) {
  'use strict';

  var ProductService, TransactionService;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_productService) {
      ProductService = _productService.ProductService;
    }],
    execute: function () {
      TransactionService = (function (_ProductService) {
        _inherits(TransactionService, _ProductService);

        function TransactionService() {
          _classCallCheck(this, TransactionService);

          _ProductService.call(this);
        }

        TransactionService.prototype.getShippingUrl = function getShippingUrl(id) {
          return this.retrieveWithAction(id, 'shippingUrl');
        };

        TransactionService.prototype.cancel = function cancel(id, data) {
          return this.execute(id, 'cancel', null, data);
        };

        TransactionService.prototype.getEndpoint = function getEndpoint() {
          return ['payment', 'transactions'];
        };

        TransactionService.prototype.getEventTargets = function getEventTargets() {
          return [];
        };

        return TransactionService;
      })(ProductService);

      _export('TransactionService', TransactionService);

      TransactionService.Uid = ['payment', 'transactions'].join('.');
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3RyYW5zYWN0aW9uLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3NCQUVhLGtCQUFrQjs7Ozs7Ozs7dUNBRnZCLGNBQWM7OztBQUVULHdCQUFrQjtrQkFBbEIsa0JBQWtCOztBQUVsQixpQkFGQSxrQkFBa0IsR0FFZjtnQ0FGSCxrQkFBa0I7O0FBRzNCLG9DQUFPLENBQUM7U0FDVDs7QUFKVSwwQkFBa0IsV0FNN0IsY0FBYyxHQUFBLHdCQUFDLEVBQUUsRUFBRTtBQUNqQixpQkFBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1NBQ25EOztBQVJVLDBCQUFrQixXQVU3QixNQUFNLEdBQUEsZ0JBQUMsRUFBRSxFQUFFLElBQUksRUFBRTtBQUNmLGlCQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDL0M7O0FBWlUsMEJBQWtCLFdBYzdCLFdBQVcsR0FBQSx1QkFBRztBQUNaLGlCQUFPLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1NBQ3BDOztBQWhCVSwwQkFBa0IsV0FrQjdCLGVBQWUsR0FBQSwyQkFBRztBQUNoQixpQkFBTyxFQUFFLENBQUM7U0FDWDs7ZUFwQlUsa0JBQWtCO1NBQVMsY0FBYzs7OztBQXdCdEQsd0JBQWtCLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3RyYW5zYWN0aW9uLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
