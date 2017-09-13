System.register([], function (_export) {
    'use strict';

    var mixins;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [],
        execute: function () {
            mixins = function mixins(Parent) {
                var Mixed = (function (_Parent) {
                    function Mixed() {
                        _classCallCheck(this, Mixed);

                        _Parent.apply(this, arguments);
                    }

                    _inherits(Mixed, _Parent);

                    return Mixed;
                })(Parent);

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

            _export('default', mixins);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvdXRpbC9taXhpbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O1FBV0ksTUFBTTs7Ozs7Ozs7O0FBQU4sa0JBQU0sR0FBRyxnQkFBVSxNQUFNLEVBQWE7b0JBQ2hDLEtBQUs7NkJBQUwsS0FBSzs4Q0FBTCxLQUFLOzs7Ozs4QkFBTCxLQUFLOzsyQkFBTCxLQUFLO21CQUFTLE1BQU07O0FBRTFCLG9CQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOztrREFISCxPQUFNO0FBQU4sMkJBQU07OztBQUlwQyxxQ0FBa0IsT0FBTSxrSEFBRTs7Ozs7Ozs7Ozs7O3dCQUFqQixLQUFLOztBQUNWLDBDQUFpQixNQUFNLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyx5SEFBRTs7Ozs7Ozs7Ozs7OzRCQUFyRCxJQUFJOztBQUNULDRCQUFJLElBQUksSUFBSSxhQUFhLEVBQUU7QUFDdkIsZ0NBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDZixzQ0FBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzs2QkFDckI7QUFDRCxBQUFDLGtDQUFNLENBQUMsSUFBSSxDQUFDLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt5QkFDOUMsTUFBTTtBQUNILGlDQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBQ2pEO3FCQUNKO2lCQUNKO0FBQ0QsdUJBQU8sS0FBSyxDQUFDO2FBQ2hCOzsrQkFFYyxNQUFNIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvdXRpbC9taXhpbnMuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9