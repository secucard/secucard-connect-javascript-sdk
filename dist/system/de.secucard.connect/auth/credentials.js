System.register([], function (_export) {
	"use strict";

	var Credentials;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	return {
		setters: [],
		execute: function () {
			Credentials = function Credentials() {
				_classCallCheck(this, Credentials);

				this.token = null;

				this.client_id = null;
				this.client_secret = null;

				this.uuid = null;

				this.code = null;

				this.username = null;
				this.password = null;
				this.device = null;
				this.deviveinfo = { name: null };
			};

			_export("Credentials", Credentials);

			Credentials.create = function (credentials) {

				var cr = new Credentials();
				return Object.assign(cr, credentials);
			};
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9jcmVkZW50aWFscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7S0FBYSxXQUFXOzs7Ozs7O0FBQVgsY0FBVyxHQUVaLFNBRkMsV0FBVyxHQUVUOzBCQUZGLFdBQVc7O0FBSXRCLFFBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDOztBQUtsQixRQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztBQUN0QixRQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQzs7QUFHMUIsUUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRWpCLFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDOztBQUVqQixRQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztBQUNyQixRQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztBQUNyQixRQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztBQUNuQixRQUFJLENBQUMsVUFBVSxHQUFHLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDO0lBRS9COzswQkF0QlcsV0FBVzs7QUEwQnhCLGNBQVcsQ0FBQyxNQUFNLEdBQUcsVUFBQyxXQUFXLEVBQUs7O0FBRXJDLFFBQUksRUFBRSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7QUFDM0IsV0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUV0QyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9jcmVkZW50aWFscy5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=