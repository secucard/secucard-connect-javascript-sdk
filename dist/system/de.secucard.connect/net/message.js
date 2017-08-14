System.register([], function (_export) {
    'use strict';

    var HEAD, GET, POST, PUT, DELETE, Message;

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L21lc3NhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O1FBV2EsSUFBSSxFQUNKLEdBQUcsRUFDSCxJQUFJLEVBQ0osR0FBRyxFQUNILE1BQU0sRUFFTixPQUFPOzs7Ozs7O0FBTlAsZ0JBQUksR0FBRyxNQUFNOzs7O0FBQ2IsZUFBRyxHQUFHLEtBQUs7Ozs7QUFDWCxnQkFBSSxHQUFHLE1BQU07Ozs7QUFDYixlQUFHLEdBQUcsS0FBSzs7OztBQUNYLGtCQUFNLEdBQUcsUUFBUTs7OztBQUVqQixtQkFBTztBQUVMLHlCQUZGLE9BQU8sR0FFRjswQ0FGTCxPQUFPO2lCQUlmOztBQUpRLHVCQUFPLFdBV2hCLFVBQVUsR0FBQSxvQkFBQyxLQUFLLEVBQUU7QUFDZCx3QkFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFDckIsMkJBQU8sSUFBSSxDQUFDO2lCQUNmOztBQWRRLHVCQUFPLFdBcUJoQixNQUFNLEdBQUEsZ0JBQUMsS0FBSyxFQUFFO0FBQ1Ysd0JBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO0FBQ2pCLDJCQUFPLElBQUksQ0FBQztpQkFDZjs7QUF4QlEsdUJBQU8sV0ErQmhCLFNBQVMsR0FBQSxtQkFBQyxLQUFLLEVBQUU7QUFDYix3QkFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDcEIsMkJBQU8sSUFBSSxDQUFDO2lCQUNmOztBQWxDUSx1QkFBTyxXQXlDaEIsVUFBVSxHQUFBLG9CQUFDLEtBQUssRUFBRTtBQUNkLHdCQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztBQUNyQiwyQkFBTyxJQUFJLENBQUM7aUJBQ2Y7O0FBNUNRLHVCQUFPLFdBbURoQixRQUFRLEdBQUEsa0JBQUMsS0FBSyxFQUFFO0FBQ1osd0JBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLDJCQUFPLElBQUksQ0FBQztpQkFDZjs7QUF0RFEsdUJBQU8sV0E2RGhCLE9BQU8sR0FBQSxpQkFBQyxLQUFLLEVBQUU7QUFDWCx3QkFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7QUFDbEIsMkJBQU8sSUFBSSxDQUFDO2lCQUNmOztBQWhFUSx1QkFBTyxXQXVFaEIsU0FBUyxHQUFBLG1CQUFDLEtBQUssRUFBRTtBQUNiLHdCQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztBQUNwQiwyQkFBTyxJQUFJLENBQUM7aUJBQ2Y7O0FBMUVRLHVCQUFPLFdBa0ZoQixZQUFZLEdBQUEsc0JBQUMsS0FBSyxFQUFFO0FBQ2hCLHdCQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztpQkFDMUI7O3VCQXBGUSxPQUFPIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L21lc3NhZ2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
