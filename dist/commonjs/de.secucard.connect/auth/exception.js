'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AuthenticationFailedException = (function (_Error) {
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

exports.AuthenticationFailedException = AuthenticationFailedException;

var AuthenticationTimeoutException = (function (_Error2) {
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

exports.AuthenticationTimeoutException = AuthenticationTimeoutException;