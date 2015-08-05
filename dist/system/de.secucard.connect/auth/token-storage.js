System.register(['./token'], function (_export) {
	'use strict';

	var Token, TokenStorageInMem;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [function (_token) {
			Token = _token.Token;
		}],
		execute: function () {
			TokenStorageInMem = (function () {
				function TokenStorageInMem(credentials) {
					_classCallCheck(this, TokenStorageInMem);

					this.credentials = credentials;

					var token = null;

					if (credentials.token) {
						token = Token.create(credentials.token);
						token.setExpireTime();
						delete credentials.token;
					}

					this.storeToken(token);
				}

				TokenStorageInMem.prototype.removeToken = function removeToken() {

					this.token = null;
				};

				TokenStorageInMem.prototype.storeToken = function storeToken(token) {

					this.token = token ? token : null;
				};

				TokenStorageInMem.prototype.getStoredToken = function getStoredToken() {

					return this.token;
				};

				return TokenStorageInMem;
			})();

			_export('TokenStorageInMem', TokenStorageInMem);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC90b2tlbi1zdG9yYWdlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztZQVlhLGlCQUFpQjs7Ozs7O2tCQUR0QixLQUFLOzs7QUFDQSxvQkFBaUI7QUFFbEIsYUFGQyxpQkFBaUIsQ0FFakIsV0FBVyxFQUFFOzJCQUZiLGlCQUFpQjs7QUFLNUIsU0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7O0FBRS9CLFNBQUksS0FBSyxHQUFHLElBQUksQ0FBQzs7QUFFakIsU0FBSSxXQUFXLENBQUMsS0FBSyxFQUFFO0FBQ3RCLFdBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QyxXQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7QUFDdEIsYUFBTyxXQUFXLENBQUMsS0FBSyxDQUFDO01BQ3pCOztBQUVELFNBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7S0FFdkI7O0FBakJXLHFCQUFpQixXQW1CN0IsV0FBVyxHQUFBLHVCQUFHOztBQUViLFNBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0tBRWxCOztBQXZCVyxxQkFBaUIsV0F5QjdCLFVBQVUsR0FBQSxvQkFBQyxLQUFLLEVBQUU7O0FBRWpCLFNBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFFLEtBQUssR0FBRyxJQUFJLENBQUM7S0FFakM7O0FBN0JXLHFCQUFpQixXQStCN0IsY0FBYyxHQUFBLDBCQUFHOztBQUVoQixZQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7S0FFbEI7O1dBbkNXLGlCQUFpQjs7O2dDQUFqQixpQkFBaUIiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9hdXRoL3Rva2VuLXN0b3JhZ2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9