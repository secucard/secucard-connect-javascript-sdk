'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _es6Error = require('es6-error');

var _es6Error2 = _interopRequireDefault(_es6Error);

var _authException = require('../auth/exception');

var SecucardConnectException = (function (_ExtendableError) {
	function SecucardConnectException(data) {
		_classCallCheck(this, SecucardConnectException);

		_ExtendableError.call(this, data.error_details);

		Object.defineProperty(this, 'name', {
			configurable: true,
			enumerable: false,
			value: this.constructor.name
		});

		this.status = data.status;
		this.error = data.error;
		this.error_details = data.error_details;
		this.error_user = data.error_user;
		this.code = data.code;
		this.supportId = data.supportId;
	}

	_inherits(SecucardConnectException, _ExtendableError);

	return SecucardConnectException;
})(_es6Error2['default']);

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