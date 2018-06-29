'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Token = exports.Token = function () {
    function Token() {
        _classCallCheck(this, Token);

        this.access_token = null;
        this.refresh_token = null;
        this.token_type = 'bearer';
        this.expires_in = 1200;
        this.scope = null;
    }

    _createClass(Token, [{
        key: 'getRefreshToken',
        value: function getRefreshToken() {

            return this.refresh_token;
        }
    }, {
        key: 'getAccessToken',
        value: function getAccessToken() {

            return this.access_token;
        }
    }, {
        key: 'isExpired',
        value: function isExpired() {

            return !this.expireTime || new Date().getTime() > this.expireTime;
        }
    }, {
        key: 'setExpireTime',
        value: function setExpireTime() {

            this.expireTime = parseInt(this.expires_in) * 1000 + new Date().getTime();
        }
    }, {
        key: 'getExpireTime',
        value: function getExpireTime() {

            return this.expireTime;
        }
    }, {
        key: 'update',
        value: function update(data) {
            return Object.assign(this, data);
        }
    }]);

    return Token;
}();

Token.create = function (data) {

    var token = new Token();
    token = Object.assign(token, data);
    return token;
};

Token.isValid = function (data) {

    return data && data.hasOwnProperty('access_token') && data.hasOwnProperty('expireTime');
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC90b2tlbi5qcyJdLCJuYW1lcyI6WyJUb2tlbiIsImFjY2Vzc190b2tlbiIsInJlZnJlc2hfdG9rZW4iLCJ0b2tlbl90eXBlIiwiZXhwaXJlc19pbiIsInNjb3BlIiwiZXhwaXJlVGltZSIsIkRhdGUiLCJnZXRUaW1lIiwicGFyc2VJbnQiLCJkYXRhIiwiT2JqZWN0IiwiYXNzaWduIiwiY3JlYXRlIiwidG9rZW4iLCJpc1ZhbGlkIiwiaGFzT3duUHJvcGVydHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFXYUEsSyxXQUFBQSxLO0FBRVQscUJBQWM7QUFBQTs7QUFDVixhQUFLQyxZQUFMLEdBQW9CLElBQXBCO0FBQ0EsYUFBS0MsYUFBTCxHQUFxQixJQUFyQjtBQUNBLGFBQUtDLFVBQUwsR0FBa0IsUUFBbEI7QUFDQSxhQUFLQyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsYUFBS0MsS0FBTCxHQUFhLElBQWI7QUFDSDs7OzswQ0FFaUI7O0FBRWQsbUJBQU8sS0FBS0gsYUFBWjtBQUVIOzs7eUNBRWdCOztBQUViLG1CQUFPLEtBQUtELFlBQVo7QUFFSDs7O29DQUVXOztBQUVSLG1CQUFPLENBQUMsS0FBS0ssVUFBTixJQUFxQixJQUFJQyxJQUFKLEVBQUQsQ0FBYUMsT0FBYixLQUF5QixLQUFLRixVQUF6RDtBQUVIOzs7d0NBRWU7O0FBRVosaUJBQUtBLFVBQUwsR0FBa0JHLFNBQVMsS0FBS0wsVUFBZCxJQUE0QixJQUE1QixHQUFvQyxJQUFJRyxJQUFKLEVBQUQsQ0FBYUMsT0FBYixFQUFyRDtBQUVIOzs7d0NBRWU7O0FBRVosbUJBQU8sS0FBS0YsVUFBWjtBQUVIOzs7K0JBRU1JLEksRUFBTTtBQUNULG1CQUFPQyxPQUFPQyxNQUFQLENBQWMsSUFBZCxFQUFvQkYsSUFBcEIsQ0FBUDtBQUNIOzs7Ozs7QUFJTFYsTUFBTWEsTUFBTixHQUFlLFVBQUNILElBQUQsRUFBVTs7QUFFckIsUUFBSUksUUFBUSxJQUFJZCxLQUFKLEVBQVo7QUFDQWMsWUFBUUgsT0FBT0MsTUFBUCxDQUFjRSxLQUFkLEVBQXFCSixJQUFyQixDQUFSO0FBQ0EsV0FBT0ksS0FBUDtBQUVILENBTkQ7O0FBUUFkLE1BQU1lLE9BQU4sR0FBZ0IsVUFBQ0wsSUFBRCxFQUFVOztBQUV0QixXQUFPQSxRQUFRQSxLQUFLTSxjQUFMLENBQW9CLGNBQXBCLENBQVIsSUFBK0NOLEtBQUtNLGNBQUwsQ0FBb0IsWUFBcEIsQ0FBdEQ7QUFFSCxDQUpEIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC90b2tlbi5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
