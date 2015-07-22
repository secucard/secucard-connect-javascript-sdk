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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC90b2tlbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7S0FBYSxLQUFLOzs7Ozs7O0FBQUwsUUFBSztBQUVOLGFBRkMsS0FBSyxHQUVIOzJCQUZGLEtBQUs7O0FBR2hCLFNBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0FBQ3pCLFNBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQzFCLFNBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLFNBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLFNBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0tBQ2xCOztBQVJXLFNBQUssV0FVakIsZUFBZSxHQUFBLDJCQUFHOztBQUVqQixZQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7S0FFMUI7O0FBZFcsU0FBSyxXQWdCakIsY0FBYyxHQUFBLDBCQUFHOztBQUVoQixZQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7S0FFekI7O0FBcEJXLFNBQUssV0FzQmpCLFNBQVMsR0FBQSxxQkFBRzs7QUFFWCxZQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxBQUFDLElBQUksSUFBSSxFQUFFLENBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztLQUVwRTs7QUExQlcsU0FBSyxXQTRCakIsYUFBYSxHQUFBLHlCQUFHOztBQUVmLFNBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLEdBQUcsQUFBQyxJQUFJLElBQUksRUFBRSxDQUFFLE9BQU8sRUFBRSxDQUFDO0tBRTVFOztBQWhDVyxTQUFLLFdBa0NqQixhQUFhLEdBQUEseUJBQUc7O0FBRWYsWUFBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0tBRXZCOztBQXRDVyxTQUFLLFdBd0NqQixNQUFNLEdBQUEsZ0JBQUMsSUFBSSxFQUFFO0FBQ1osWUFBTyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNqQzs7V0ExQ1csS0FBSzs7O29CQUFMLEtBQUs7O0FBOENsQixRQUFLLENBQUMsTUFBTSxHQUFHLFVBQUMsSUFBSSxFQUFLOztBQUV4QixRQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0FBQ3hCLFNBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNuQyxXQUFPLEtBQUssQ0FBQztJQUViLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9hdXRoL3Rva2VuLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==