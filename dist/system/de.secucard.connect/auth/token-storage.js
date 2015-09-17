System.register(['./token', '../util/mixins'], function (_export) {
    'use strict';

    var Token, mixins, TokenStorageInMem;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [function (_token) {
            Token = _token.Token;
        }, function (_utilMixins) {
            mixins = _utilMixins['default'];
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

            _export('TokenStorageInMem', TokenStorageInMem);

            TokenStorageInMem.createWithMixin = function (TokenStorageMixin) {

                var Mixed = mixins(TokenStorageInMem, TokenStorageMixin);
                return new Mixed();
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC90b2tlbi1zdG9yYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt1QkFhYSxpQkFBaUI7Ozs7OzsyQkFGdEIsS0FBSzs7Ozs7QUFFQSw2QkFBaUI7QUFFZix5QkFGRixpQkFBaUIsR0FFWjswQ0FGTCxpQkFBaUI7aUJBSXpCOztBQUpRLGlDQUFpQixXQU0xQixjQUFjLEdBQUEsd0JBQUMsV0FBVyxFQUFFO0FBR3hCLHdCQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQzs7QUFFL0Isd0JBQUksS0FBSyxHQUFHLElBQUksQ0FBQzs7QUFFakIsd0JBQUksV0FBVyxDQUFDLEtBQUssRUFBRTtBQUNuQiw2QkFBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hDLDZCQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7QUFDdEIsK0JBQU8sV0FBVyxDQUFDLEtBQUssQ0FBQztxQkFDNUI7O0FBRUQsMkJBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFFeEM7O0FBckJRLGlDQUFpQixXQXVCMUIsV0FBVyxHQUFBLHVCQUFHO0FBQ1Ysd0JBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLDJCQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN0Qzs7QUExQlEsaUNBQWlCLFdBNEIxQixVQUFVLEdBQUEsb0JBQUMsS0FBSyxFQUFFOztBQUVkLHdCQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ2xDLDJCQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUV0Qzs7QUFqQ1EsaUNBQWlCLFdBbUMxQixjQUFjLEdBQUEsMEJBQUc7O0FBRWIsMkJBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBRXRDOzt1QkF2Q1EsaUJBQWlCOzs7eUNBQWpCLGlCQUFpQjs7QUEyQzlCLDZCQUFpQixDQUFDLGVBQWUsR0FBRyxVQUFDLGlCQUFpQixFQUFLOztBQUV2RCxvQkFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFDekQsdUJBQU8sSUFBSSxLQUFLLEVBQUUsQ0FBQzthQUV0QixDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC90b2tlbi1zdG9yYWdlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==