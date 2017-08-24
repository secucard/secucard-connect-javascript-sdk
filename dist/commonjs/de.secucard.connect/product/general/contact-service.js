'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ContactService = (function (_ProductService) {
    _inherits(ContactService, _ProductService);

    function ContactService() {
        _classCallCheck(this, ContactService);

        _ProductService.call(this);
    }

    ContactService.prototype.getEndpoint = function getEndpoint() {
        return ['general', 'contacts'];
    };

    ContactService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return ContactService;
})(_productService.ProductService);

exports.ContactService = ContactService;

ContactService.Uid = ['general', 'contacts'].join('.');