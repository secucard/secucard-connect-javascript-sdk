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

				return Message;
			})();

			_export('Message', Message);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L21lc3NhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0tBV2EsSUFBSSxFQUNKLEdBQUcsRUFDSCxJQUFJLEVBQ0osR0FBRyxFQUNILE1BQU0sRUFFTixPQUFPOzs7Ozs7O0FBTlAsT0FBSSxHQUFHLE1BQU07O21CQUFiLElBQUk7O0FBQ0osTUFBRyxHQUFHLEtBQUs7O2tCQUFYLEdBQUc7O0FBQ0gsT0FBSSxHQUFHLE1BQU07O21CQUFiLElBQUk7O0FBQ0osTUFBRyxHQUFHLEtBQUs7O2tCQUFYLEdBQUc7O0FBQ0gsU0FBTSxHQUFHLFFBQVE7O3FCQUFqQixNQUFNOztBQUVOLFVBQU87QUFFUixhQUZDLE9BQU8sR0FFTDsyQkFGRixPQUFPO0tBSWxCOztBQUpXLFdBQU8sV0FXbkIsVUFBVSxHQUFBLG9CQUFDLEtBQUssRUFBRTtBQUNqQixTQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztBQUNyQixZQUFPLElBQUksQ0FBQztLQUNaOztBQWRXLFdBQU8sV0FxQm5CLE1BQU0sR0FBQSxnQkFBQyxLQUFLLEVBQUU7QUFDYixTQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQztBQUNqQixZQUFPLElBQUksQ0FBQztLQUNaOztBQXhCVyxXQUFPLFdBK0JuQixTQUFTLEdBQUEsbUJBQUMsS0FBSyxFQUFFO0FBQ2hCLFNBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBQ3BCLFlBQU8sSUFBSSxDQUFDO0tBQ1o7O0FBbENXLFdBQU8sV0F5Q25CLFVBQVUsR0FBQSxvQkFBQyxLQUFLLEVBQUU7QUFDakIsU0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFDckIsWUFBTyxJQUFJLENBQUM7S0FDWjs7QUE1Q1csV0FBTyxXQW1EbkIsUUFBUSxHQUFBLGtCQUFDLEtBQUssRUFBRTtBQUNmLFNBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFlBQU8sSUFBSSxDQUFDO0tBQ1o7O0FBdERXLFdBQU8sV0E2RG5CLE9BQU8sR0FBQSxpQkFBQyxLQUFLLEVBQUU7QUFDZCxTQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztBQUNsQixZQUFPLElBQUksQ0FBQztLQUNaOztBQWhFVyxXQUFPLFdBdUVuQixTQUFTLEdBQUEsbUJBQUMsS0FBSyxFQUFFO0FBQ2hCLFNBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBQ3BCLFlBQU8sSUFBSSxDQUFDO0tBQ1o7O1dBMUVXLE9BQU87OztzQkFBUCxPQUFPIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L21lc3NhZ2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9