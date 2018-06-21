System.register([], function (_export) {
    'use strict';

    var AuthenticationFailedException, AuthenticationTimeoutException;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [],
        execute: function () {
            AuthenticationFailedException = (function (_Error) {
                _inherits(AuthenticationFailedException, _Error);

                function AuthenticationFailedException() {
                    var message = arguments.length <= 0 || arguments[0] === undefined ? 'Authentication failed' : arguments[0];

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

                    Object.defineProperty(this, 'error_user', {
                        configurable: true,
                        enumerable: false,
                        writable: true,
                        value: ''
                    });
                }

                return AuthenticationFailedException;
            })(Error);

            _export('AuthenticationFailedException', AuthenticationFailedException);

            AuthenticationTimeoutException = (function (_Error2) {
                _inherits(AuthenticationTimeoutException, _Error2);

                function AuthenticationTimeoutException() {
                    var message = arguments.length <= 0 || arguments[0] === undefined ? 'Authentication timeout' : arguments[0];

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

                return AuthenticationTimeoutException;
            })(Error);

            _export('AuthenticationTimeoutException', AuthenticationTimeoutException);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9leGNlcHRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O1FBV2EsNkJBQTZCLEVBd0M3Qiw4QkFBOEI7Ozs7Ozs7OztBQXhDOUIseUNBQTZCOzBCQUE3Qiw2QkFBNkI7O0FBRTNCLHlCQUZGLDZCQUE2QixHQUVTO3dCQUFuQyxPQUFPLHlEQUFHLHVCQUF1Qjs7MENBRnBDLDZCQUE2Qjs7QUFHbEMsc0NBQU0sT0FBTyxDQUFDLENBQUM7O0FBRWYsd0JBQUksS0FBSyxDQUFDLGlCQUFpQixFQUFFO0FBQ3pCLDZCQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztxQkFDbkQsTUFBTTtBQUNILDhCQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDakMsd0NBQVksRUFBRSxJQUFJO0FBQ2xCLHNDQUFVLEVBQUUsS0FBSztBQUNqQixvQ0FBUSxFQUFFLElBQUk7QUFDZCxpQ0FBSyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLO3lCQUM5QixDQUFDLENBQUM7cUJBQ047O0FBRUQsMEJBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtBQUNuQyxvQ0FBWSxFQUFFLElBQUk7QUFDbEIsa0NBQVUsRUFBRSxLQUFLO0FBQ2pCLGdDQUFRLEVBQUUsSUFBSTtBQUNkLDZCQUFLLEVBQUUsT0FBTztxQkFDakIsQ0FBQyxDQUFDOztBQUVILDBCQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUU7QUFDaEMsb0NBQVksRUFBRSxJQUFJO0FBQ2xCLGtDQUFVLEVBQUUsS0FBSztBQUNqQixnQ0FBUSxFQUFFLElBQUk7QUFDZCw2QkFBSyxFQUFFLCtCQUErQjtxQkFDekMsQ0FBQyxDQUFDOztBQUVILDBCQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7QUFDdEMsb0NBQVksRUFBRSxJQUFJO0FBQ2xCLGtDQUFVLEVBQUUsS0FBSztBQUNqQixnQ0FBUSxFQUFFLElBQUk7QUFDZCw2QkFBSyxFQUFFLEVBQUU7cUJBQ1osQ0FBQyxDQUFDO2lCQUVOOzt1QkFyQ1EsNkJBQTZCO2VBQVMsS0FBSzs7OztBQXdDM0MsMENBQThCOzBCQUE5Qiw4QkFBOEI7O0FBRTVCLHlCQUZGLDhCQUE4QixHQUVTO3dCQUFwQyxPQUFPLHlEQUFHLHdCQUF3Qjs7MENBRnJDLDhCQUE4Qjs7QUFHbkMsdUNBQU0sT0FBTyxDQUFDLENBQUM7O0FBRWYsd0JBQUksS0FBSyxDQUFDLGlCQUFpQixFQUFFO0FBQ3pCLDZCQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztxQkFDbkQsTUFBTTtBQUNILDhCQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDakMsd0NBQVksRUFBRSxJQUFJO0FBQ2xCLHNDQUFVLEVBQUUsS0FBSztBQUNqQixvQ0FBUSxFQUFFLElBQUk7QUFDZCxpQ0FBSyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLO3lCQUM5QixDQUFDLENBQUM7cUJBQ047O0FBRUQsMEJBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtBQUNuQyxvQ0FBWSxFQUFFLElBQUk7QUFDbEIsa0NBQVUsRUFBRSxLQUFLO0FBQ2pCLGdDQUFRLEVBQUUsSUFBSTtBQUNkLDZCQUFLLEVBQUUsT0FBTztxQkFDakIsQ0FBQyxDQUFDOztBQUVILDBCQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUU7QUFDaEMsb0NBQVksRUFBRSxJQUFJO0FBQ2xCLGtDQUFVLEVBQUUsS0FBSztBQUNqQixnQ0FBUSxFQUFFLElBQUk7QUFDZCw2QkFBSyxFQUFFLGdDQUFnQztxQkFDMUMsQ0FBQyxDQUFDO2lCQUVOOzt1QkE5QlEsOEJBQThCO2VBQVMsS0FBSyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L2F1dGgvZXhjZXB0aW9uLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
