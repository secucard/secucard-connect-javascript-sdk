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
				GET: 'GET',
				CREATE: 'CREATE',
				UPDATE: 'UPDATE',
				DELETE: 'DELETE',
				EXECUTE: 'EXECUTE'
			};
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L2NoYW5uZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0tBV2EsT0FBTzs7Ozs7OztBQUFQLFVBQU87QUFFUixhQUZDLE9BQU8sR0FFTDsyQkFGRixPQUFPO0tBSWxCOztBQUpXLFdBQU8sV0FNbkIsSUFBSSxHQUFBLGdCQUFHLEVBRU47O0FBUlcsV0FBTyxXQVVuQixPQUFPLEdBQUEsaUJBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUl2Qjs7V0FkVyxPQUFPOzs7c0JBQVAsT0FBTzs7QUFrQnBCLFVBQU8sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO0FBQ3RCLFVBQU8sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDOztBQUV4QixVQUFPLENBQUMsTUFBTSxHQUFHO0FBQ2hCLE9BQUcsRUFBRSxLQUFLO0FBQ1YsVUFBTSxFQUFFLFFBQVE7QUFDaEIsVUFBTSxFQUFFLFFBQVE7QUFDaEIsVUFBTSxFQUFDLFFBQVE7QUFDZixXQUFPLEVBQUUsU0FBUztJQUNsQixDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L2NoYW5uZWwuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9