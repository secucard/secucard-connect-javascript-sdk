"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Credentials = exports.Credentials = function () {
    function Credentials() {
        _classCallCheck(this, Credentials);

        this.client_id = null;
        this.client_secret = null;

        this.uuid = null;

        this.code = null;

        this.username = null;
        this.password = null;
        this.device = null;
        this.deviveinfo = { name: null };
    }

    _createClass(Credentials, [{
        key: "isValid",
        value: function isValid() {
            return this.client_id && this.client_secret;
        }
    }]);

    return Credentials;
}();

Credentials.create = function (credentials) {

    var cr = new Credentials();
    return Object.assign(cr, credentials);
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9jcmVkZW50aWFscy5qcyJdLCJuYW1lcyI6WyJDcmVkZW50aWFscyIsImNsaWVudF9pZCIsImNsaWVudF9zZWNyZXQiLCJ1dWlkIiwiY29kZSIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJkZXZpY2UiLCJkZXZpdmVpbmZvIiwibmFtZSIsImNyZWF0ZSIsImNyZWRlbnRpYWxzIiwiY3IiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFZYUEsVyxXQUFBQSxXO0FBRVQsMkJBQWM7QUFBQTs7QUFLVixhQUFLQyxTQUFMLEdBQWlCLElBQWpCO0FBQ0EsYUFBS0MsYUFBTCxHQUFxQixJQUFyQjs7QUFHQSxhQUFLQyxJQUFMLEdBQVksSUFBWjs7QUFFQSxhQUFLQyxJQUFMLEdBQVksSUFBWjs7QUFFQSxhQUFLQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsYUFBS0MsUUFBTCxHQUFnQixJQUFoQjtBQUNBLGFBQUtDLE1BQUwsR0FBYyxJQUFkO0FBQ0EsYUFBS0MsVUFBTCxHQUFrQixFQUFDQyxNQUFNLElBQVAsRUFBbEI7QUFFSDs7OztrQ0FFUztBQUNOLG1CQUFPLEtBQUtSLFNBQUwsSUFBa0IsS0FBS0MsYUFBOUI7QUFDSDs7Ozs7O0FBSUxGLFlBQVlVLE1BQVosR0FBcUIsVUFBQ0MsV0FBRCxFQUFpQjs7QUFFbEMsUUFBSUMsS0FBSyxJQUFJWixXQUFKLEVBQVQ7QUFDQSxXQUFPYSxPQUFPQyxNQUFQLENBQWNGLEVBQWQsRUFBa0JELFdBQWxCLENBQVA7QUFFSCxDQUxEIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9jcmVkZW50aWFscy5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
