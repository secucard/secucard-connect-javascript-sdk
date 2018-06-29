'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AuthenticationFailedException = exports.AuthenticationFailedException = function (_Error) {
    _inherits(AuthenticationFailedException, _Error);

    function AuthenticationFailedException() {
        var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Authentication failed';

        _classCallCheck(this, AuthenticationFailedException);

        var _this = _possibleConstructorReturn(this, _Error.call(this, message));

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

        var _this2 = _possibleConstructorReturn(this, _Error2.call(this, message));

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