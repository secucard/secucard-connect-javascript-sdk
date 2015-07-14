System.register(["babel-runtime/helpers/class-call-check"], function (_export) {
	var _classCallCheck, Channel;

	return {
		setters: [function (_babelRuntimeHelpersClassCallCheck) {
			_classCallCheck = _babelRuntimeHelpersClassCallCheck["default"];
		}],
		execute: function () {
			"use strict";

			Channel = (function () {
				function Channel() {
					_classCallCheck(this, Channel);
				}

				Channel.prototype.send = function send() {};

				Channel.prototype.request = function request(method, params) {};

				return Channel;
			})();

			_export("Channel", Channel);

			Channel.METHOD = {
				GET: "GET",
				CREATE: "CREATE",
				UPDATE: "UPDATE",
				DELETE: "DELETE",
				EXECUTE: "EXECUTE"
			};
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L2NoYW5uZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtzQkFBYSxPQUFPOzs7Ozs7Ozs7QUFBUCxVQUFPO0FBRVIsYUFGQyxPQUFPLEdBRUw7MkJBRkYsT0FBTztLQUlsQjs7QUFKVyxXQUFPLFdBTW5CLElBQUksR0FBQSxnQkFBRyxFQUVOOztBQVJXLFdBQU8sV0FVbkIsT0FBTyxHQUFBLGlCQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFJdkI7O1dBZFcsT0FBTzs7O3NCQUFQLE9BQU87O0FBa0JwQixVQUFPLENBQUMsTUFBTSxHQUFHO0FBQ2hCLE9BQUcsRUFBRSxLQUFLO0FBQ1YsVUFBTSxFQUFFLFFBQVE7QUFDaEIsVUFBTSxFQUFFLFFBQVE7QUFDaEIsVUFBTSxFQUFDLFFBQVE7QUFDZixXQUFPLEVBQUUsU0FBUztJQUNsQixDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L2NoYW5uZWwuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9