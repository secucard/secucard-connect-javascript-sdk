'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _token = require('./token');

var _utilMixins = require('../util/mixins');

var _utilMixins2 = _interopRequireDefault(_utilMixins);

var TokenStorageInMem = (function () {
    function TokenStorageInMem() {
        _classCallCheck(this, TokenStorageInMem);
    }

    TokenStorageInMem.prototype.setCredentials = function setCredentials(credentials) {
        this.credentials = credentials;

        var token = null;

        if (credentials.token) {
            token = _token.Token.create(credentials.token);
            token.setExpireTime();
            delete credentials.token;
        }

        return this.storeToken(token).then();
    };

    TokenStorageInMem.prototype.removeToken = function removeToken() {
        this.token = null;
        return Promise.resolve(this.token);
    };

    TokenStorageInMem.prototype.storeToken = function storeToken(token) {

        this.token = token ? token : null;
        return Promise.resolve(this.token);
    };

    TokenStorageInMem.prototype.getStoredToken = function getStoredToken() {

        return Promise.resolve(this.token);
    };

    return TokenStorageInMem;
})();

exports.TokenStorageInMem = TokenStorageInMem;

TokenStorageInMem.createWithMixin = function (TokenStorageMixin) {

    var Mixed = _utilMixins2['default'](TokenStorageInMem, TokenStorageMixin);
    return new Mixed();
};