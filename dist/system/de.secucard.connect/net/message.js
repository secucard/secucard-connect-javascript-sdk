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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L21lc3NhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O01BV2EsSUFBSSxFQUNKLEdBQUcsRUFDSCxJQUFJLEVBQ0osR0FBRyxFQUNILE1BQU0sRUFFTixPQUFPOzs7Ozs7O0FBTlAsVUFBSSxHQUFHLE1BQU07O3NCQUFiLElBQUk7O0FBQ0osU0FBRyxHQUFHLEtBQUs7O3FCQUFYLEdBQUc7O0FBQ0gsVUFBSSxHQUFHLE1BQU07O3NCQUFiLElBQUk7O0FBQ0osU0FBRyxHQUFHLEtBQUs7O3FCQUFYLEdBQUc7O0FBQ0gsWUFBTSxHQUFHLFFBQVE7O3dCQUFqQixNQUFNOztBQUVOLGFBQU87QUFFTCxpQkFGRixPQUFPLEdBRUY7Z0NBRkwsT0FBTztTQUlmOztBQUpRLGVBQU8sV0FXaEIsVUFBVSxHQUFBLG9CQUFDLEtBQUssRUFBRTtBQUNkLGNBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0FBQ3JCLGlCQUFPLElBQUksQ0FBQztTQUNmOztBQWRRLGVBQU8sV0FxQmhCLE1BQU0sR0FBQSxnQkFBQyxLQUFLLEVBQUU7QUFDVixjQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQztBQUNqQixpQkFBTyxJQUFJLENBQUM7U0FDZjs7QUF4QlEsZUFBTyxXQStCaEIsU0FBUyxHQUFBLG1CQUFDLEtBQUssRUFBRTtBQUNiLGNBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBQ3BCLGlCQUFPLElBQUksQ0FBQztTQUNmOztBQWxDUSxlQUFPLFdBeUNoQixVQUFVLEdBQUEsb0JBQUMsS0FBSyxFQUFFO0FBQ2QsY0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFDckIsaUJBQU8sSUFBSSxDQUFDO1NBQ2Y7O0FBNUNRLGVBQU8sV0FtRGhCLFFBQVEsR0FBQSxrQkFBQyxLQUFLLEVBQUU7QUFDWixjQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNuQixpQkFBTyxJQUFJLENBQUM7U0FDZjs7QUF0RFEsZUFBTyxXQTZEaEIsT0FBTyxHQUFBLGlCQUFDLEtBQUssRUFBRTtBQUNYLGNBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0FBQ2xCLGlCQUFPLElBQUksQ0FBQztTQUNmOztBQWhFUSxlQUFPLFdBdUVoQixTQUFTLEdBQUEsbUJBQUMsS0FBSyxFQUFFO0FBQ2IsY0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDcEIsaUJBQU8sSUFBSSxDQUFDO1NBQ2Y7O0FBMUVRLGVBQU8sV0FrRmhCLFlBQVksR0FBQSxzQkFBQyxLQUFLLEVBQUU7QUFDaEIsY0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7U0FDMUI7O2VBcEZRLE9BQU87Ozt5QkFBUCxPQUFPIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L21lc3NhZ2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9