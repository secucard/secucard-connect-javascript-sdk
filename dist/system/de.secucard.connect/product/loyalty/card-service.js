System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, CardService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            CardService = (function (_ProductService) {
                _inherits(CardService, _ProductService);

                function CardService() {
                    _classCallCheck(this, CardService);

                    _ProductService.call(this);
                }

                CardService.prototype.getEndpoint = function getEndpoint() {
                    return ['loyalty', 'cards'];
                };

                CardService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                CardService.prototype.assignUser = function assignUser(cardNumber, pin) {
                    return this.execute(cardNumber, 'assignUser', 'me', pin);
                };

                CardService.prototype.removeUser = function removeUser(cardNumber) {
                    return this.removeWithAction(cardNumber, 'assignUser', 'me');
                };

                return CardService;
            })(ProductService);

            _export('CardService', CardService);

            CardService.Uid = ['loyalty', 'cards'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2NhcmQtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsV0FBVzs7Ozs7Ozs7NkNBRmhCLGNBQWM7OztBQUVULHVCQUFXOzBCQUFYLFdBQVc7O0FBRVQseUJBRkYsV0FBVyxHQUVOOzBDQUZMLFdBQVc7O0FBR2hCLDhDQUFPLENBQUE7aUJBQ1Y7O0FBSlEsMkJBQVcsV0FNcEIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQy9COztBQVJRLDJCQUFXLFdBVXBCLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLEVBQUUsQ0FBQztpQkFDYjs7QUFaUSwyQkFBVyxXQWNwQixVQUFVLEdBQUEsb0JBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRTtBQUN4QiwyQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUM1RDs7QUFoQlEsMkJBQVcsV0FrQnBCLFVBQVUsR0FBQSxvQkFBQyxVQUFVLEVBQUU7QUFDbkIsMkJBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ2hFOzt1QkFwQlEsV0FBVztlQUFTLGNBQWM7Ozs7QUF3Qi9DLHVCQUFXLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2NhcmQtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
