'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mixins = function mixins(Parent) {
    var Mixed = function (_Parent) {
        _inherits(Mixed, _Parent);

        function Mixed() {
            _classCallCheck(this, Mixed);

            return _possibleConstructorReturn(this, (Mixed.__proto__ || Object.getPrototypeOf(Mixed)).apply(this, arguments));
        }

        return Mixed;
    }(Parent);

    var merged = Object.create(null);

    for (var _len = arguments.length, _mixins = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        _mixins[_key - 1] = arguments[_key];
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = _mixins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var mixin = _step.value;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Object.getOwnPropertyNames(mixin.prototype)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var prop = _step2.value;

                    if (prop == 'constructor') {
                        if (!merged[prop]) {
                            merged[prop] = [];
                        }
                        merged[prop].push(mixin.prototype[prop]);
                    } else {
                        Mixed.prototype[prop] = mixin.prototype[prop];
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return Mixed;
};

exports.default = mixins;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvdXRpbC9taXhpbnMuanMiXSwibmFtZXMiOlsibWl4aW5zIiwiUGFyZW50IiwiTWl4ZWQiLCJtZXJnZWQiLCJPYmplY3QiLCJjcmVhdGUiLCJtaXhpbiIsImdldE93blByb3BlcnR5TmFtZXMiLCJwcm90b3R5cGUiLCJwcm9wIiwicHVzaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBV0EsSUFBSUEsU0FBUyxnQkFBVUMsTUFBVixFQUE2QjtBQUFBLFFBQ2hDQyxLQURnQztBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBLE1BQ2xCRCxNQURrQjs7QUFHdEMsUUFBSUUsU0FBU0MsT0FBT0MsTUFBUCxDQUFjLElBQWQsQ0FBYjs7QUFIc0Msc0NBQVJMLE9BQVE7QUFBUkEsZUFBUTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUl0Qyw2QkFBa0JBLE9BQWxCLDhIQUEwQjtBQUFBLGdCQUFqQk0sS0FBaUI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDdEIsc0NBQWlCRixPQUFPRyxtQkFBUCxDQUEyQkQsTUFBTUUsU0FBakMsQ0FBakIsbUlBQThEO0FBQUEsd0JBQXJEQyxJQUFxRDs7QUFDMUQsd0JBQUlBLFFBQVEsYUFBWixFQUEyQjtBQUN2Qiw0QkFBSSxDQUFDTixPQUFPTSxJQUFQLENBQUwsRUFBbUI7QUFDZk4sbUNBQU9NLElBQVAsSUFBZSxFQUFmO0FBQ0g7QUFDQU4sK0JBQU9NLElBQVAsQ0FBRCxDQUFlQyxJQUFmLENBQW9CSixNQUFNRSxTQUFOLENBQWdCQyxJQUFoQixDQUFwQjtBQUNILHFCQUxELE1BS087QUFDSFAsOEJBQU1NLFNBQU4sQ0FBZ0JDLElBQWhCLElBQXdCSCxNQUFNRSxTQUFOLENBQWdCQyxJQUFoQixDQUF4QjtBQUNIO0FBQ0o7QUFWcUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVd6QjtBQWZxQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWdCdEMsV0FBT1AsS0FBUDtBQUNILENBakJEOztrQkFtQmVGLE0iLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC91dGlsL21peGlucy5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
