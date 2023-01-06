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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L21lc3NhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O01BV2EsSUFBSSxFQUNKLEdBQUcsRUFDSCxJQUFJLEVBQ0osR0FBRyxFQUNILEtBQUssRUFDTCxNQUFNLEVBRU4sT0FBTzs7Ozs7OztBQVBQLFVBQUksR0FBRyxNQUFNOzs7O0FBQ2IsU0FBRyxHQUFHLEtBQUs7Ozs7QUFDWCxVQUFJLEdBQUcsTUFBTTs7OztBQUNiLFNBQUcsR0FBRyxLQUFLOzs7O0FBQ1gsV0FBSyxHQUFHLE9BQU87Ozs7QUFDZixZQUFNLEdBQUcsUUFBUTs7OztBQUVqQixhQUFPO0FBRUwsaUJBRkYsT0FBTyxHQUVGO2dDQUZMLE9BQU87U0FJZjs7QUFKUSxlQUFPLFdBV2hCLFVBQVUsR0FBQSxvQkFBQyxLQUFLLEVBQUU7QUFDZCxjQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztBQUNyQixpQkFBTyxJQUFJLENBQUM7U0FDZjs7QUFkUSxlQUFPLFdBcUJoQixNQUFNLEdBQUEsZ0JBQUMsS0FBSyxFQUFFO0FBQ1YsY0FBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7QUFDakIsaUJBQU8sSUFBSSxDQUFDO1NBQ2Y7O0FBeEJRLGVBQU8sV0ErQmhCLFNBQVMsR0FBQSxtQkFBQyxLQUFLLEVBQUU7QUFDYixjQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztBQUNwQixpQkFBTyxJQUFJLENBQUM7U0FDZjs7QUFsQ1EsZUFBTyxXQXlDaEIsVUFBVSxHQUFBLG9CQUFDLEtBQUssRUFBRTtBQUNkLGNBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0FBQ3JCLGlCQUFPLElBQUksQ0FBQztTQUNmOztBQTVDUSxlQUFPLFdBbURoQixRQUFRLEdBQUEsa0JBQUMsS0FBSyxFQUFFO0FBQ1osY0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkIsaUJBQU8sSUFBSSxDQUFDO1NBQ2Y7O0FBdERRLGVBQU8sV0E2RGhCLE9BQU8sR0FBQSxpQkFBQyxLQUFLLEVBQUU7QUFDWCxjQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztBQUNsQixpQkFBTyxJQUFJLENBQUM7U0FDZjs7QUFoRVEsZUFBTyxXQXVFaEIsU0FBUyxHQUFBLG1CQUFDLEtBQUssRUFBRTtBQUNiLGNBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBQ3BCLGlCQUFPLElBQUksQ0FBQztTQUNmOztBQTFFUSxlQUFPLFdBa0ZoQixZQUFZLEdBQUEsc0JBQUMsS0FBSyxFQUFFO0FBQ2hCLGNBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1NBQzFCOztlQXBGUSxPQUFPIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L21lc3NhZ2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
