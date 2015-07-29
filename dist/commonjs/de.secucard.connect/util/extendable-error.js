

"use strict";

var _createClass = (function () {
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

var _get = function get(_x, _x2, _x3) {
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

var _inherits = function _inherits(subClass, superClass) {
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

var _classCallCheck = function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
};

var ExtendableError = (function (_Error) {
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