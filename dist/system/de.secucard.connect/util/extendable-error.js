System.register([], function (_export) {
	'use strict';

	var ExtendableError;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [],
		execute: function () {
			ExtendableError = function ExtendableError(message) {
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

			_export('default', ExtendableError);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvdXRpbC9leHRlbmRhYmxlLWVycm9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztLQUtNLGVBQWU7Ozs7Ozs7QUFBZixrQkFBZSxHQUNULFNBRE4sZUFBZSxDQUNSLE9BQU8sRUFBRTswQkFEaEIsZUFBZTs7QUFFbkIsU0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDMUIsUUFBSSxLQUFLLENBQUMsaUJBQWlCLEVBQUU7QUFDNUIsVUFBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDaEQ7QUFDRCxVQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUU7QUFDbkMsaUJBQVksRUFBRSxJQUFJO0FBQ2xCLGVBQVUsRUFBRSxLQUFLO0FBQ2pCLFVBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7S0FDNUIsQ0FBQyxDQUFDO0lBQ0g7O0FBR0Ysa0JBQWUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQzs7c0JBRXpCLGVBQWUiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC91dGlsL2V4dGVuZGFibGUtZXJyb3IuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9