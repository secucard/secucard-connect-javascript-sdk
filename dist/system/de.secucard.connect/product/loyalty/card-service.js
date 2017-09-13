System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, CardService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            CardService = (function (_ProductService) {
                function CardService() {
                    _classCallCheck(this, CardService);

                    _ProductService.call(this);
                }

                _inherits(CardService, _ProductService);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2NhcmQtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsV0FBVzs7Ozs7Ozs7NkNBRmhCLGNBQWM7OztBQUVULHVCQUFXO0FBRVQseUJBRkYsV0FBVyxHQUVOOzBDQUZMLFdBQVc7O0FBR2hCLDhDQUFPLENBQUE7aUJBQ1Y7OzBCQUpRLFdBQVc7O0FBQVgsMkJBQVcsV0FNcEIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQy9COztBQVJRLDJCQUFXLFdBVXBCLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLEVBQUUsQ0FBQztpQkFDYjs7QUFaUSwyQkFBVyxXQWNwQixVQUFVLEdBQUEsb0JBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRTtBQUN4QiwyQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUM1RDs7QUFoQlEsMkJBQVcsV0FrQnBCLFVBQVUsR0FBQSxvQkFBQyxVQUFVLEVBQUU7QUFDbkIsMkJBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ2hFOzt1QkFwQlEsV0FBVztlQUFTLGNBQWM7O21DQUFsQyxXQUFXOztBQXdCeEIsdUJBQVcsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2xveWFsdHkvY2FyZC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==