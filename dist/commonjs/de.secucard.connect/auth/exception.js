'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _es6Error = require('es6-error');

var _es6Error2 = _interopRequireDefault(_es6Error);

var AuthenticationFailedException = (function (_ExtendableError) {
	function AuthenticationFailedException() {
		_classCallCheck(this, AuthenticationFailedException);

		_ExtendableError.call(this, 'Authentication failed');

		Object.defineProperty(this, 'name', {
			configurable: true,
			enumerable: false,
			value: this.constructor.name
		});
	}

	_inherits(AuthenticationFailedException, _ExtendableError);

	return AuthenticationFailedException;
})(_es6Error2['default']);

exports.AuthenticationFailedException = AuthenticationFailedException;