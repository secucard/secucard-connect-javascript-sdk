'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AuthenticationFailedException = exports.AuthenticationFailedException = function (_Error) {
    _inherits(AuthenticationFailedException, _Error);

    function AuthenticationFailedException() {
        var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Authentication failed';

        _classCallCheck(this, AuthenticationFailedException);

        var _this = _possibleConstructorReturn(this, (AuthenticationFailedException.__proto__ || Object.getPrototypeOf(AuthenticationFailedException)).call(this, message));

        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, _this.constructor);
        } else {
            Object.defineProperty(_this, 'stack', {
                configurable: true,
                enumerable: false,
                writable: true,
                value: Error(message).stack
            });
        }

        Object.defineProperty(_this, 'message', {
            configurable: true,
            enumerable: false,
            writable: true,
            value: message
        });

        Object.defineProperty(_this, 'name', {
            configurable: true,
            enumerable: false,
            writable: true,
            value: 'AuthenticationFailedException'
        });

        Object.defineProperty(_this, 'error_user', {
            configurable: true,
            enumerable: false,
            writable: true,
            value: ''
        });

        return _this;
    }

    return AuthenticationFailedException;
}(Error);

var AuthenticationTimeoutException = exports.AuthenticationTimeoutException = function (_Error2) {
    _inherits(AuthenticationTimeoutException, _Error2);

    function AuthenticationTimeoutException() {
        var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Authentication timeout';

        _classCallCheck(this, AuthenticationTimeoutException);

        var _this2 = _possibleConstructorReturn(this, (AuthenticationTimeoutException.__proto__ || Object.getPrototypeOf(AuthenticationTimeoutException)).call(this, message));

        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this2, _this2.constructor);
        } else {
            Object.defineProperty(_this2, 'stack', {
                configurable: true,
                enumerable: false,
                writable: true,
                value: Error(message).stack
            });
        }

        Object.defineProperty(_this2, 'message', {
            configurable: true,
            enumerable: false,
            writable: true,
            value: message
        });

        Object.defineProperty(_this2, 'name', {
            configurable: true,
            enumerable: false,
            writable: true,
            value: 'AuthenticationTimeoutException'
        });

        return _this2;
    }

    return AuthenticationTimeoutException;
}(Error);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9leGNlcHRpb24uanMiXSwibmFtZXMiOlsiQXV0aGVudGljYXRpb25GYWlsZWRFeGNlcHRpb24iLCJtZXNzYWdlIiwiRXJyb3IiLCJjYXB0dXJlU3RhY2tUcmFjZSIsImNvbnN0cnVjdG9yIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwid3JpdGFibGUiLCJ2YWx1ZSIsInN0YWNrIiwiQXV0aGVudGljYXRpb25UaW1lb3V0RXhjZXB0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFXYUEsNkIsV0FBQUEsNkI7OztBQUVULDZDQUErQztBQUFBLFlBQW5DQyxPQUFtQyx1RUFBekIsdUJBQXlCOztBQUFBOztBQUFBLGtLQUNyQ0EsT0FEcUM7O0FBRzNDLFlBQUlDLE1BQU1DLGlCQUFWLEVBQTZCO0FBQ3pCRCxrQkFBTUMsaUJBQU4sUUFBOEIsTUFBS0MsV0FBbkM7QUFDSCxTQUZELE1BRU87QUFDSEMsbUJBQU9DLGNBQVAsUUFBNEIsT0FBNUIsRUFBcUM7QUFDakNDLDhCQUFjLElBRG1CO0FBRWpDQyw0QkFBWSxLQUZxQjtBQUdqQ0MsMEJBQVUsSUFIdUI7QUFJakNDLHVCQUFPUixNQUFNRCxPQUFOLEVBQWVVO0FBSlcsYUFBckM7QUFNSDs7QUFFRE4sZUFBT0MsY0FBUCxRQUE0QixTQUE1QixFQUF1QztBQUNuQ0MsMEJBQWMsSUFEcUI7QUFFbkNDLHdCQUFZLEtBRnVCO0FBR25DQyxzQkFBVSxJQUh5QjtBQUluQ0MsbUJBQU9UO0FBSjRCLFNBQXZDOztBQU9BSSxlQUFPQyxjQUFQLFFBQTRCLE1BQTVCLEVBQW9DO0FBQ2hDQywwQkFBYyxJQURrQjtBQUVoQ0Msd0JBQVksS0FGb0I7QUFHaENDLHNCQUFVLElBSHNCO0FBSWhDQyxtQkFBTztBQUp5QixTQUFwQzs7QUFPQUwsZUFBT0MsY0FBUCxRQUE0QixZQUE1QixFQUEwQztBQUN0Q0MsMEJBQWMsSUFEd0I7QUFFdENDLHdCQUFZLEtBRjBCO0FBR3RDQyxzQkFBVSxJQUg0QjtBQUl0Q0MsbUJBQU87QUFKK0IsU0FBMUM7O0FBNUIyQztBQW1DOUM7OztFQXJDOENSLEs7O0lBd0N0Q1UsOEIsV0FBQUEsOEI7OztBQUVULDhDQUFnRDtBQUFBLFlBQXBDWCxPQUFvQyx1RUFBMUIsd0JBQTBCOztBQUFBOztBQUFBLHFLQUN0Q0EsT0FEc0M7O0FBRzVDLFlBQUlDLE1BQU1DLGlCQUFWLEVBQTZCO0FBQ3pCRCxrQkFBTUMsaUJBQU4sU0FBOEIsT0FBS0MsV0FBbkM7QUFDSCxTQUZELE1BRU87QUFDSEMsbUJBQU9DLGNBQVAsU0FBNEIsT0FBNUIsRUFBcUM7QUFDakNDLDhCQUFjLElBRG1CO0FBRWpDQyw0QkFBWSxLQUZxQjtBQUdqQ0MsMEJBQVUsSUFIdUI7QUFJakNDLHVCQUFPUixNQUFNRCxPQUFOLEVBQWVVO0FBSlcsYUFBckM7QUFNSDs7QUFFRE4sZUFBT0MsY0FBUCxTQUE0QixTQUE1QixFQUF1QztBQUNuQ0MsMEJBQWMsSUFEcUI7QUFFbkNDLHdCQUFZLEtBRnVCO0FBR25DQyxzQkFBVSxJQUh5QjtBQUluQ0MsbUJBQU9UO0FBSjRCLFNBQXZDOztBQU9BSSxlQUFPQyxjQUFQLFNBQTRCLE1BQTVCLEVBQW9DO0FBQ2hDQywwQkFBYyxJQURrQjtBQUVoQ0Msd0JBQVksS0FGb0I7QUFHaENDLHNCQUFVLElBSHNCO0FBSWhDQyxtQkFBTztBQUp5QixTQUFwQzs7QUFyQjRDO0FBNEIvQzs7O0VBOUIrQ1IsSyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L2F1dGgvZXhjZXB0aW9uLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
