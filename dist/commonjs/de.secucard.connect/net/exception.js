'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _authException = require('../auth/exception');

var SecucardConnectException = function SecucardConnectException(data) {
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

exports.SecucardConnectException = SecucardConnectException;

SecucardConnectException.create = function (data) {

	var error = undefined;

	if (data.error == 'ProductSecurityException') {
		error = Object.assign(new _authException.AuthenticationFailedException(), data);
	} else {
		error = new SecucardConnectException(data);
	}

	return error;
};