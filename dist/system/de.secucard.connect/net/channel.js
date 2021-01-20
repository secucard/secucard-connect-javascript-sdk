System.register([], function (_export) {
    'use strict';

    var Channel;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [],
        execute: function () {
            Channel = (function () {
                function Channel() {
                    _classCallCheck(this, Channel);
                }

                Channel.prototype.send = function send() {};

                Channel.prototype.request = function request(method, params) {};

                return Channel;
            })();

            _export('Channel', Channel);

            Channel.REST = 'rest';
            Channel.STOMP = 'stomp';

            Channel.METHOD = {
                GET: "GET",
                CREATE: "CREATE",
                UPDATE: "UPDATE",
                PATCH: "PATCH",
                DELETE: "DELETE",
                EXECUTE: "EXECUTE"
            };
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L2NoYW5uZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O1FBV2EsT0FBTzs7Ozs7OztBQUFQLG1CQUFPO0FBRUwseUJBRkYsT0FBTyxHQUVGOzBDQUZMLE9BQU87aUJBSWY7O0FBSlEsdUJBQU8sV0FNaEIsSUFBSSxHQUFBLGdCQUFHLEVBRU47O0FBUlEsdUJBQU8sV0FVaEIsT0FBTyxHQUFBLGlCQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFHdkI7O3VCQWJRLE9BQU87Ozs7O0FBaUJwQixtQkFBTyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7QUFDdEIsbUJBQU8sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDOztBQUV4QixtQkFBTyxDQUFDLE1BQU0sR0FBRztBQUNiLG1CQUFHLEVBQUUsS0FBSztBQUNWLHNCQUFNLEVBQUUsUUFBUTtBQUNoQixzQkFBTSxFQUFFLFFBQVE7QUFDaEIscUJBQUssRUFBRSxPQUFPO0FBQ2Qsc0JBQU0sRUFBRSxRQUFRO0FBQ2hCLHVCQUFPLEVBQUUsU0FBUzthQUNyQixDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L2NoYW5uZWwuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
