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

                    if (_.isString(retrieveToken)) {

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
                    } else if (_.isFunction(retrieveToken)) {

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC90b2tlbi1zdG9yYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs0Q0FpQmEsaUJBQWlCOzs7Ozs7OzsyQkFMdEIsS0FBSzs7Ozs7Ozs7O0FBS0EsNkJBQWlCO0FBRWYseUJBRkYsaUJBQWlCLEdBRVo7MENBRkwsaUJBQWlCO2lCQUl6Qjs7QUFKUSxpQ0FBaUIsV0FNMUIsY0FBYyxHQUFBLHdCQUFDLFdBQVcsRUFBRTtBQUd4Qix3QkFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7O0FBRS9CLHdCQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7O0FBRWpCLHdCQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUU7QUFDbkIsNkJBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QywrQkFBTyxXQUFXLENBQUMsS0FBSyxDQUFDO3FCQUM1Qjs7QUFFRCwyQkFBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUV4Qzs7QUFwQlEsaUNBQWlCLFdBc0IxQixXQUFXLEdBQUEsdUJBQUc7QUFDVix3QkFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDbEIsMkJBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3RDOztBQXpCUSxpQ0FBaUIsV0EyQjFCLFVBQVUsR0FBQSxvQkFBQyxLQUFLLEVBQUU7O0FBRWQsd0JBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDbEMsMkJBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBRXRDOztBQWhDUSxpQ0FBaUIsV0FrQzFCLGNBQWMsR0FBQSwwQkFBRzs7QUFFYiwyQkFBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFFdEM7O0FBdENRLGlDQUFpQixXQTJDMUIsZ0JBQWdCLEdBQUEsNEJBQUc7OztBQUVmLHdCQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzs7QUFFNUMsd0JBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTs7QUFFMUIsNEJBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRTtBQUNyQixtQ0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO3lCQUMvQjs7QUFFRCw0QkFBSSxDQUFDLGVBQWUsR0FBRyxBQUFDLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBSzs7QUFFckQsZ0NBQUksR0FBRyxHQUFHLGFBQWEsQ0FBQztBQUN4QixnQ0FBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFL0IsbUNBQU8sQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFLO0FBQ3RCLG9DQUFJLEdBQUcsRUFBRTtBQUNMLDBDQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lDQUNwQixNQUFNO0FBQ0gsMkNBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQ0FDaEI7NkJBQ0osQ0FBQyxDQUFDO3lCQUVOLENBQUMsQ0FBRSxJQUFJLENBQUMsVUFBQyxRQUFRLEVBQUs7O0FBRW5CLG1DQUFPLE1BQUssZUFBZSxDQUFDOztBQUU1QixtQ0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFM0QsZ0NBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUM5QixvQ0FBSSxHQUFHLDZCQUEyQixhQUFhLHVCQUFrQixRQUFRLENBQUMsSUFBSSxBQUFFLENBQUM7QUFDakYsdUNBQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLEtBQUssQ0FBSSxHQUFHLDJFQUFvRSxDQUFDO0FBQ3ZILHNDQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzZCQUN4Qjs7QUFFRCxtQ0FBTyxNQUFLLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBRXpDLENBQUMsU0FBTSxDQUFDLFVBQUMsR0FBRyxFQUFLO0FBQ2QsbUNBQU8sTUFBSyxlQUFlLENBQUM7QUFDNUIsa0NBQU0sR0FBRyxDQUFDO3lCQUNiLENBQUMsQ0FBQzs7QUFFSCwrQkFBTyxJQUFJLENBQUMsZUFBZSxDQUFDO3FCQUUvQixNQUFNLElBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRTs7QUFFbkMsNEJBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRTtBQUNyQixtQ0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO3lCQUMvQjs7QUFFRCw0QkFBSSxDQUFDLGVBQWUsR0FBRyxhQUFhLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxLQUFLLEVBQUs7QUFDbkQsbUNBQU8sTUFBSyxlQUFlLENBQUM7O0FBRTVCLGdDQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUN0QixvQ0FBSSxHQUFHLDZCQUEyQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxrQkFBZSxDQUFDO0FBQ3ZFLHVDQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxLQUFLLE1BQUksR0FBRyxDQUFHLENBQUM7QUFDdEQsc0NBQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7NkJBQ3hCOztBQUVELG1DQUFPLE1BQUssVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO3lCQUNqQyxDQUFDLFNBQU0sQ0FBQyxVQUFDLEdBQUcsRUFBSztBQUNkLG1DQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2pCLG1DQUFPLE1BQUssZUFBZSxDQUFDO0FBQzVCLGtDQUFNLEdBQUcsQ0FBQzt5QkFDYixDQUFDLENBQUM7O0FBRUgsK0JBQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztxQkFFL0IsTUFBTTtBQUNILCtCQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQyxDQUFDO3FCQUNwRTtpQkFFSjs7dUJBbkhRLGlCQUFpQjs7O3lDQUFqQixpQkFBaUI7O0FBdUg5Qiw2QkFBaUIsQ0FBQyxlQUFlLEdBQUcsVUFBQyxpQkFBaUIsRUFBSzs7QUFFdkQsb0JBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3pELHVCQUFPLElBQUksS0FBSyxFQUFFLENBQUM7YUFFdEIsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L2F1dGgvdG9rZW4tc3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=