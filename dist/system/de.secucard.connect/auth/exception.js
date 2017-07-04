System.register([], function (_export) {
    'use strict';

    var AuthenticationFailedException, AuthenticationTimeoutException;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [],
        execute: function () {
            AuthenticationFailedException = (function (_Error) {
                function AuthenticationFailedException() {
                    var message = arguments[0] === undefined ? 'Authentication failed' : arguments[0];

                    _classCallCheck(this, AuthenticationFailedException);

                    _Error.call(this, message);

                    if (Error.captureStackTrace) {
                        Error.captureStackTrace(this, this.constructor);
                    } else {
                        Object.defineProperty(this, 'stack', {
                            configurable: true,
                            enumerable: false,
                            writable: true,
                            value: Error(message).stack
                        });
                    }

                    Object.defineProperty(this, 'message', {
                        configurable: true,
                        enumerable: false,
                        writable: true,
                        value: message
                    });

                    Object.defineProperty(this, 'name', {
                        configurable: true,
                        enumerable: false,
                        writable: true,
                        value: 'AuthenticationFailedException'
                    });
                }

                _inherits(AuthenticationFailedException, _Error);

                return AuthenticationFailedException;
            })(Error);

            _export('AuthenticationFailedException', AuthenticationFailedException);

            AuthenticationTimeoutException = (function (_Error2) {
                function AuthenticationTimeoutException() {
                    var message = arguments[0] === undefined ? 'Authentication timeout' : arguments[0];

                    _classCallCheck(this, AuthenticationTimeoutException);

                    _Error2.call(this, message);

                    if (Error.captureStackTrace) {
                        Error.captureStackTrace(this, this.constructor);
                    } else {
                        Object.defineProperty(this, 'stack', {
                            configurable: true,
                            enumerable: false,
                            writable: true,
                            value: Error(message).stack
                        });
                    }

                    Object.defineProperty(this, 'message', {
                        configurable: true,
                        enumerable: false,
                        writable: true,
                        value: message
                    });

                    Object.defineProperty(this, 'name', {
                        configurable: true,
                        enumerable: false,
                        writable: true,
                        value: 'AuthenticationTimeoutException'
                    });
                }

                _inherits(AuthenticationTimeoutException, _Error2);

                return AuthenticationTimeoutException;
            })(Error);

            _export('AuthenticationTimeoutException', AuthenticationTimeoutException);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9leGNlcHRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O1FBV2EsNkJBQTZCLEVBaUM3Qiw4QkFBOEI7Ozs7Ozs7OztBQWpDOUIseUNBQTZCO0FBRTNCLHlCQUZGLDZCQUE2QixHQUVTO3dCQUFuQyxPQUFPLGdDQUFHLHVCQUF1Qjs7MENBRnBDLDZCQUE2Qjs7QUFHbEMsc0NBQU0sT0FBTyxDQUFDLENBQUM7O0FBRWYsd0JBQUksS0FBSyxDQUFDLGlCQUFpQixFQUFFO0FBQ3pCLDZCQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztxQkFDbkQsTUFBTTtBQUNILDhCQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDakMsd0NBQVksRUFBRSxJQUFJO0FBQ2xCLHNDQUFVLEVBQUUsS0FBSztBQUNqQixvQ0FBUSxFQUFFLElBQUk7QUFDZCxpQ0FBSyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLO3lCQUM5QixDQUFDLENBQUM7cUJBQ047O0FBRUQsMEJBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtBQUNuQyxvQ0FBWSxFQUFFLElBQUk7QUFDbEIsa0NBQVUsRUFBRSxLQUFLO0FBQ2pCLGdDQUFRLEVBQUUsSUFBSTtBQUNkLDZCQUFLLEVBQUUsT0FBTztxQkFDakIsQ0FBQyxDQUFDOztBQUVILDBCQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUU7QUFDaEMsb0NBQVksRUFBRSxJQUFJO0FBQ2xCLGtDQUFVLEVBQUUsS0FBSztBQUNqQixnQ0FBUSxFQUFFLElBQUk7QUFDZCw2QkFBSyxFQUFFLCtCQUErQjtxQkFDekMsQ0FBQyxDQUFDO2lCQUVOOzswQkE5QlEsNkJBQTZCOzt1QkFBN0IsNkJBQTZCO2VBQVMsS0FBSzs7cURBQTNDLDZCQUE2Qjs7QUFpQzdCLDBDQUE4QjtBQUU1Qix5QkFGRiw4QkFBOEIsR0FFUzt3QkFBcEMsT0FBTyxnQ0FBRyx3QkFBd0I7OzBDQUZyQyw4QkFBOEI7O0FBR25DLHVDQUFNLE9BQU8sQ0FBQyxDQUFDOztBQUVmLHdCQUFJLEtBQUssQ0FBQyxpQkFBaUIsRUFBRTtBQUN6Qiw2QkFBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7cUJBQ25ELE1BQU07QUFDSCw4QkFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ2pDLHdDQUFZLEVBQUUsSUFBSTtBQUNsQixzQ0FBVSxFQUFFLEtBQUs7QUFDakIsb0NBQVEsRUFBRSxJQUFJO0FBQ2QsaUNBQUssRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSzt5QkFDOUIsQ0FBQyxDQUFDO3FCQUNOOztBQUVELDBCQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7QUFDbkMsb0NBQVksRUFBRSxJQUFJO0FBQ2xCLGtDQUFVLEVBQUUsS0FBSztBQUNqQixnQ0FBUSxFQUFFLElBQUk7QUFDZCw2QkFBSyxFQUFFLE9BQU87cUJBQ2pCLENBQUMsQ0FBQzs7QUFFSCwwQkFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFO0FBQ2hDLG9DQUFZLEVBQUUsSUFBSTtBQUNsQixrQ0FBVSxFQUFFLEtBQUs7QUFDakIsZ0NBQVEsRUFBRSxJQUFJO0FBQ2QsNkJBQUssRUFBRSxnQ0FBZ0M7cUJBQzFDLENBQUMsQ0FBQztpQkFFTjs7MEJBOUJRLDhCQUE4Qjs7dUJBQTlCLDhCQUE4QjtlQUFTLEtBQUs7O3NEQUE1Qyw4QkFBOEIiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9hdXRoL2V4Y2VwdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=