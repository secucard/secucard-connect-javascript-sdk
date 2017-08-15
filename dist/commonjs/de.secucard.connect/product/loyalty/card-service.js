'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var CardService = (function (_ProductService) {
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
})(_productService.ProductService);

exports.CardService = CardService;

CardService.Uid = ['loyalty', 'cards'].join('.');