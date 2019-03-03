'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _token = require('./token');

var _utilMixins = require('../util/mixins');

var _utilMixins2 = _interopRequireDefault(_utilMixins);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _minilog = require('minilog');

var _minilog2 = _interopRequireDefault(_minilog);

var TokenStorageInMem = (function () {
    function TokenStorageInMem() {
        _classCallCheck(this, TokenStorageInMem);
    }

    TokenStorageInMem.prototype.setCredentials = function setCredentials(credentials) {
        this.credentials = credentials;

        var token = null;

        if (credentials.token) {
            token = _token.Token.create(credentials.token);
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

    TokenStorageInMem.prototype.retrieveNewToken = function retrieveNewToken() {
        var _this = this;

        var retrieveToken = this.getRetrieveToken();

        if (typeof retrieveToken === 'string') {

            if (this.retrievingToken) {
                return this.retrievingToken;
            }

            this.retrievingToken = new Promise(function (resolve, reject) {

                var url = retrieveToken;
                var request = _superagent2['default'].get(url);

                request.end(function (err, res) {
                    if (err) {
                        reject(err, res);
                    } else {
                        resolve(res);
                    }
                });
            }).then(function (response) {

                delete _this.retrievingToken;

                _minilog2['default']('secucard.TokenStorageInMem').debug(response.text);

                if (!_token.Token.isValid(response.body)) {
                    var err = 'Retrieved token from ' + retrieveToken + ' is not valid: ' + response.text;
                    _minilog2['default']('secucard.TokenStorageInMem').error(err + '. Please check if \'Content-type\' header set to \'application/json\'');
                    throw new Error(err);
                }

                return _this.storeToken(response.body);
            })['catch'](function (err) {
                delete _this.retrievingToken;
                throw err;
            });

            return this.retrievingToken;
        } else if (typeof retrieveToken === 'function') {

            if (this.retrievingToken) {
                return this.retrievingToken;
            }

            this.retrievingToken = retrieveToken().then(function (token) {
                delete _this.retrievingToken;

                if (!_token.Token.isValid(token)) {
                    var err = 'Retrieved token from ' + JSON.stringify(token) + ' is not valid';
                    _minilog2['default']('secucard.TokenStorageInMem').error('' + err);
                    throw new Error(err);
                }

                return _this.storeToken(token);
            })['catch'](function (err) {
                console.log(err);
                delete _this.retrievingToken;
                throw err;
            });

            return this.retrievingToken;
        } else {
            return Promise.reject(new Error('retrieveToken is not defined'));
        }
    };

    return TokenStorageInMem;
})();

exports.TokenStorageInMem = TokenStorageInMem;

TokenStorageInMem.createWithMixin = function (TokenStorageMixin) {

    var Mixed = _utilMixins2['default'](TokenStorageInMem, TokenStorageMixin);
    return new Mixed();
};