System.register([], function (_export) {
    'use strict';

    var AuthenticationFailedException, AuthenticationTimeoutException;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [],
        execute: function () {
            AuthenticationFailedException = function AuthenticationFailedException() {
                var message = arguments.length <= 0 || arguments[0] === undefined ? 'Authentication failed' : arguments[0];

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
                var message = arguments.length <= 0 || arguments[0] === undefined ? 'Authentication timeout' : arguments[0];

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9leGNlcHRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O1FBV2EsNkJBQTZCLEVBNkI3Qiw4QkFBOEI7Ozs7Ozs7QUE3QjlCLHlDQUE2QixHQUUzQixTQUZGLDZCQUE2QixHQUVTO29CQUFuQyxPQUFPLHlEQUFHLHVCQUF1Qjs7c0NBRnBDLDZCQUE2Qjs7QUFJbEMsb0JBQUksS0FBSyxDQUFDLGlCQUFpQixFQUFFO0FBQ3pCLHlCQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztpQkFDbkQsTUFBTTtBQUNILDBCQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDakMsb0NBQVksRUFBRSxJQUFJO0FBQ2xCLGtDQUFVLEVBQUUsS0FBSztBQUNqQiw2QkFBSyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLO3FCQUM5QixDQUFDLENBQUM7aUJBQ047O0FBRUQsc0JBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtBQUNuQyxnQ0FBWSxFQUFFLElBQUk7QUFDbEIsOEJBQVUsRUFBRSxLQUFLO0FBQ2pCLHlCQUFLLEVBQUUsT0FBTztpQkFDakIsQ0FBQyxDQUFDOztBQUVILHNCQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUU7QUFDaEMsZ0NBQVksRUFBRSxJQUFJO0FBQ2xCLDhCQUFVLEVBQUUsS0FBSztBQUNqQix5QkFBSyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTtpQkFDL0IsQ0FBQyxDQUFDO2FBRU47Ozs7QUFHUSwwQ0FBOEIsR0FFNUIsU0FGRiw4QkFBOEIsR0FFUztvQkFBcEMsT0FBTyx5REFBRyx3QkFBd0I7O3NDQUZyQyw4QkFBOEI7O0FBSW5DLG9CQUFJLEtBQUssQ0FBQyxpQkFBaUIsRUFBRTtBQUN6Qix5QkFBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ25ELE1BQU07QUFDSCwwQkFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ2pDLG9DQUFZLEVBQUUsSUFBSTtBQUNsQixrQ0FBVSxFQUFFLEtBQUs7QUFDakIsNkJBQUssRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSztxQkFDOUIsQ0FBQyxDQUFDO2lCQUNOOztBQUVELHNCQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7QUFDbkMsZ0NBQVksRUFBRSxJQUFJO0FBQ2xCLDhCQUFVLEVBQUUsS0FBSztBQUNqQix5QkFBSyxFQUFFLE9BQU87aUJBQ2pCLENBQUMsQ0FBQzs7QUFFSCxzQkFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFO0FBQ2hDLGdDQUFZLEVBQUUsSUFBSTtBQUNsQiw4QkFBVSxFQUFFLEtBQUs7QUFDakIseUJBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7aUJBQy9CLENBQUMsQ0FBQzthQUVOIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9leGNlcHRpb24uanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9