System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, ActionMessageService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            ActionMessageService = (function (_ProductService) {
                function ActionMessageService() {
                    _classCallCheck(this, ActionMessageService);

                    _ProductService.call(this);
                }

                _inherits(ActionMessageService, _ProductService);

                ActionMessageService.prototype.getEndpoint = function getEndpoint() {
                    return ['loyalty', 'actionmessages'];
                };

                ActionMessageService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return ActionMessageService;
            })(ProductService);

            _export('ActionMessageService', ActionMessageService);

            ActionMessageService.Uid = ['loyalty', 'actionmessages'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2FjdGlvbi1tZXNzYWdlLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLG9CQUFvQjs7Ozs7Ozs7NkNBRnpCLGNBQWM7OztBQUVULGdDQUFvQjtBQUVsQix5QkFGRixvQkFBb0IsR0FFZjswQ0FGTCxvQkFBb0I7O0FBR3pCLDhDQUFPLENBQUE7aUJBQ1Y7OzBCQUpRLG9CQUFvQjs7QUFBcEIsb0NBQW9CLFdBTTdCLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsU0FBUyxFQUFFLGdCQUFnQixDQUFDLENBQUM7aUJBQ3hDOztBQVJRLG9DQUFvQixXQVU3QixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxFQUFFLENBQUM7aUJBQ2I7O3VCQVpRLG9CQUFvQjtlQUFTLGNBQWM7OzRDQUEzQyxvQkFBb0I7O0FBZ0JqQyxnQ0FBb0IsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFNBQVMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvbG95YWx0eS9hY3Rpb24tbWVzc2FnZS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==