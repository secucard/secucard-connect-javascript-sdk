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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3NlY3VwYXktcHJlcGF5LXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLG9CQUFvQjs7Ozs7Ozs7NkNBRnpCLGNBQWM7OztBQUVULGdDQUFvQjtBQUVsQix5QkFGRixvQkFBb0IsR0FFZjswQ0FGTCxvQkFBb0I7O0FBR3pCLDhDQUFPLENBQUE7aUJBQ1Y7OzBCQUpRLG9CQUFvQjs7QUFBcEIsb0NBQW9CLFdBTTdCLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFDO2lCQUN2Qzs7QUFSUSxvQ0FBb0IsV0FVN0IsZUFBZSxHQUFBLDJCQUFHO0FBQ2QsMkJBQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2lCQUNwQzs7QUFaUSxvQ0FBb0IsV0FjN0IsTUFBTSxHQUFBLGdCQUFDLEVBQUUsRUFBRTtBQUNQLDJCQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2lCQUNyQzs7dUJBaEJRLG9CQUFvQjtlQUFTLGNBQWM7OzRDQUEzQyxvQkFBb0I7O0FBb0JqQyxnQ0FBb0IsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFNBQVMsRUFBRSxlQUFlLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3BheW1lbnQvc2VjdXBheS1wcmVwYXktc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=