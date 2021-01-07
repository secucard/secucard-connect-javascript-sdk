System.register([], function (_export) {
    'use strict';

    var HEAD, GET, POST, PUT, PATCH, DELETE, Message;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [],
        execute: function () {
            HEAD = 'HEAD';

            _export('HEAD', HEAD);

            GET = 'GET';

            _export('GET', GET);

            POST = 'POST';

            _export('POST', POST);

            PUT = 'PUT';

            _export('PUT', PUT);

            PATCH = 'PATCH';

            _export('PATCH', PATCH);

            DELETE = 'DELETE';

            _export('DELETE', DELETE);

            Message = (function () {
                function Message() {
                    _classCallCheck(this, Message);
                }

                Message.prototype.setBaseUrl = function setBaseUrl(value) {
                    this.baseUrl = value;
                    return this;
                };

                Message.prototype.setUrl = function setUrl(value) {
                    this.url = value;
                    return this;
                };

                Message.prototype.setMethod = function setMethod(value) {
                    this.method = value;
                    return this;
                };

                Message.prototype.setHeaders = function setHeaders(value) {
                    this.headers = value;
                    return this;
                };

                Message.prototype.setQuery = function setQuery(value) {
                    this.query = value;
                    return this;
                };

                Message.prototype.setBody = function setBody(value) {
                    this.body = value;
                    return this;
                };

                Message.prototype.setAccept = function setAccept(value) {
                    this.accept = value;
                    return this;
                };

                Message.prototype.setMultipart = function setMultipart(value) {
                    this.multipart = value;
                };

                return Message;
            })();

            _export('Message', Message);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L21lc3NhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O1FBV2EsSUFBSSxFQUNKLEdBQUcsRUFDSCxJQUFJLEVBQ0osR0FBRyxFQUNILEtBQUssRUFDTCxNQUFNLEVBRU4sT0FBTzs7Ozs7OztBQVBQLGdCQUFJLEdBQUcsTUFBTTs7OztBQUNiLGVBQUcsR0FBRyxLQUFLOzs7O0FBQ1gsZ0JBQUksR0FBRyxNQUFNOzs7O0FBQ2IsZUFBRyxHQUFHLEtBQUs7Ozs7QUFDWCxpQkFBSyxHQUFHLE9BQU87Ozs7QUFDZixrQkFBTSxHQUFHLFFBQVE7Ozs7QUFFakIsbUJBQU87QUFFTCx5QkFGRixPQUFPLEdBRUY7MENBRkwsT0FBTztpQkFJZjs7QUFKUSx1QkFBTyxXQVdoQixVQUFVLEdBQUEsb0JBQUMsS0FBSyxFQUFFO0FBQ2Qsd0JBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0FBQ3JCLDJCQUFPLElBQUksQ0FBQztpQkFDZjs7QUFkUSx1QkFBTyxXQXFCaEIsTUFBTSxHQUFBLGdCQUFDLEtBQUssRUFBRTtBQUNWLHdCQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQztBQUNqQiwyQkFBTyxJQUFJLENBQUM7aUJBQ2Y7O0FBeEJRLHVCQUFPLFdBK0JoQixTQUFTLEdBQUEsbUJBQUMsS0FBSyxFQUFFO0FBQ2Isd0JBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBQ3BCLDJCQUFPLElBQUksQ0FBQztpQkFDZjs7QUFsQ1EsdUJBQU8sV0F5Q2hCLFVBQVUsR0FBQSxvQkFBQyxLQUFLLEVBQUU7QUFDZCx3QkFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFDckIsMkJBQU8sSUFBSSxDQUFDO2lCQUNmOztBQTVDUSx1QkFBTyxXQW1EaEIsUUFBUSxHQUFBLGtCQUFDLEtBQUssRUFBRTtBQUNaLHdCQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNuQiwyQkFBTyxJQUFJLENBQUM7aUJBQ2Y7O0FBdERRLHVCQUFPLFdBNkRoQixPQUFPLEdBQUEsaUJBQUMsS0FBSyxFQUFFO0FBQ1gsd0JBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0FBQ2xCLDJCQUFPLElBQUksQ0FBQztpQkFDZjs7QUFoRVEsdUJBQU8sV0F1RWhCLFNBQVMsR0FBQSxtQkFBQyxLQUFLLEVBQUU7QUFDYix3QkFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDcEIsMkJBQU8sSUFBSSxDQUFDO2lCQUNmOztBQTFFUSx1QkFBTyxXQWtGaEIsWUFBWSxHQUFBLHNCQUFDLEtBQUssRUFBRTtBQUNoQix3QkFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7aUJBQzFCOzt1QkFwRlEsT0FBTyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L25ldC9tZXNzYWdlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
