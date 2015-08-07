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
						value: Error(data.error_details).stack
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L2V4Y2VwdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7b0NBYWEsd0JBQXdCOzs7Ozs7a0RBRjdCLDZCQUE2Qjs7O0FBRXhCLDJCQUF3QixHQUN6QixTQURDLHdCQUF3QixDQUN4QixJQUFJLEVBQUU7MEJBRE4sd0JBQXdCOztBQUduQyxRQUFJLEtBQUssQ0FBQyxpQkFBaUIsRUFBRTtBQUM1QixVQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUNoRCxNQUFNO0FBQ04sV0FBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ25DLGtCQUFZLEVBQUUsSUFBSTtBQUNsQixnQkFBVSxFQUFFLEtBQUs7QUFDakIsV0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSztNQUN0QyxDQUFDLENBQUM7S0FDSjs7QUFFRCxVQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7QUFDdEMsaUJBQVksRUFBRSxJQUFJO0FBQ2xCLGVBQVUsRUFBRSxLQUFLO0FBQ2pCLFVBQUssRUFBRSxJQUFJLENBQUMsYUFBYTtLQUN6QixDQUFDLENBQUM7O0FBRUgsVUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFO0FBQ25DLGlCQUFZLEVBQUUsSUFBSTtBQUNsQixlQUFVLEVBQUUsS0FBSztBQUNqQixVQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJO0tBQzVCLENBQUMsQ0FBQzs7QUFFSCxVQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDckMsaUJBQVksRUFBRSxJQUFJO0FBQ2xCLGVBQVUsRUFBRSxLQUFLO0FBQ2pCLFVBQUssRUFBRSxJQUFJLENBQUMsTUFBTTtLQUNsQixDQUFDLENBQUM7O0FBRUgsVUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ3BDLGlCQUFZLEVBQUUsSUFBSTtBQUNsQixlQUFVLEVBQUUsS0FBSztBQUNqQixVQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7S0FDakIsQ0FBQyxDQUFDOztBQUVILFVBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtBQUM1QyxpQkFBWSxFQUFFLElBQUk7QUFDbEIsZUFBVSxFQUFFLEtBQUs7QUFDakIsVUFBSyxFQUFFLElBQUksQ0FBQyxhQUFhO0tBQ3pCLENBQUMsQ0FBQzs7QUFHSCxVQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7QUFDekMsaUJBQVksRUFBRSxJQUFJO0FBQ2xCLGVBQVUsRUFBRSxLQUFLO0FBQ2pCLFVBQUssRUFBRSxJQUFJLENBQUMsVUFBVTtLQUN0QixDQUFDLENBQUM7O0FBRUgsVUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFO0FBQ25DLGlCQUFZLEVBQUUsSUFBSTtBQUNsQixlQUFVLEVBQUUsS0FBSztBQUNqQixVQUFLLEVBQUUsSUFBSSxDQUFDLElBQUk7S0FDaEIsQ0FBQyxDQUFDOztBQUVILFVBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRTtBQUN4QyxpQkFBWSxFQUFFLElBQUk7QUFDbEIsZUFBVSxFQUFFLEtBQUs7QUFDakIsVUFBSyxFQUFFLElBQUksQ0FBQyxTQUFTO0tBQ3JCLENBQUMsQ0FBQztJQUVIOzt1Q0E5RFcsd0JBQXdCOztBQWlFckMsMkJBQXdCLENBQUMsTUFBTSxHQUFHLFVBQUMsSUFBSSxFQUFLOztBQUUzQyxRQUFJLEtBQUssWUFBQSxDQUFDOztBQUVWLFFBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSwwQkFBMEIsRUFBRTtBQUM1QyxVQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLDZCQUE2QixFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDakUsTUFBTTtBQUNOLFVBQUssR0FBRyxJQUFJLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzNDOztBQUVELFdBQU8sS0FBSyxDQUFDO0lBQ2IsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L25ldC9leGNlcHRpb24uanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9