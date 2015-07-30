'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ExtendableError = function ExtendableError(message) {
	_classCallCheck(this, ExtendableError);

	Error.call(this, message);
	if (Error.captureStackTrace) {
		Error.captureStackTrace(this, this.constructor);
	}
	Object.defineProperty(this, 'name', {
		configurable: true,
		enumerable: false,
		value: this.constructor.name
	});
};

ExtendableError.prototype = new Error();

exports['default'] = ExtendableError;
module.exports = exports['default'];