System.register([], function (_export) {

	"use strict";

	var _createClass, _get, _inherits, _classCallCheck, ExtendableError;

	return {
		setters: [],
		execute: function () {
			_createClass = (function () {
				function defineProperties(target, props) {
					for (var key in props) {
						var prop = props[key];
						prop.configurable = true;
						if (prop.value) prop.writable = true;
					}
					Object.defineProperties(target, props);
				}

				return function (Constructor, protoProps, staticProps) {
					if (protoProps) defineProperties(Constructor.prototype, protoProps);
					if (staticProps) defineProperties(Constructor, staticProps);
					return Constructor;
				};
			})();

			_get = function get(_x, _x2, _x3) {
				var _again = true;

				_function: while (_again) {
					var object = _x,
					    property = _x2,
					    receiver = _x3;
					desc = parent = getter = undefined;
					_again = false;

					var desc = Object.getOwnPropertyDescriptor(object, property);
					if (desc === undefined) {
						var parent = Object.getPrototypeOf(object);
						if (parent === null) {
							return undefined;
						} else {
							_x = parent;
							_x2 = property;
							_x3 = receiver;
							_again = true;
							continue _function;
						}
					} else if ("value" in desc && desc.writable) {
						return desc.value;
					} else {
						var getter = desc.get;
						if (getter === undefined) {
							return undefined;
						}
						return getter.call(receiver);
					}
				}
			};

			_inherits = function _inherits(subClass, superClass) {
				if (typeof superClass !== "function" && superClass !== null) {
					throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
				}
				subClass.prototype = Object.create(superClass && superClass.prototype, {
					constructor: {
						value: subClass,
						enumerable: false,
						writable: true,
						configurable: true
					}
				});
				if (superClass) subClass.__proto__ = superClass;
			};

			_classCallCheck = function _classCallCheck(instance, Constructor) {
				if (!(instance instanceof Constructor)) {
					throw new TypeError("Cannot call a class as a function");
				}
			};

			ExtendableError = (function (_Error) {
				function ExtendableError(message) {
					_classCallCheck(this, ExtendableError);
					if (Error.captureStackTrace) {
						Error.captureStackTrace(this, this.constructor);
					}
					this.message = message;
					_get(Object.getPrototypeOf(ExtendableError.prototype), "constructor", this).call(this, message);
				}

				_inherits(ExtendableError, _Error);

				_createClass(ExtendableError, {
					name: {
						get: function get() {
							return this.constructor.name;
						}
					}
				});

				return ExtendableError;
			})(Error);

			module.exports = ExtendableError;
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvdXRpbC9leHRlbmRhYmxlLWVycm9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBT0EsYUFBWSxDQUFDOztLQUVULFlBQVksRUFpQlosSUFBSSxFQW9CSixTQUFTLEVBZVQsZUFBZSxFQU1mLGVBQWU7Ozs7O0FBMURmLGVBQVksR0FBRyxDQUFDLFlBQVk7QUFDL0IsYUFBUyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQ3hDLFVBQUssSUFBSSxHQUFHLElBQUksS0FBSyxFQUFFO0FBQ3RCLFVBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN0QixVQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztBQUN6QixVQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7TUFDckM7QUFDRCxXQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ3ZDOztBQUVELFdBQU8sVUFBVSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRTtBQUN0RCxTQUFJLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3BFLFNBQUksV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUM1RCxZQUFPLFdBQVcsQ0FBQztLQUNuQixDQUFDO0lBQ0YsQ0FBQSxFQUFHOztBQUVBLE9BQUksR0FBRyxTQUFTLEdBQUc7Ozs4QkFBNkI7U0FBNUIsTUFBTTtTQUFFLFFBQVE7U0FBRSxRQUFRO0FBQzdDLFNBQUksR0FFSCxNQUFNLEdBU04sTUFBTTs7O0FBWFgsU0FBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUM3RCxTQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7QUFDdkIsVUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQyxVQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7QUFDcEIsY0FBTyxTQUFTLENBQUM7T0FDakIsTUFBTTtZQUNLLE1BQU07YUFBRSxRQUFRO2FBQUUsUUFBUTs7O09BQ3JDO01BQ0QsTUFBTSxJQUFJLE9BQU8sSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUM1QyxhQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7TUFDbEIsTUFBTTtBQUNOLFVBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDdEIsVUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO0FBQ3pCLGNBQU8sU0FBUyxDQUFDO09BQ2pCO0FBQ0QsYUFBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO01BQzdCO0tBQ0Q7SUFBQTs7QUFFRyxZQUFTLEdBQUcsU0FBWixTQUFTLENBQWEsUUFBUSxFQUFFLFVBQVUsRUFBRTtBQUMvQyxRQUFJLE9BQU8sVUFBVSxLQUFLLFVBQVUsSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO0FBQzVELFdBQU0sSUFBSSxTQUFTLENBQUMsMERBQTBELEdBQUcsT0FBTyxVQUFVLENBQUMsQ0FBQztLQUNwRztBQUNELFlBQVEsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLFNBQVMsRUFBRTtBQUN0RSxnQkFBVyxFQUFFO0FBQ1osV0FBSyxFQUFFLFFBQVE7QUFDZixnQkFBVSxFQUFFLEtBQUs7QUFDakIsY0FBUSxFQUFFLElBQUk7QUFDZCxrQkFBWSxFQUFFLElBQUk7TUFDbEI7S0FDRCxDQUFDLENBQUM7QUFDSCxRQUFJLFVBQVUsRUFBRSxRQUFRLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQztJQUNoRDs7QUFFRyxrQkFBZSxHQUFHLFNBQWxCLGVBQWUsQ0FBYSxRQUFRLEVBQUUsV0FBVyxFQUFFO0FBQ3RELFFBQUksRUFBRSxRQUFRLFlBQVksV0FBVyxDQUFBLEFBQUMsRUFBRTtBQUN2QyxXQUFNLElBQUksU0FBUyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7S0FDekQ7SUFDRDs7QUFFRyxrQkFBZSxHQUFHLENBQUMsVUFBVSxNQUFNLEVBQUU7QUFDeEMsYUFBUyxlQUFlLENBQUMsT0FBTyxFQUFFO0FBQ2pDLG9CQUFlLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQ3ZDLFNBQUcsS0FBSyxDQUFDLGlCQUFpQixFQUFFO0FBQzNCLFdBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO01BQ2hEO0FBQ0QsU0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdkIsU0FBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ2hHOztBQUVELGFBQVMsQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUM7O0FBRW5DLGdCQUFZLENBQUMsZUFBZSxFQUFFO0FBQzdCLFNBQUksRUFBRTtBQUNMLFNBQUcsRUFBRSxlQUFZO0FBQ2hCLGNBQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7T0FDN0I7TUFDRDtLQUNELENBQUMsQ0FBQzs7QUFFSCxXQUFPLGVBQWUsQ0FBQztJQUN2QixDQUFBLENBQUUsS0FBSyxDQUFDOztBQUVULFNBQU0sQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvdXRpbC9leHRlbmRhYmxlLWVycm9yLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==