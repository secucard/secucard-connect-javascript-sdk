System.register(['./token', '../util/mixins', 'superagent', 'minilog'], function (_export) {
    'use strict';

    var Token, mixins, Request, minilog, TokenStorageInMem;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [function (_token) {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC90b2tlbi1zdG9yYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt5Q0FnQmEsaUJBQWlCOzs7Ozs7MkJBTHRCLEtBQUs7Ozs7Ozs7OztBQUtBLDZCQUFpQjtBQUVmLHlCQUZGLGlCQUFpQixHQUVaOzBDQUZMLGlCQUFpQjtpQkFJekI7O0FBSlEsaUNBQWlCLFdBTTFCLGNBQWMsR0FBQSx3QkFBQyxXQUFXLEVBQUU7QUFHeEIsd0JBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDOztBQUUvQix3QkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDOztBQUVqQix3QkFBSSxXQUFXLENBQUMsS0FBSyxFQUFFO0FBQ25CLDZCQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEMsK0JBQU8sV0FBVyxDQUFDLEtBQUssQ0FBQztxQkFDNUI7O0FBRUQsMkJBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFFeEM7O0FBcEJRLGlDQUFpQixXQXNCMUIsV0FBVyxHQUFBLHVCQUFHO0FBQ1Ysd0JBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLDJCQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN0Qzs7QUF6QlEsaUNBQWlCLFdBMkIxQixVQUFVLEdBQUEsb0JBQUMsS0FBSyxFQUFFOztBQUVkLHdCQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ2xDLDJCQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUV0Qzs7QUFoQ1EsaUNBQWlCLFdBa0MxQixjQUFjLEdBQUEsMEJBQUc7O0FBRWIsMkJBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBRXRDOztBQXRDUSxpQ0FBaUIsV0EyQzFCLGdCQUFnQixHQUFBLDRCQUFHOzs7QUFFZix3QkFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7O0FBRTVDLHdCQUFHLE9BQU8sYUFBYSxLQUFLLFFBQVEsRUFBRTs7QUFFbEMsNEJBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRTtBQUNyQixtQ0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO3lCQUMvQjs7QUFFRCw0QkFBSSxDQUFDLGVBQWUsR0FBRyxBQUFDLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBSzs7QUFFckQsZ0NBQUksR0FBRyxHQUFHLGFBQWEsQ0FBQztBQUN4QixnQ0FBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFL0IsbUNBQU8sQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFLO0FBQ3RCLG9DQUFJLEdBQUcsRUFBRTtBQUNMLDBDQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lDQUNwQixNQUFNO0FBQ0gsMkNBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQ0FDaEI7NkJBQ0osQ0FBQyxDQUFDO3lCQUVOLENBQUMsQ0FBRSxJQUFJLENBQUMsVUFBQyxRQUFRLEVBQUs7O0FBRW5CLG1DQUFPLE1BQUssZUFBZSxDQUFDOztBQUU1QixtQ0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFM0QsZ0NBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUM5QixvQ0FBSSxHQUFHLDZCQUEyQixhQUFhLHVCQUFrQixRQUFRLENBQUMsSUFBSSxBQUFFLENBQUM7QUFDakYsdUNBQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLEtBQUssQ0FBSSxHQUFHLDJFQUFvRSxDQUFDO0FBQ3ZILHNDQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzZCQUN4Qjs7QUFFRCxtQ0FBTyxNQUFLLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBRXpDLENBQUMsU0FBTSxDQUFDLFVBQUMsR0FBRyxFQUFLO0FBQ2QsbUNBQU8sTUFBSyxlQUFlLENBQUM7QUFDNUIsa0NBQU0sR0FBRyxDQUFDO3lCQUNiLENBQUMsQ0FBQzs7QUFFSCwrQkFBTyxJQUFJLENBQUMsZUFBZSxDQUFDO3FCQUUvQixNQUFNLElBQUcsT0FBTyxhQUFhLEtBQUssVUFBVSxFQUFFOztBQUUzQyw0QkFBRyxJQUFJLENBQUMsZUFBZSxFQUFFO0FBQ3JCLG1DQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7eUJBQy9COztBQUVELDRCQUFJLENBQUMsZUFBZSxHQUFHLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLEtBQUssRUFBSztBQUNuRCxtQ0FBTyxNQUFLLGVBQWUsQ0FBQzs7QUFFNUIsZ0NBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ3RCLG9DQUFJLEdBQUcsNkJBQTJCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGtCQUFlLENBQUM7QUFDdkUsdUNBQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLEtBQUssTUFBSSxHQUFHLENBQUcsQ0FBQztBQUN0RCxzQ0FBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzs2QkFDeEI7O0FBRUQsbUNBQU8sTUFBSyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQ2pDLENBQUMsU0FBTSxDQUFDLFVBQUMsR0FBRyxFQUFLO0FBQ2QsbUNBQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakIsbUNBQU8sTUFBSyxlQUFlLENBQUM7QUFDNUIsa0NBQU0sR0FBRyxDQUFDO3lCQUNiLENBQUMsQ0FBQzs7QUFFSCwrQkFBTyxJQUFJLENBQUMsZUFBZSxDQUFDO3FCQUUvQixNQUFNO0FBQ0gsK0JBQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLENBQUM7cUJBQ3BFO2lCQUVKOzt1QkFuSFEsaUJBQWlCOzs7OztBQXVIOUIsNkJBQWlCLENBQUMsZUFBZSxHQUFHLFVBQUMsaUJBQWlCLEVBQUs7O0FBRXZELG9CQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztBQUN6RCx1QkFBTyxJQUFJLEtBQUssRUFBRSxDQUFDO2FBRXRCLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9hdXRoL3Rva2VuLXN0b3JhZ2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
