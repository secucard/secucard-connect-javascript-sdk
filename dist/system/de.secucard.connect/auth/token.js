System.register([], function (_export) {
    "use strict";

    var Token;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    return {
        setters: [],
        execute: function () {
            Token = (function () {
                function Token() {
                    _classCallCheck(this, Token);

                    this.access_token = null;
                    this.refresh_token = null;
                    this.token_type = null;
                    this.expires_in = null;
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

            _export("Token", Token);

            Token.create = function (data) {

                var token = new Token();
                token = Object.assign(token, data);
                return token;
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC90b2tlbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7UUFXYSxLQUFLOzs7Ozs7O0FBQUwsaUJBQUs7QUFFSCx5QkFGRixLQUFLLEdBRUE7MENBRkwsS0FBSzs7QUFHVix3QkFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7QUFDekIsd0JBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQzFCLHdCQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztBQUN2Qix3QkFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDdkIsd0JBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2lCQUNyQjs7QUFSUSxxQkFBSyxXQVVkLGVBQWUsR0FBQSwyQkFBRzs7QUFFZCwyQkFBTyxJQUFJLENBQUMsYUFBYSxDQUFDO2lCQUU3Qjs7QUFkUSxxQkFBSyxXQWdCZCxjQUFjLEdBQUEsMEJBQUc7O0FBRWIsMkJBQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztpQkFFNUI7O0FBcEJRLHFCQUFLLFdBc0JkLFNBQVMsR0FBQSxxQkFBRzs7QUFFUiwyQkFBTyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQUFBQyxJQUFJLElBQUksRUFBRSxDQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7aUJBRXZFOztBQTFCUSxxQkFBSyxXQTRCZCxhQUFhLEdBQUEseUJBQUc7O0FBRVosd0JBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLEdBQUcsQUFBQyxJQUFJLElBQUksRUFBRSxDQUFFLE9BQU8sRUFBRSxDQUFDO2lCQUUvRTs7QUFoQ1EscUJBQUssV0FrQ2QsYUFBYSxHQUFBLHlCQUFHOztBQUVaLDJCQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7aUJBRTFCOztBQXRDUSxxQkFBSyxXQXdDZCxNQUFNLEdBQUEsZ0JBQUMsSUFBSSxFQUFFO0FBQ1QsMkJBQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ3BDOzt1QkExQ1EsS0FBSzs7OzZCQUFMLEtBQUs7O0FBOENsQixpQkFBSyxDQUFDLE1BQU0sR0FBRyxVQUFDLElBQUksRUFBSzs7QUFFckIsb0JBQUksS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7QUFDeEIscUJBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNuQyx1QkFBTyxLQUFLLENBQUM7YUFFaEIsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L2F1dGgvdG9rZW4uanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9