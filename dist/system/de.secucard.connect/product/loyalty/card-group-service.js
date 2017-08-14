System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, CardGroupService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            CardGroupService = (function (_ProductService) {
                _inherits(CardGroupService, _ProductService);

                function CardGroupService() {
                    _classCallCheck(this, CardGroupService);

                    _ProductService.call(this);
                }

                CardGroupService.prototype.getEndpoint = function getEndpoint() {
                    return ['loyalty', 'cardgroups'];
                };

                CardGroupService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return CardGroupService;
            })(ProductService);

            _export('CardGroupService', CardGroupService);

            CardGroupService.Uid = ['loyalty', 'cardgroups'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2NhcmQtZ3JvdXAtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsZ0JBQWdCOzs7Ozs7Ozs2Q0FGckIsY0FBYzs7O0FBRVQsNEJBQWdCOzBCQUFoQixnQkFBZ0I7O0FBRWQseUJBRkYsZ0JBQWdCLEdBRVg7MENBRkwsZ0JBQWdCOztBQUdyQiw4Q0FBTyxDQUFBO2lCQUNWOztBQUpRLGdDQUFnQixXQU16QixXQUFXLEdBQUEsdUJBQUc7QUFDViwyQkFBTyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztpQkFDcEM7O0FBUlEsZ0NBQWdCLFdBVXpCLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLEVBQUUsQ0FBQztpQkFDYjs7dUJBWlEsZ0JBQWdCO2VBQVMsY0FBYzs7OztBQWdCcEQsNEJBQWdCLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2NhcmQtZ3JvdXAtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
