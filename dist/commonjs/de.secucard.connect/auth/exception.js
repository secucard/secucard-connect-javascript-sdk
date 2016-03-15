'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var AuthenticationFailedException = function AuthenticationFailedException() {
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

exports.AuthenticationFailedException = AuthenticationFailedException;

var AuthenticationTimeoutException = function AuthenticationTimeoutException() {
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

exports.AuthenticationTimeoutException = AuthenticationTimeoutException;