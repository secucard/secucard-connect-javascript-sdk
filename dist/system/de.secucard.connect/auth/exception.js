System.register(['../util/extendable-error'], function (_export) {
	'use strict';

	var ExtendableError, AuthenticationFailedException;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_utilExtendableError) {
			ExtendableError = _utilExtendableError['default'];
		}],
		execute: function () {
			AuthenticationFailedException = (function (_ExtendableError) {
				function AuthenticationFailedException() {
					var message = arguments[0] === undefined ? 'Authentication failed' : arguments[0];

					_classCallCheck(this, AuthenticationFailedException);

					_ExtendableError.call(this, message);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9leGNlcHRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3NCQUNhLDZCQUE2Qjs7Ozs7Ozs7Ozs7QUFBN0IsZ0NBQTZCO0FBRTlCLGFBRkMsNkJBQTZCLEdBRU07U0FBbkMsT0FBTyxnQ0FBRyx1QkFBdUI7OzJCQUZqQyw2QkFBNkI7O0FBSXhDLGlDQUFNLE9BQU8sQ0FBQyxDQUFDOztBQUVmLFdBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRTtBQUNsQyxrQkFBWSxFQUFHLElBQUk7QUFDbkIsZ0JBQVUsRUFBRyxLQUFLO0FBQ2xCLFdBQUssRUFBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7TUFDOUIsQ0FBQyxDQUFDO0tBRUg7O2NBWlcsNkJBQTZCOztXQUE3Qiw2QkFBNkI7TUFBUyxlQUFlOzs0Q0FBckQsNkJBQTZCIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9leGNlcHRpb24uanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9