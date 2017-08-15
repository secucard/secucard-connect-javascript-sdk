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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L2V4Y2VwdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7dUNBYWEsd0JBQXdCOzs7Ozs7MkRBRjdCLDZCQUE2Qjs7O0FBRXhCLG9DQUF3QixHQUN0QixTQURGLHdCQUF3QixDQUNyQixJQUFJLEVBQUU7c0NBRFQsd0JBQXdCOztBQUc3QixvQkFBSSxLQUFLLENBQUMsaUJBQWlCLEVBQUU7QUFDekIseUJBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUNuRCxNQUFNO0FBQ0gsMEJBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUNqQyxvQ0FBWSxFQUFFLElBQUk7QUFDbEIsa0NBQVUsRUFBRSxLQUFLO0FBQ2pCLDZCQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLO3FCQUN6QyxDQUFDLENBQUM7aUJBQ047O0FBRUQsc0JBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtBQUNuQyxnQ0FBWSxFQUFFLElBQUk7QUFDbEIsOEJBQVUsRUFBRSxLQUFLO0FBQ2pCLHlCQUFLLEVBQUUsSUFBSSxDQUFDLGFBQWE7aUJBQzVCLENBQUMsQ0FBQzs7QUFFSCxzQkFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFO0FBQ2hDLGdDQUFZLEVBQUUsSUFBSTtBQUNsQiw4QkFBVSxFQUFFLEtBQUs7QUFDakIseUJBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7aUJBQy9CLENBQUMsQ0FBQzs7QUFFSCxzQkFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO0FBQ2xDLGdDQUFZLEVBQUUsSUFBSTtBQUNsQiw4QkFBVSxFQUFFLEtBQUs7QUFDakIseUJBQUssRUFBRSxJQUFJLENBQUMsTUFBTTtpQkFDckIsQ0FBQyxDQUFDOztBQUVILHNCQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDakMsZ0NBQVksRUFBRSxJQUFJO0FBQ2xCLDhCQUFVLEVBQUUsS0FBSztBQUNqQix5QkFBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2lCQUNwQixDQUFDLENBQUM7O0FBRUgsc0JBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtBQUN6QyxnQ0FBWSxFQUFFLElBQUk7QUFDbEIsOEJBQVUsRUFBRSxLQUFLO0FBQ2pCLHlCQUFLLEVBQUUsSUFBSSxDQUFDLGFBQWE7aUJBQzVCLENBQUMsQ0FBQzs7QUFHSCxzQkFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO0FBQ3RDLGdDQUFZLEVBQUUsSUFBSTtBQUNsQiw4QkFBVSxFQUFFLEtBQUs7QUFDakIseUJBQUssRUFBRSxJQUFJLENBQUMsVUFBVTtpQkFDekIsQ0FBQyxDQUFDOztBQUVILHNCQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUU7QUFDaEMsZ0NBQVksRUFBRSxJQUFJO0FBQ2xCLDhCQUFVLEVBQUUsS0FBSztBQUNqQix5QkFBSyxFQUFFLElBQUksQ0FBQyxJQUFJO2lCQUNuQixDQUFDLENBQUM7O0FBRUgsc0JBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRTtBQUNyQyxnQ0FBWSxFQUFFLElBQUk7QUFDbEIsOEJBQVUsRUFBRSxLQUFLO0FBQ2pCLHlCQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVM7aUJBQ3hCLENBQUMsQ0FBQzthQUVOOzs7O0FBR0wsb0NBQXdCLENBQUMsTUFBTSxHQUFHLFVBQUMsSUFBSSxFQUFLOztBQUV4QyxvQkFBSSxLQUFLLFlBQUEsQ0FBQzs7QUFFVixvQkFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLDBCQUEwQixFQUFFO0FBQzFDLHlCQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLDZCQUE2QixFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ3BFLE1BQU07QUFDSCx5QkFBSyxHQUFHLElBQUksd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzlDOztBQUVELHVCQUFPLEtBQUssQ0FBQzthQUNoQixDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L2V4Y2VwdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
