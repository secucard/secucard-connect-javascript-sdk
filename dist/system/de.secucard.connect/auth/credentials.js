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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9jcmVkZW50aWFscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7UUFZYSxXQUFXOzs7Ozs7O0FBQVgsdUJBQVc7QUFFVCx5QkFGRixXQUFXLEdBRU47MENBRkwsV0FBVzs7QUFPaEIsd0JBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLHdCQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQzs7QUFHMUIsd0JBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDOztBQUVqQix3QkFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRWpCLHdCQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztBQUNyQix3QkFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDckIsd0JBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ25CLHdCQUFJLENBQUMsVUFBVSxHQUFHLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDO2lCQUVsQzs7QUFwQlEsMkJBQVcsV0FzQnBCLE9BQU8sR0FBQSxtQkFBRztBQUNOLDJCQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQztpQkFDL0M7O3VCQXhCUSxXQUFXOzs7OztBQTRCeEIsdUJBQVcsQ0FBQyxNQUFNLEdBQUcsVUFBQyxXQUFXLEVBQUs7O0FBRWxDLG9CQUFJLEVBQUUsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQzNCLHVCQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2FBRXpDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9hdXRoL2NyZWRlbnRpYWxzLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==