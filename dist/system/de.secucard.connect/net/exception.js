System.register(['es6-error', '../auth/exception'], function (_export) {
	'use strict';

	var ExtendableError, AuthenticationFailedException, SecucardConnectException;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	return {
		setters: [function (_es6Error) {
			ExtendableError = _es6Error['default'];
		}, function (_authException) {
			AuthenticationFailedException = _authException.AuthenticationFailedException;
		}],
		execute: function () {
			SecucardConnectException = (function (_ExtendableError) {
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
			})(ExtendableError);

			_export('SecucardConnectException', SecucardConnectException);

			SecucardConnectException.create = function (data) {

				var error = undefined;

				if (data.error == 'ProductSecurityException') {
					error = Object.assign(new AuthenticationFailedException(), data);
				} else {
					error = new SecucardConnectException(data);
				}

				return error;
			};
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L2V4Y2VwdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7cURBR2Esd0JBQXdCOzs7Ozs7Ozs7O2tEQUY3Qiw2QkFBNkI7OztBQUV4QiwyQkFBd0I7QUFDekIsYUFEQyx3QkFBd0IsQ0FDeEIsSUFBSSxFQUFFOzJCQUROLHdCQUF3Qjs7QUFHbkMsaUNBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDOztBQUUxQixXQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUU7QUFDbEMsa0JBQVksRUFBRyxJQUFJO0FBQ25CLGdCQUFVLEVBQUcsS0FBSztBQUNsQixXQUFLLEVBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJO01BQzlCLENBQUMsQ0FBQzs7QUFFSCxTQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDMUIsU0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQ3hCLFNBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztBQUN4QyxTQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDbEMsU0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ3RCLFNBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUVoQzs7Y0FsQlcsd0JBQXdCOztXQUF4Qix3QkFBd0I7TUFBUyxlQUFlOzt1Q0FBaEQsd0JBQXdCOztBQXFCckMsMkJBQXdCLENBQUMsTUFBTSxHQUFHLFVBQUMsSUFBSSxFQUFLOztBQUUzQyxRQUFJLEtBQUssWUFBQSxDQUFDOztBQUVWLFFBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSwwQkFBMEIsRUFBRTtBQUM1QyxVQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLDZCQUE2QixFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDakUsTUFBTTtBQUNOLFVBQUssR0FBRyxJQUFJLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzNDOztBQUVELFdBQU8sS0FBSyxDQUFDO0lBQ2IsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L25ldC9leGNlcHRpb24uanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9