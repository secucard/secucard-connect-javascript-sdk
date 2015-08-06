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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC90b2tlbi1zdG9yYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztvQkFhYSxpQkFBaUI7Ozs7OztrQkFGdEIsS0FBSzs7Ozs7QUFFQSxvQkFBaUI7QUFFbEIsYUFGQyxpQkFBaUIsR0FFZjsyQkFGRixpQkFBaUI7S0FJNUI7O0FBSlcscUJBQWlCLFdBTTdCLGNBQWMsR0FBQSx3QkFBQyxXQUFXLEVBQUU7QUFHM0IsU0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7O0FBRS9CLFNBQUksS0FBSyxHQUFHLElBQUksQ0FBQzs7QUFFakIsU0FBSSxXQUFXLENBQUMsS0FBSyxFQUFFO0FBQ3RCLFdBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QyxXQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7QUFDdEIsYUFBTyxXQUFXLENBQUMsS0FBSyxDQUFDO01BQ3pCOztBQUVELFlBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUVyQzs7QUFyQlcscUJBQWlCLFdBdUI3QixXQUFXLEdBQUEsdUJBQUc7QUFDYixTQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztBQUNsQixZQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ25DOztBQTFCVyxxQkFBaUIsV0E0QjdCLFVBQVUsR0FBQSxvQkFBQyxLQUFLLEVBQUU7O0FBRWpCLFNBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFFLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDakMsWUFBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUVuQzs7QUFqQ1cscUJBQWlCLFdBbUM3QixjQUFjLEdBQUEsMEJBQUc7O0FBRWhCLFlBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FFbkM7O1dBdkNXLGlCQUFpQjs7O2dDQUFqQixpQkFBaUI7O0FBMkM5QixvQkFBaUIsQ0FBQyxlQUFlLEdBQUcsVUFBQyxpQkFBaUIsRUFBSzs7QUFFMUQsUUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFDekQsV0FBTyxJQUFJLEtBQUssRUFBRSxDQUFDO0lBRW5CLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9hdXRoL3Rva2VuLXN0b3JhZ2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9