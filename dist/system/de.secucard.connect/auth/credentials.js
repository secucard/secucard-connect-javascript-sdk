System.register([], function (_export) {
	"use strict";

	var Credentials;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	return {
		setters: [],
		execute: function () {
			Credentials = (function () {
				function Credentials() {
					_classCallCheck(this, Credentials);

					this.client_id = null;
					this.client_secret = null;

					this.uuid = null;

					this.code = null;

					this.username = null;
					this.password = null;
					this.device = null;
					this.deviveinfo = { name: null };
				}

				Credentials.prototype.isValid = function isValid() {
					return this.client_id && this.client_secret;
				};

				return Credentials;
			})();

			_export("Credentials", Credentials);

			Credentials.create = function (credentials) {

				var cr = new Credentials();
				return Object.assign(cr, credentials);
			};
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9jcmVkZW50aWFscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7S0FZYSxXQUFXOzs7Ozs7O0FBQVgsY0FBVztBQUVaLGFBRkMsV0FBVyxHQUVUOzJCQUZGLFdBQVc7O0FBT3RCLFNBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLFNBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDOztBQUcxQixTQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7QUFFakIsU0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRWpCLFNBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3JCLFNBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3JCLFNBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ25CLFNBQUksQ0FBQyxVQUFVLEdBQUcsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUM7S0FFL0I7O0FBcEJXLGVBQVcsV0FzQnZCLE9BQU8sR0FBQSxtQkFBRztBQUNULFlBQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDO0tBQzVDOztXQXhCVyxXQUFXOzs7MEJBQVgsV0FBVzs7QUE0QnhCLGNBQVcsQ0FBQyxNQUFNLEdBQUcsVUFBQyxXQUFXLEVBQUs7O0FBRXJDLFFBQUksRUFBRSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7QUFDM0IsV0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUV0QyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9jcmVkZW50aWFscy5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=