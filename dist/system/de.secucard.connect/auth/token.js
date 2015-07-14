System.register(["babel-runtime/helpers/class-call-check", "babel-runtime/core-js/object/assign"], function (_export) {
	var _classCallCheck, _Object$assign, Token;

	return {
		setters: [function (_babelRuntimeHelpersClassCallCheck) {
			_classCallCheck = _babelRuntimeHelpersClassCallCheck["default"];
		}, function (_babelRuntimeCoreJsObjectAssign) {
			_Object$assign = _babelRuntimeCoreJsObjectAssign["default"];
		}],
		execute: function () {
			"use strict";

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

				return Token;
			})();

			_export("Token", Token);

			Token.create = function (data) {

				var token = new Token();
				token = _Object$assign(token, data);
				return token;
			};
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC90b2tlbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO3NDQUFhLEtBQUs7Ozs7Ozs7Ozs7O0FBQUwsUUFBSztBQUVOLGFBRkMsS0FBSyxHQUVIOzJCQUZGLEtBQUs7O0FBR2hCLFNBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0FBQ3pCLFNBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQzFCLFNBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLFNBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLFNBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0tBQ2xCOztBQVJXLFNBQUssV0FVakIsZUFBZSxHQUFBLDJCQUFHOztBQUVqQixZQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7S0FFMUI7O0FBZFcsU0FBSyxXQWdCakIsY0FBYyxHQUFBLDBCQUFHOztBQUVoQixZQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7S0FFekI7O0FBcEJXLFNBQUssV0FzQmpCLFNBQVMsR0FBQSxxQkFBRzs7QUFFWCxZQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxBQUFDLElBQUksSUFBSSxFQUFFLENBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztLQUVwRTs7QUExQlcsU0FBSyxXQTRCakIsYUFBYSxHQUFBLHlCQUFHOztBQUVmLFNBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLEdBQUcsQUFBQyxJQUFJLElBQUksRUFBRSxDQUFFLE9BQU8sRUFBRSxDQUFDO0tBRTVFOztBQWhDVyxTQUFLLFdBa0NqQixhQUFhLEdBQUEseUJBQUc7O0FBRWYsWUFBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0tBRXZCOztXQXRDVyxLQUFLOzs7b0JBQUwsS0FBSzs7QUEwQ2xCLFFBQUssQ0FBQyxNQUFNLEdBQUcsVUFBQyxJQUFJLEVBQUs7O0FBRXhCLFFBQUksS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7QUFDeEIsU0FBSyxHQUFHLGVBQWMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ25DLFdBQU8sS0FBSyxDQUFDO0lBRWIsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L2F1dGgvdG9rZW4uanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9