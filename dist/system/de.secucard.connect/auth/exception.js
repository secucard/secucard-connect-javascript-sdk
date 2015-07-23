System.register(['es6-error'], function (_export) {
	'use strict';

	var ExtendableError, AuthenticationFailedException;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_es6Error) {
			ExtendableError = _es6Error['default'];
		}],
		execute: function () {
			AuthenticationFailedException = (function (_ExtendableError) {
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
			})(ExtendableError);

			_export('AuthenticationFailedException', AuthenticationFailedException);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9leGNlcHRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3NCQUVhLDZCQUE2Qjs7Ozs7Ozs7Ozs7QUFBN0IsZ0NBQTZCO0FBQzlCLGFBREMsNkJBQTZCLEdBQzNCOzJCQURGLDZCQUE2Qjs7QUFHeEMsaUNBQU0sdUJBQXVCLENBQUMsQ0FBQzs7QUFFL0IsV0FBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFO0FBQ2xDLGtCQUFZLEVBQUcsSUFBSTtBQUNuQixnQkFBVSxFQUFHLEtBQUs7QUFDbEIsV0FBSyxFQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTtNQUM5QixDQUFDLENBQUM7S0FFSDs7Y0FYVyw2QkFBNkI7O1dBQTdCLDZCQUE2QjtNQUFTLGVBQWU7OzRDQUFyRCw2QkFBNkIiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9hdXRoL2V4Y2VwdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=