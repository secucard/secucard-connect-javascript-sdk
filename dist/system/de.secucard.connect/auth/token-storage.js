System.register(['lodash', './token', '../util/mixins', 'superagent', 'minilog'], function (_export) {
    'use strict';

    var _, Token, mixins, Request, minilog, TokenStorageInMem;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [function (_lodash) {
            _ = _lodash['default'];
        }, function (_token) {
            Token = _token.Token;
        }, function (_utilMixins) {
            mixins = _utilMixins['default'];
        }, function (_superagent) {
            Request = _superagent['default'];
        }, function (_minilog) {
            minilog = _minilog['default'];
        }],
        execute: function () {
            TokenStorageInMem = (function () {
                function TokenStorageInMem() {
                    _classCallCheck(this, TokenStorageInMem);
                }

                TokenStorageInMem.prototype.setCredentials = function setCredentials(credentials) {
                    this.credentials = credentials;

                    var token = null;

                    if (credentials.token) {
                        token = Token.create(credentials.token);
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
                            var request = Request.get(url);

                            request.end(function (err, res) {
                                if (err) {
                                    reject(err, res);
                                } else {
                                    resolve(res);
                                }
                            });
                        }).then(function (response) {

                            delete _this.retrievingToken;

                            minilog('secucard.TokenStorageInMem').debug(response.text);

                            if (!Token.isValid(response.body)) {
                                var err = 'Retrieved token from ' + retrieveToken + ' is not valid: ' + response.text;
                                minilog('secucard.TokenStorageInMem').error(err + '. Please check if \'Content-type\' header set to \'application/json\'');
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

                            if (!Token.isValid(token)) {
                                var err = 'Retrieved token from ' + JSON.stringify(token) + ' is not valid';
                                minilog('secucard.TokenStorageInMem').error('' + err);
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

            _export('TokenStorageInMem', TokenStorageInMem);

            TokenStorageInMem.createWithMixin = function (TokenStorageMixin) {

                var Mixed = mixins(TokenStorageInMem, TokenStorageMixin);
                return new Mixed();
            };
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC90b2tlbi1zdG9yYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs0Q0FpQmEsaUJBQWlCOzs7Ozs7OzsyQkFMdEIsS0FBSzs7Ozs7Ozs7O0FBS0EsNkJBQWlCO0FBRWYseUJBRkYsaUJBQWlCLEdBRVo7MENBRkwsaUJBQWlCO2lCQUl6Qjs7QUFKUSxpQ0FBaUIsV0FNMUIsY0FBYyxHQUFBLHdCQUFDLFdBQVcsRUFBRTtBQUd4Qix3QkFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7O0FBRS9CLHdCQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7O0FBRWpCLHdCQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUU7QUFDbkIsNkJBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QywrQkFBTyxXQUFXLENBQUMsS0FBSyxDQUFDO3FCQUM1Qjs7QUFFRCwyQkFBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUV4Qzs7QUFwQlEsaUNBQWlCLFdBc0IxQixXQUFXLEdBQUEsdUJBQUc7QUFDVix3QkFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDbEIsMkJBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3RDOztBQXpCUSxpQ0FBaUIsV0EyQjFCLFVBQVUsR0FBQSxvQkFBQyxLQUFLLEVBQUU7O0FBRWQsd0JBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDbEMsMkJBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBRXRDOztBQWhDUSxpQ0FBaUIsV0FrQzFCLGNBQWMsR0FBQSwwQkFBRzs7QUFFYiwyQkFBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFFdEM7O0FBdENRLGlDQUFpQixXQTJDMUIsZ0JBQWdCLEdBQUEsNEJBQUc7OztBQUVmLHdCQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzs7QUFFNUMsd0JBQUcsT0FBTyxhQUFhLEtBQUssUUFBUSxFQUFFOztBQUVsQyw0QkFBRyxJQUFJLENBQUMsZUFBZSxFQUFFO0FBQ3JCLG1DQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7eUJBQy9COztBQUVELDRCQUFJLENBQUMsZUFBZSxHQUFHLEFBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFLOztBQUVyRCxnQ0FBSSxHQUFHLEdBQUcsYUFBYSxDQUFDO0FBQ3hCLGdDQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUUvQixtQ0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUs7QUFDdEIsb0NBQUksR0FBRyxFQUFFO0FBQ0wsMENBQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7aUNBQ3BCLE1BQU07QUFDSCwyQ0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lDQUNoQjs2QkFDSixDQUFDLENBQUM7eUJBRU4sQ0FBQyxDQUFFLElBQUksQ0FBQyxVQUFDLFFBQVEsRUFBSzs7QUFFbkIsbUNBQU8sTUFBSyxlQUFlLENBQUM7O0FBRTVCLG1DQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUUzRCxnQ0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzlCLG9DQUFJLEdBQUcsNkJBQTJCLGFBQWEsdUJBQWtCLFFBQVEsQ0FBQyxJQUFJLEFBQUUsQ0FBQztBQUNqRix1Q0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUMsS0FBSyxDQUFJLEdBQUcsMkVBQW9FLENBQUM7QUFDdkgsc0NBQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7NkJBQ3hCOztBQUVELG1DQUFPLE1BQUssVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFFekMsQ0FBQyxTQUFNLENBQUMsVUFBQyxHQUFHLEVBQUs7QUFDZCxtQ0FBTyxNQUFLLGVBQWUsQ0FBQztBQUM1QixrQ0FBTSxHQUFHLENBQUM7eUJBQ2IsQ0FBQyxDQUFDOztBQUVILCtCQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7cUJBRS9CLE1BQU0sSUFBRyxPQUFPLGFBQWEsS0FBSyxVQUFVLEVBQUU7O0FBRTNDLDRCQUFHLElBQUksQ0FBQyxlQUFlLEVBQUU7QUFDckIsbUNBQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQzt5QkFDL0I7O0FBRUQsNEJBQUksQ0FBQyxlQUFlLEdBQUcsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsS0FBSyxFQUFLO0FBQ25ELG1DQUFPLE1BQUssZUFBZSxDQUFDOztBQUU1QixnQ0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDdEIsb0NBQUksR0FBRyw2QkFBMkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsa0JBQWUsQ0FBQztBQUN2RSx1Q0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUMsS0FBSyxNQUFJLEdBQUcsQ0FBRyxDQUFDO0FBQ3RELHNDQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzZCQUN4Qjs7QUFFRCxtQ0FBTyxNQUFLLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQzt5QkFDakMsQ0FBQyxTQUFNLENBQUMsVUFBQyxHQUFHLEVBQUs7QUFDZCxtQ0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNqQixtQ0FBTyxNQUFLLGVBQWUsQ0FBQztBQUM1QixrQ0FBTSxHQUFHLENBQUM7eUJBQ2IsQ0FBQyxDQUFDOztBQUVILCtCQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7cUJBRS9CLE1BQU07QUFDSCwrQkFBTyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQztxQkFDcEU7aUJBRUo7O3VCQW5IUSxpQkFBaUI7Ozs7O0FBdUg5Qiw2QkFBaUIsQ0FBQyxlQUFlLEdBQUcsVUFBQyxpQkFBaUIsRUFBSzs7QUFFdkQsb0JBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3pELHVCQUFPLElBQUksS0FBSyxFQUFFLENBQUM7YUFFdEIsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L2F1dGgvdG9rZW4tc3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
