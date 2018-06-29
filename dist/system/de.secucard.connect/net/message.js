'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HEAD = exports.HEAD = 'HEAD';
var GET = exports.GET = 'GET';
var POST = exports.POST = 'POST';
var PUT = exports.PUT = 'PUT';
var DELETE = exports.DELETE = 'DELETE';

var Message = exports.Message = function () {
  function Message() {
    _classCallCheck(this, Message);
  }

  _createClass(Message, [{
    key: 'setBaseUrl',
    value: function setBaseUrl(value) {
      this.baseUrl = value;
      return this;
    }
  }, {
    key: 'setUrl',
    value: function setUrl(value) {
      this.url = value;
      return this;
    }
  }, {
    key: 'setMethod',
    value: function setMethod(value) {
      this.method = value;
      return this;
    }
  }, {
    key: 'setHeaders',
    value: function setHeaders(value) {
      this.headers = value;
      return this;
    }
  }, {
    key: 'setQuery',
    value: function setQuery(value) {
      this.query = value;
      return this;
    }
  }, {
    key: 'setBody',
    value: function setBody(value) {
      this.body = value;
      return this;
    }
  }, {
    key: 'setAccept',
    value: function setAccept(value) {
      this.accept = value;
      return this;
    }
  }, {
    key: 'setMultipart',
    value: function setMultipart(value) {
      this.multipart = value;
    }
  }]);

  return Message;
}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L21lc3NhZ2UuanMiXSwibmFtZXMiOlsiSEVBRCIsIkdFVCIsIlBPU1QiLCJQVVQiLCJERUxFVEUiLCJNZXNzYWdlIiwidmFsdWUiLCJiYXNlVXJsIiwidXJsIiwibWV0aG9kIiwiaGVhZGVycyIsInF1ZXJ5IiwiYm9keSIsImFjY2VwdCIsIm11bHRpcGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQVdPLElBQU1BLHNCQUFPLE1BQWI7QUFDQSxJQUFNQyxvQkFBTSxLQUFaO0FBQ0EsSUFBTUMsc0JBQU8sTUFBYjtBQUNBLElBQU1DLG9CQUFNLEtBQVo7QUFDQSxJQUFNQywwQkFBUyxRQUFmOztJQUVNQyxPLFdBQUFBLE87QUFFVCxxQkFBYztBQUFBO0FBRWI7Ozs7K0JBT1VDLEssRUFBTztBQUNkLFdBQUtDLE9BQUwsR0FBZUQsS0FBZjtBQUNBLGFBQU8sSUFBUDtBQUNIOzs7MkJBT01BLEssRUFBTztBQUNWLFdBQUtFLEdBQUwsR0FBV0YsS0FBWDtBQUNBLGFBQU8sSUFBUDtBQUNIOzs7OEJBT1NBLEssRUFBTztBQUNiLFdBQUtHLE1BQUwsR0FBY0gsS0FBZDtBQUNBLGFBQU8sSUFBUDtBQUNIOzs7K0JBT1VBLEssRUFBTztBQUNkLFdBQUtJLE9BQUwsR0FBZUosS0FBZjtBQUNBLGFBQU8sSUFBUDtBQUNIOzs7NkJBT1FBLEssRUFBTztBQUNaLFdBQUtLLEtBQUwsR0FBYUwsS0FBYjtBQUNBLGFBQU8sSUFBUDtBQUNIOzs7NEJBT09BLEssRUFBTztBQUNYLFdBQUtNLElBQUwsR0FBWU4sS0FBWjtBQUNBLGFBQU8sSUFBUDtBQUNIOzs7OEJBT1NBLEssRUFBTztBQUNiLFdBQUtPLE1BQUwsR0FBY1AsS0FBZDtBQUNBLGFBQU8sSUFBUDtBQUNIOzs7aUNBUVlBLEssRUFBTztBQUNoQixXQUFLUSxTQUFMLEdBQWlCUixLQUFqQjtBQUNIIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L21lc3NhZ2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
