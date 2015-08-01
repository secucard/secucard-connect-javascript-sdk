System.register(['../auth/exception'], function (_export) {
	'use strict';

	var AuthenticationFailedException, SecucardConnectException;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [function (_authException) {
			AuthenticationFailedException = _authException.AuthenticationFailedException;
		}],
		execute: function () {
			SecucardConnectException = function SecucardConnectException(data) {
				_classCallCheck(this, SecucardConnectException);

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
					value: data.error_details
				});

				Object.defineProperty(this, 'name', {
					configurable: true,
					enumerable: false,
					value: this.constructor.name
				});

				Object.defineProperty(this, 'status', {
					configurable: true,
					enumerable: false,
					value: data.status
				});

				Object.defineProperty(this, 'error', {
					configurable: true,
					enumerable: false,
					value: data.error
				});

				Object.defineProperty(this, 'error_details', {
					configurable: true,
					enumerable: false,
					value: data.error_details
				});

				Object.defineProperty(this, 'error_user', {
					configurable: true,
					enumerable: false,
					value: data.error_user
				});

				Object.defineProperty(this, 'code', {
					configurable: true,
					enumerable: false,
					value: data.code
				});

				Object.defineProperty(this, 'supportId', {
					configurable: true,
					enumerable: false,
					value: data.supportId
				});
			};

			_export('SecucardConnectException', SecucardConnectException);

			SecucardConnectException.create = function (data) {

				var error = undefined;

				if (data.error == 'ProductSecurityException') {
					error = Object.assign(new AuthenticationFailedException(), data);
				} else {
					error = new SecucardConnectException(data);
				}

				return error;
			};
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L2V4Y2VwdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7b0NBRWEsd0JBQXdCOzs7Ozs7a0RBRjdCLDZCQUE2Qjs7O0FBRXhCLDJCQUF3QixHQUN6QixTQURDLHdCQUF3QixDQUN4QixJQUFJLEVBQUU7MEJBRE4sd0JBQXdCOztBQUduQyxRQUFJLEtBQUssQ0FBQyxpQkFBaUIsRUFBRTtBQUM1QixVQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUNoRCxNQUFNO0FBQ04sV0FBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ25DLGtCQUFZLEVBQUUsSUFBSTtBQUNsQixnQkFBVSxFQUFFLEtBQUs7QUFDakIsV0FBSyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLO01BQzNCLENBQUMsQ0FBQztLQUNKOztBQUVELFVBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtBQUN0QyxpQkFBWSxFQUFFLElBQUk7QUFDbEIsZUFBVSxFQUFFLEtBQUs7QUFDakIsVUFBSyxFQUFFLElBQUksQ0FBQyxhQUFhO0tBQ3pCLENBQUMsQ0FBQzs7QUFFSCxVQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUU7QUFDbkMsaUJBQVksRUFBRSxJQUFJO0FBQ2xCLGVBQVUsRUFBRSxLQUFLO0FBQ2pCLFVBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7S0FDNUIsQ0FBQyxDQUFDOztBQUVILFVBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUNyQyxpQkFBWSxFQUFFLElBQUk7QUFDbEIsZUFBVSxFQUFFLEtBQUs7QUFDakIsVUFBSyxFQUFFLElBQUksQ0FBQyxNQUFNO0tBQ2xCLENBQUMsQ0FBQzs7QUFFSCxVQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDcEMsaUJBQVksRUFBRSxJQUFJO0FBQ2xCLGVBQVUsRUFBRSxLQUFLO0FBQ2pCLFVBQUssRUFBRSxJQUFJLENBQUMsS0FBSztLQUNqQixDQUFDLENBQUM7O0FBRUgsVUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFO0FBQzVDLGlCQUFZLEVBQUUsSUFBSTtBQUNsQixlQUFVLEVBQUUsS0FBSztBQUNqQixVQUFLLEVBQUUsSUFBSSxDQUFDLGFBQWE7S0FDekIsQ0FBQyxDQUFDOztBQUdILFVBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtBQUN6QyxpQkFBWSxFQUFFLElBQUk7QUFDbEIsZUFBVSxFQUFFLEtBQUs7QUFDakIsVUFBSyxFQUFFLElBQUksQ0FBQyxVQUFVO0tBQ3RCLENBQUMsQ0FBQzs7QUFFSCxVQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUU7QUFDbkMsaUJBQVksRUFBRSxJQUFJO0FBQ2xCLGVBQVUsRUFBRSxLQUFLO0FBQ2pCLFVBQUssRUFBRSxJQUFJLENBQUMsSUFBSTtLQUNoQixDQUFDLENBQUM7O0FBRUgsVUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFO0FBQ3hDLGlCQUFZLEVBQUUsSUFBSTtBQUNsQixlQUFVLEVBQUUsS0FBSztBQUNqQixVQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVM7S0FDckIsQ0FBQyxDQUFDO0lBRUg7O3VDQTlEVyx3QkFBd0I7O0FBaUVyQywyQkFBd0IsQ0FBQyxNQUFNLEdBQUcsVUFBQyxJQUFJLEVBQUs7O0FBRTNDLFFBQUksS0FBSyxZQUFBLENBQUM7O0FBRVYsUUFBRyxJQUFJLENBQUMsS0FBSyxJQUFJLDBCQUEwQixFQUFFO0FBQzVDLFVBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksNkJBQTZCLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNqRSxNQUFNO0FBQ04sVUFBSyxHQUFHLElBQUksd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDM0M7O0FBRUQsV0FBTyxLQUFLLENBQUM7SUFDYixDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L2V4Y2VwdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=