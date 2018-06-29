'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TokenStorageInMem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _token = require('./token');

var _mixins = require('../util/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _minilog = require('minilog');

var _minilog2 = _interopRequireDefault(_minilog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TokenStorageInMem = exports.TokenStorageInMem = function () {
    function TokenStorageInMem() {
        _classCallCheck(this, TokenStorageInMem);
    }

    _createClass(TokenStorageInMem, [{
        key: 'setCredentials',
        value: function setCredentials(credentials) {
            this.credentials = credentials;

            var token = null;

            if (credentials.token) {
                token = _token.Token.create(credentials.token);
                delete credentials.token;
            }

            return this.storeToken(token).then();
        }
    }, {
        key: 'removeToken',
        value: function removeToken() {
            this.token = null;
            return Promise.resolve(this.token);
        }
    }, {
        key: 'storeToken',
        value: function storeToken(token) {

            this.token = token ? token : null;
            return Promise.resolve(this.token);
        }
    }, {
        key: 'getStoredToken',
        value: function getStoredToken() {

            return Promise.resolve(this.token);
        }
    }, {
        key: 'retrieveNewToken',
        value: function retrieveNewToken() {
            var _this = this;

            var retrieveToken = this.getRetrieveToken();

            if (_lodash2.default.isString(retrieveToken)) {

                if (this.retrievingToken) {
                    return this.retrievingToken;
                }

                this.retrievingToken = new Promise(function (resolve, reject) {

                    var url = retrieveToken;
                    var request = _superagent2.default.get(url);

                    request.end(function (err, res) {
                        if (err) {
                            reject(err, res);
                        } else {
                            resolve(res);
                        }
                    });
                }).then(function (response) {

                    delete _this.retrievingToken;

                    (0, _minilog2.default)('secucard.TokenStorageInMem').debug(response.text);

                    if (!_token.Token.isValid(response.body)) {
                        var err = 'Retrieved token from ' + retrieveToken + ' is not valid: ' + response.text;
                        (0, _minilog2.default)('secucard.TokenStorageInMem').error(err + '. Please check if \'Content-type\' header set to \'application/json\'');
                        throw new Error(err);
                    }

                    return _this.storeToken(response.body);
                }).catch(function (err) {
                    delete _this.retrievingToken;
                    throw err;
                });

                return this.retrievingToken;
            } else if (_lodash2.default.isFunction(retrieveToken)) {

                if (this.retrievingToken) {
                    return this.retrievingToken;
                }

                this.retrievingToken = retrieveToken().then(function (token) {
                    delete _this.retrievingToken;

                    if (!_token.Token.isValid(token)) {
                        var err = 'Retrieved token from ' + JSON.stringify(token) + ' is not valid';
                        (0, _minilog2.default)('secucard.TokenStorageInMem').error('' + err);
                        throw new Error(err);
                    }

                    return _this.storeToken(token);
                }).catch(function (err) {
                    console.log(err);
                    delete _this.retrievingToken;
                    throw err;
                });

                return this.retrievingToken;
            } else {
                return Promise.reject(new Error('retrieveToken is not defined'));
            }
        }
    }]);

    return TokenStorageInMem;
}();

TokenStorageInMem.createWithMixin = function (TokenStorageMixin) {

    var Mixed = (0, _mixins2.default)(TokenStorageInMem, TokenStorageMixin);
    return new Mixed();
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC90b2tlbi1zdG9yYWdlLmpzIl0sIm5hbWVzIjpbIlRva2VuU3RvcmFnZUluTWVtIiwiY3JlZGVudGlhbHMiLCJ0b2tlbiIsIlRva2VuIiwiY3JlYXRlIiwic3RvcmVUb2tlbiIsInRoZW4iLCJQcm9taXNlIiwicmVzb2x2ZSIsInJldHJpZXZlVG9rZW4iLCJnZXRSZXRyaWV2ZVRva2VuIiwiXyIsImlzU3RyaW5nIiwicmV0cmlldmluZ1Rva2VuIiwicmVqZWN0IiwidXJsIiwicmVxdWVzdCIsIlJlcXVlc3QiLCJnZXQiLCJlbmQiLCJlcnIiLCJyZXMiLCJyZXNwb25zZSIsImRlYnVnIiwidGV4dCIsImlzVmFsaWQiLCJib2R5IiwiZXJyb3IiLCJFcnJvciIsImNhdGNoIiwiaXNGdW5jdGlvbiIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb25zb2xlIiwibG9nIiwiY3JlYXRlV2l0aE1peGluIiwiVG9rZW5TdG9yYWdlTWl4aW4iLCJNaXhlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBV0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRWFBLGlCLFdBQUFBLGlCO0FBRVQsaUNBQWM7QUFBQTtBQUViOzs7O3VDQUVjQyxXLEVBQWE7QUFHeEIsaUJBQUtBLFdBQUwsR0FBbUJBLFdBQW5COztBQUVBLGdCQUFJQyxRQUFRLElBQVo7O0FBRUEsZ0JBQUlELFlBQVlDLEtBQWhCLEVBQXVCO0FBQ25CQSx3QkFBUUMsYUFBTUMsTUFBTixDQUFhSCxZQUFZQyxLQUF6QixDQUFSO0FBQ0EsdUJBQU9ELFlBQVlDLEtBQW5CO0FBQ0g7O0FBRUQsbUJBQU8sS0FBS0csVUFBTCxDQUFnQkgsS0FBaEIsRUFBdUJJLElBQXZCLEVBQVA7QUFFSDs7O3NDQUVhO0FBQ1YsaUJBQUtKLEtBQUwsR0FBYSxJQUFiO0FBQ0EsbUJBQU9LLFFBQVFDLE9BQVIsQ0FBZ0IsS0FBS04sS0FBckIsQ0FBUDtBQUNIOzs7bUNBRVVBLEssRUFBTzs7QUFFZCxpQkFBS0EsS0FBTCxHQUFhQSxRQUFRQSxLQUFSLEdBQWdCLElBQTdCO0FBQ0EsbUJBQU9LLFFBQVFDLE9BQVIsQ0FBZ0IsS0FBS04sS0FBckIsQ0FBUDtBQUVIOzs7eUNBRWdCOztBQUViLG1CQUFPSyxRQUFRQyxPQUFSLENBQWdCLEtBQUtOLEtBQXJCLENBQVA7QUFFSDs7OzJDQUtrQjtBQUFBOztBQUVmLGdCQUFJTyxnQkFBZ0IsS0FBS0MsZ0JBQUwsRUFBcEI7O0FBRUEsZ0JBQUdDLGlCQUFFQyxRQUFGLENBQVdILGFBQVgsQ0FBSCxFQUE4Qjs7QUFFMUIsb0JBQUcsS0FBS0ksZUFBUixFQUF5QjtBQUNyQiwyQkFBTyxLQUFLQSxlQUFaO0FBQ0g7O0FBRUQscUJBQUtBLGVBQUwsR0FBd0IsSUFBSU4sT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVU0sTUFBVixFQUFxQjs7QUFFckQsd0JBQUlDLE1BQU1OLGFBQVY7QUFDQSx3QkFBSU8sVUFBVUMscUJBQVFDLEdBQVIsQ0FBWUgsR0FBWixDQUFkOztBQUVBQyw0QkFBUUcsR0FBUixDQUFZLFVBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQ3RCLDRCQUFJRCxHQUFKLEVBQVM7QUFDTE4sbUNBQU9NLEdBQVAsRUFBWUMsR0FBWjtBQUNILHlCQUZELE1BRU87QUFDSGIsb0NBQVFhLEdBQVI7QUFDSDtBQUNKLHFCQU5EO0FBUUgsaUJBYnVCLENBQUQsQ0FhbkJmLElBYm1CLENBYWQsVUFBQ2dCLFFBQUQsRUFBYzs7QUFFbkIsMkJBQU8sTUFBS1QsZUFBWjs7QUFFQSwyQ0FBUSw0QkFBUixFQUFzQ1UsS0FBdEMsQ0FBNENELFNBQVNFLElBQXJEOztBQUVBLHdCQUFHLENBQUNyQixhQUFNc0IsT0FBTixDQUFjSCxTQUFTSSxJQUF2QixDQUFKLEVBQWtDO0FBQzlCLDRCQUFJTixnQ0FBOEJYLGFBQTlCLHVCQUE2RGEsU0FBU0UsSUFBMUU7QUFDQSwrQ0FBUSw0QkFBUixFQUFzQ0csS0FBdEMsQ0FBK0NQLEdBQS9DO0FBQ0EsOEJBQU0sSUFBSVEsS0FBSixDQUFVUixHQUFWLENBQU47QUFDSDs7QUFFRCwyQkFBTyxNQUFLZixVQUFMLENBQWdCaUIsU0FBU0ksSUFBekIsQ0FBUDtBQUVILGlCQTNCc0IsRUEyQnBCRyxLQTNCb0IsQ0EyQmQsVUFBQ1QsR0FBRCxFQUFTO0FBQ2QsMkJBQU8sTUFBS1AsZUFBWjtBQUNBLDBCQUFNTyxHQUFOO0FBQ0gsaUJBOUJzQixDQUF2Qjs7QUFnQ0EsdUJBQU8sS0FBS1AsZUFBWjtBQUVILGFBeENELE1Bd0NPLElBQUdGLGlCQUFFbUIsVUFBRixDQUFhckIsYUFBYixDQUFILEVBQWdDOztBQUVuQyxvQkFBRyxLQUFLSSxlQUFSLEVBQXlCO0FBQ3JCLDJCQUFPLEtBQUtBLGVBQVo7QUFDSDs7QUFFRCxxQkFBS0EsZUFBTCxHQUF1QkosZ0JBQWdCSCxJQUFoQixDQUFxQixVQUFDSixLQUFELEVBQVc7QUFDbkQsMkJBQU8sTUFBS1csZUFBWjs7QUFFQSx3QkFBRyxDQUFDVixhQUFNc0IsT0FBTixDQUFjdkIsS0FBZCxDQUFKLEVBQTBCO0FBQ3RCLDRCQUFJa0IsZ0NBQThCVyxLQUFLQyxTQUFMLENBQWU5QixLQUFmLENBQTlCLGtCQUFKO0FBQ0EsK0NBQVEsNEJBQVIsRUFBc0N5QixLQUF0QyxNQUErQ1AsR0FBL0M7QUFDQSw4QkFBTSxJQUFJUSxLQUFKLENBQVVSLEdBQVYsQ0FBTjtBQUNIOztBQUVELDJCQUFPLE1BQUtmLFVBQUwsQ0FBZ0JILEtBQWhCLENBQVA7QUFDSCxpQkFWc0IsRUFVcEIyQixLQVZvQixDQVVkLFVBQUNULEdBQUQsRUFBUztBQUNkYSw0QkFBUUMsR0FBUixDQUFZZCxHQUFaO0FBQ0EsMkJBQU8sTUFBS1AsZUFBWjtBQUNBLDBCQUFNTyxHQUFOO0FBQ0gsaUJBZHNCLENBQXZCOztBQWdCQSx1QkFBTyxLQUFLUCxlQUFaO0FBRUgsYUF4Qk0sTUF3QkE7QUFDSCx1QkFBT04sUUFBUU8sTUFBUixDQUFlLElBQUljLEtBQUosQ0FBVSw4QkFBVixDQUFmLENBQVA7QUFDSDtBQUVKOzs7Ozs7QUFJTDVCLGtCQUFrQm1DLGVBQWxCLEdBQW9DLFVBQUNDLGlCQUFELEVBQXVCOztBQUV2RCxRQUFJQyxRQUFRLHNCQUFPckMsaUJBQVAsRUFBMEJvQyxpQkFBMUIsQ0FBWjtBQUNBLFdBQU8sSUFBSUMsS0FBSixFQUFQO0FBRUgsQ0FMRCIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L2F1dGgvdG9rZW4tc3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
