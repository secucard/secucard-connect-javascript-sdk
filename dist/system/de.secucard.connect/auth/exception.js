System.register([], function (_export) {
	'use strict';

	var AuthenticationFailedException;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [],
		execute: function () {
			AuthenticationFailedException = function AuthenticationFailedException() {
				var message = arguments[0] === undefined ? 'Authentication failed' : arguments[0];

				_classCallCheck(this, AuthenticationFailedException);

				if (Error.captureStackTrace) {
					Error.captureStackTrace(this, this.constructor);
				} else {
					Object.defineProperty(this, 'stack', {
						configurable: true,
						enumerable: false,
						value: Error(message).stack
					});
				}

				Object.defineProperty(this, 'message', {
					configurable: true,
					enumerable: false,
					value: message
				});

				Object.defineProperty(this, 'name', {
					configurable: true,
					enumerable: false,
					value: this.constructor.name
				});
			};

			_export('AuthenticationFailedException', AuthenticationFailedException);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9leGNlcHRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0tBQWEsNkJBQTZCOzs7Ozs7O0FBQTdCLGdDQUE2QixHQUU5QixTQUZDLDZCQUE2QixHQUVNO1FBQW5DLE9BQU8sZ0NBQUcsdUJBQXVCOzswQkFGakMsNkJBQTZCOztBQUl4QyxRQUFJLEtBQUssQ0FBQyxpQkFBaUIsRUFBRTtBQUM1QixVQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUNoRCxNQUFNO0FBQ04sV0FBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ25DLGtCQUFZLEVBQUUsSUFBSTtBQUNsQixnQkFBVSxFQUFFLEtBQUs7QUFDakIsV0FBSyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLO01BQzNCLENBQUMsQ0FBQztLQUNKOztBQUVELFVBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtBQUN0QyxpQkFBWSxFQUFFLElBQUk7QUFDbEIsZUFBVSxFQUFFLEtBQUs7QUFDakIsVUFBSyxFQUFFLE9BQU87S0FDZCxDQUFDLENBQUM7O0FBRUgsVUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFO0FBQ25DLGlCQUFZLEVBQUUsSUFBSTtBQUNsQixlQUFVLEVBQUUsS0FBSztBQUNqQixVQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJO0tBQzVCLENBQUMsQ0FBQztJQUVIOzs0Q0ExQlcsNkJBQTZCIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9leGNlcHRpb24uanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9