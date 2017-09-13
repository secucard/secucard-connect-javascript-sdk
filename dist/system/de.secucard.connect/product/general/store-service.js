System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, StoreService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            StoreService = (function (_ProductService) {
                function StoreService() {
                    _classCallCheck(this, StoreService);

                    _ProductService.call(this);
                }

                _inherits(StoreService, _ProductService);

                StoreService.prototype.getEndpoint = function getEndpoint() {
                    return ['general', 'stores'];
                };

                StoreService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                StoreService.prototype.checkIn = function checkIn(storeId, checkInState) {
                    return this.updateWithAction(storeId, 'checkin', checkInState);
                };

                StoreService.prototype.setDefault = function setDefault(storeId) {
                    return this.updateWithAction(storeId, 'setDefault');
                };

                return StoreService;
            })(ProductService);

            _export('StoreService', StoreService);

            StoreService.Uid = ['general', 'stores'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL3N0b3JlLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLFlBQVk7Ozs7Ozs7OzZDQUZqQixjQUFjOzs7QUFFVCx3QkFBWTtBQUVWLHlCQUZGLFlBQVksR0FFUDswQ0FGTCxZQUFZOztBQUdqQiw4Q0FBTyxDQUFBO2lCQUNWOzswQkFKUSxZQUFZOztBQUFaLDRCQUFZLFdBTXJCLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2lCQUNoQzs7QUFSUSw0QkFBWSxXQVVyQixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxFQUFFLENBQUM7aUJBQ2I7O0FBWlEsNEJBQVksV0FjckIsT0FBTyxHQUFBLGlCQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUU7QUFDM0IsMkJBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7aUJBQ2xFOztBQWhCUSw0QkFBWSxXQWtCckIsVUFBVSxHQUFBLG9CQUFDLE9BQU8sRUFBRTtBQUNoQiwyQkFBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO2lCQUN2RDs7dUJBcEJRLFlBQVk7ZUFBUyxjQUFjOztvQ0FBbkMsWUFBWTs7QUF3QnpCLHdCQUFZLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL3N0b3JlLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9