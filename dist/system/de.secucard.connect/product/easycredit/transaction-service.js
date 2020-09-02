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

        TransactionService.prototype.getEndpoint = function getEndpoint() {
          return ['easycredit', 'transactions'];
        };

        TransactionService.prototype.getEventTargets = function getEventTargets() {
          return ['easycredit.transactions'];
        };

        return TransactionService;
      })(ProductService);

      _export('TransactionService', TransactionService);

      TransactionService.Uid = ['easycredit', 'transactions'].join('.');
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9lYXN5Y3JlZGl0L3RyYW5zYWN0aW9uLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3NCQWFhLGtCQUFrQjs7Ozs7Ozs7dUNBRnZCLGNBQWM7OztBQUVULHdCQUFrQjtrQkFBbEIsa0JBQWtCOztBQUVuQixpQkFGQyxrQkFBa0IsR0FFaEI7Z0NBRkYsa0JBQWtCOztBQUc3QixvQ0FBTyxDQUFBO1NBQ1A7O0FBSlcsMEJBQWtCLFdBTTlCLFdBQVcsR0FBQSx1QkFBRztBQUNiLGlCQUFPLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1NBQ3RDOztBQVJXLDBCQUFrQixXQVU5QixlQUFlLEdBQUEsMkJBQUc7QUFDakIsaUJBQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1NBQ25DOztlQVpXLGtCQUFrQjtTQUFTLGNBQWM7Ozs7QUFldEQsd0JBQWtCLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9lYXN5Y3JlZGl0L3RyYW5zYWN0aW9uLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
