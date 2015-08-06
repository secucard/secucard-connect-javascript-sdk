System.register([], function (_export) {
	'use strict';

	var AuthenticationFailedException, AuthenticationTimeoutException;

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

			AuthenticationTimeoutException = function AuthenticationTimeoutException() {
				var message = arguments[0] === undefined ? 'Authentication timeout' : arguments[0];

				_classCallCheck(this, AuthenticationTimeoutException);

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

			_export('AuthenticationTimeoutException', AuthenticationTimeoutException);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9leGNlcHRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0tBV2EsNkJBQTZCLEVBNkI3Qiw4QkFBOEI7Ozs7Ozs7QUE3QjlCLGdDQUE2QixHQUU5QixTQUZDLDZCQUE2QixHQUVNO1FBQW5DLE9BQU8sZ0NBQUcsdUJBQXVCOzswQkFGakMsNkJBQTZCOztBQUl4QyxRQUFJLEtBQUssQ0FBQyxpQkFBaUIsRUFBRTtBQUM1QixVQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUNoRCxNQUFNO0FBQ04sV0FBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ25DLGtCQUFZLEVBQUUsSUFBSTtBQUNsQixnQkFBVSxFQUFFLEtBQUs7QUFDakIsV0FBSyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLO01BQzNCLENBQUMsQ0FBQztLQUNKOztBQUVELFVBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtBQUN0QyxpQkFBWSxFQUFFLElBQUk7QUFDbEIsZUFBVSxFQUFFLEtBQUs7QUFDakIsVUFBSyxFQUFFLE9BQU87S0FDZCxDQUFDLENBQUM7O0FBRUgsVUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFO0FBQ25DLGlCQUFZLEVBQUUsSUFBSTtBQUNsQixlQUFVLEVBQUUsS0FBSztBQUNqQixVQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJO0tBQzVCLENBQUMsQ0FBQztJQUVIOzs0Q0ExQlcsNkJBQTZCOztBQTZCN0IsaUNBQThCLEdBRS9CLFNBRkMsOEJBQThCLEdBRU07UUFBcEMsT0FBTyxnQ0FBRyx3QkFBd0I7OzBCQUZsQyw4QkFBOEI7O0FBSXpDLFFBQUksS0FBSyxDQUFDLGlCQUFpQixFQUFFO0FBQzVCLFVBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ2hELE1BQU07QUFDTixXQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDbkMsa0JBQVksRUFBRSxJQUFJO0FBQ2xCLGdCQUFVLEVBQUUsS0FBSztBQUNqQixXQUFLLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUs7TUFDM0IsQ0FBQyxDQUFDO0tBQ0o7O0FBRUQsVUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO0FBQ3RDLGlCQUFZLEVBQUUsSUFBSTtBQUNsQixlQUFVLEVBQUUsS0FBSztBQUNqQixVQUFLLEVBQUUsT0FBTztLQUNkLENBQUMsQ0FBQzs7QUFFSCxVQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUU7QUFDbkMsaUJBQVksRUFBRSxJQUFJO0FBQ2xCLGVBQVUsRUFBRSxLQUFLO0FBQ2pCLFVBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7S0FDNUIsQ0FBQyxDQUFDO0lBRUg7OzZDQTFCVyw4QkFBOEIiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9hdXRoL2V4Y2VwdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=