'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Channel = exports.Channel = function () {
    function Channel() {
        _classCallCheck(this, Channel);
    }

    _createClass(Channel, [{
        key: 'send',
        value: function send() {}
    }, {
        key: 'request',
        value: function request(method, params) {}
    }]);

    return Channel;
}();

Channel.REST = 'rest';
Channel.STOMP = 'stomp';

Channel.METHOD = {
    GET: "GET",
    CREATE: "CREATE",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
    EXECUTE: "EXECUTE"
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L2NoYW5uZWwuanMiXSwibmFtZXMiOlsiQ2hhbm5lbCIsIm1ldGhvZCIsInBhcmFtcyIsIlJFU1QiLCJTVE9NUCIsIk1FVEhPRCIsIkdFVCIsIkNSRUFURSIsIlVQREFURSIsIkRFTEVURSIsIkVYRUNVVEUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFXYUEsTyxXQUFBQSxPO0FBRVQsdUJBQWM7QUFBQTtBQUViOzs7OytCQUVNLENBRU47OztnQ0FFT0MsTSxFQUFRQyxNLEVBQVEsQ0FHdkI7Ozs7OztBQUlMRixRQUFRRyxJQUFSLEdBQWUsTUFBZjtBQUNBSCxRQUFRSSxLQUFSLEdBQWdCLE9BQWhCOztBQUVBSixRQUFRSyxNQUFSLEdBQWlCO0FBQ2JDLFNBQUssS0FEUTtBQUViQyxZQUFRLFFBRks7QUFHYkMsWUFBUSxRQUhLO0FBSWJDLFlBQVEsUUFKSztBQUtiQyxhQUFTO0FBTEksQ0FBakIiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9uZXQvY2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
