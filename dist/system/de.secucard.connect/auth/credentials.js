System.register([], function (_export) {
	"use strict";

	var Credentials;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	return {
		setters: [],
		execute: function () {
			Credentials = function Credentials() {
				_classCallCheck(this, Credentials);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9jcmVkZW50aWFscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7S0FZYSxXQUFXOzs7Ozs7O0FBQVgsY0FBVyxHQUVaLFNBRkMsV0FBVyxHQUVUOzBCQUZGLFdBQVc7O0FBT3RCLFFBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLFFBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDOztBQUcxQixRQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7QUFFakIsUUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRWpCLFFBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3JCLFFBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3JCLFFBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ25CLFFBQUksQ0FBQyxVQUFVLEdBQUcsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFFL0I7OzBCQXBCVyxXQUFXOztBQXdCeEIsY0FBVyxDQUFDLE1BQU0sR0FBRyxVQUFDLFdBQVcsRUFBSzs7QUFFckMsUUFBSSxFQUFFLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUMzQixXQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBRXRDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9hdXRoL2NyZWRlbnRpYWxzLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==