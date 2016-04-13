System.register([], function (_export) {
    'use strict';

    var Token;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [],
        execute: function () {
            Token = (function () {
                function Token() {
                    _classCallCheck(this, Token);

                    this.access_token = null;
                    this.refresh_token = null;
                    this.token_type = 'bearer';
                    this.expires_in = 1200;
                    this.scope = null;
                }

                Token.prototype.getRefreshToken = function getRefreshToken() {

                    return this.refresh_token;
                };

                Token.prototype.getAccessToken = function getAccessToken() {

                    return this.access_token;
                };

                Token.prototype.isExpired = function isExpired() {

                    return !this.expireTime || new Date().getTime() > this.expireTime;
                };

                Token.prototype.setExpireTime = function setExpireTime() {

                    this.expireTime = parseInt(this.expires_in) * 1000 + new Date().getTime();
                };

                Token.prototype.getExpireTime = function getExpireTime() {

                    return this.expireTime;
                };

                Token.prototype.update = function update(data) {
                    return Object.assign(this, data);
                };

                return Token;
            })();

            _export('Token', Token);

            Token.create = function (data) {

                var token = new Token();
                token = Object.assign(token, data);
                return token;
            };

            Token.isValid = function (data) {

                return data && data.hasOwnProperty('access_token') && data.hasOwnProperty('expireTime');
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC90b2tlbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7UUFXYSxLQUFLOzs7Ozs7O0FBQUwsaUJBQUs7QUFFSCx5QkFGRixLQUFLLEdBRUE7MENBRkwsS0FBSzs7QUFHVix3QkFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7QUFDekIsd0JBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQzFCLHdCQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztBQUMzQix3QkFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDdkIsd0JBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2lCQUNyQjs7QUFSUSxxQkFBSyxXQVVkLGVBQWUsR0FBQSwyQkFBRzs7QUFFZCwyQkFBTyxJQUFJLENBQUMsYUFBYSxDQUFDO2lCQUU3Qjs7QUFkUSxxQkFBSyxXQWdCZCxjQUFjLEdBQUEsMEJBQUc7O0FBRWIsMkJBQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztpQkFFNUI7O0FBcEJRLHFCQUFLLFdBc0JkLFNBQVMsR0FBQSxxQkFBRzs7QUFFUiwyQkFBTyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQUFBQyxJQUFJLElBQUksRUFBRSxDQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7aUJBRXZFOztBQTFCUSxxQkFBSyxXQTRCZCxhQUFhLEdBQUEseUJBQUc7O0FBRVosd0JBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLEdBQUcsQUFBQyxJQUFJLElBQUksRUFBRSxDQUFFLE9BQU8sRUFBRSxDQUFDO2lCQUUvRTs7QUFoQ1EscUJBQUssV0FrQ2QsYUFBYSxHQUFBLHlCQUFHOztBQUVaLDJCQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7aUJBRTFCOztBQXRDUSxxQkFBSyxXQXdDZCxNQUFNLEdBQUEsZ0JBQUMsSUFBSSxFQUFFO0FBQ1QsMkJBQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ3BDOzt1QkExQ1EsS0FBSzs7Ozs7QUE4Q2xCLGlCQUFLLENBQUMsTUFBTSxHQUFHLFVBQUMsSUFBSSxFQUFLOztBQUVyQixvQkFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztBQUN4QixxQkFBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ25DLHVCQUFPLEtBQUssQ0FBQzthQUVoQixDQUFDOztBQUVGLGlCQUFLLENBQUMsT0FBTyxHQUFHLFVBQUMsSUFBSSxFQUFLOztBQUV0Qix1QkFBTyxJQUFJLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBRTNGLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9hdXRoL3Rva2VuLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==