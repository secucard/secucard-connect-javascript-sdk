'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var SessionService = (function (_ProductService) {
    function SessionService() {
        _classCallCheck(this, SessionService);

        _ProductService.call(this);
    }

    _inherits(SessionService, _ProductService);

    SessionService.prototype.getEndpoint = function getEndpoint() {
        return ['auth', 'sessions'];
    };

    SessionService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    SessionService.prototype.check = function check() {
        return this.retrieveWithAction('me', 'debug');
    };

    return SessionService;
})(_productService.ProductService);

exports.SessionService = SessionService;

SessionService.Uid = ['auth', 'sessions'].join('.');