'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mixins = function mixins(Parent) {
    var Mixed = function (_Parent) {
        _inherits(Mixed, _Parent);

        function Mixed() {
            _classCallCheck(this, Mixed);

            return _possibleConstructorReturn(this, _Parent.apply(this, arguments));
        }

        return Mixed;
    }(Parent);

    var merged = Object.create(null);

    for (var _len = arguments.length, _mixins = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        _mixins[_key - 1] = arguments[_key];
    }

    for (var _iterator = _mixins, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var mixin = _ref;

        for (var _iterator2 = Object.getOwnPropertyNames(mixin.prototype), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref2 = _iterator2[_i2++];
            } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref2 = _i2.value;
            }

            var prop = _ref2;

            if (prop == 'constructor') {
                if (!merged[prop]) {
                    merged[prop] = [];
                }
                merged[prop].push(mixin.prototype[prop]);
            } else {
                Mixed.prototype[prop] = mixin.prototype[prop];
            }
        }
    }
    return Mixed;
};

exports.default = mixins;