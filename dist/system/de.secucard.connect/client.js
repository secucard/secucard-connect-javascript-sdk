'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Client = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _message = require('./net/message');

var _clientConfig = require('./client-config');

var _clientContext = require('./client-context');

var _clientVersion = require('./client-version');

var _minilog = require('minilog');

var _minilog2 = _interopRequireDefault(_minilog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = exports.Client = function () {
    function Client(config, environment) {
        _classCallCheck(this, Client);

        this.config = config;
        this.context = new _clientContext.ClientContext(config, environment);
        this.getService = this.context.getService.bind(this.context);
        this.addAppService = this.context.addAppService.bind(this.context);
        this.removeAppService = this.context.removeAppService.bind(this.context);
        this.emitServiceEvent = this.context.emitServiceEvent.bind(this.context);
        this.on = this.context.on.bind(this.context);
        this.setCredentials = this.context.setCredentials.bind(this.context);
        this.getStoredToken = this.context.getStoredToken.bind(this.context);
        this.exportToken = this.context.exportToken.bind(this.context);
        this.connected = false;
        this.setLanguage = this.context.setLanguage.bind(this.context);

        (0, _minilog2.default)('secucard.client').debug(config);
    }

    _createClass(Client, [{
        key: 'open',
        value: function open() {
            var _this = this;

            if (this.connected) {
                return Promise.resolve(this.connected);
            }

            return this.context.open().then(function () {
                _this.connected = true;
                return _this.connected;
            });
        }
    }, {
        key: 'getVersion',
        value: function getVersion() {
            return _clientVersion.Version.name;
        }
    }]);

    return Client;
}();

Client.create = function (config, environment) {
    if (!config) {
        config = Object.create(null);
    }

    config = Object.assign(_clientConfig.ClientConfig.defaults(), environment.config, config);

    return new Client(config, environment);
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LmpzIl0sIm5hbWVzIjpbIkNsaWVudCIsImNvbmZpZyIsImVudmlyb25tZW50IiwiY29udGV4dCIsIkNsaWVudENvbnRleHQiLCJnZXRTZXJ2aWNlIiwiYmluZCIsImFkZEFwcFNlcnZpY2UiLCJyZW1vdmVBcHBTZXJ2aWNlIiwiZW1pdFNlcnZpY2VFdmVudCIsIm9uIiwic2V0Q3JlZGVudGlhbHMiLCJnZXRTdG9yZWRUb2tlbiIsImV4cG9ydFRva2VuIiwiY29ubmVjdGVkIiwic2V0TGFuZ3VhZ2UiLCJkZWJ1ZyIsIlByb21pc2UiLCJyZXNvbHZlIiwib3BlbiIsInRoZW4iLCJWZXJzaW9uIiwibmFtZSIsImNyZWF0ZSIsIk9iamVjdCIsImFzc2lnbiIsIkNsaWVudENvbmZpZyIsImRlZmF1bHRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFXQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7SUFFYUEsTSxXQUFBQSxNO0FBRVQsb0JBQVlDLE1BQVosRUFBb0JDLFdBQXBCLEVBQWlDO0FBQUE7O0FBQzdCLGFBQUtELE1BQUwsR0FBY0EsTUFBZDtBQUNBLGFBQUtFLE9BQUwsR0FBZSxJQUFJQyw0QkFBSixDQUFrQkgsTUFBbEIsRUFBMEJDLFdBQTFCLENBQWY7QUFDQSxhQUFLRyxVQUFMLEdBQWtCLEtBQUtGLE9BQUwsQ0FBYUUsVUFBYixDQUF3QkMsSUFBeEIsQ0FBNkIsS0FBS0gsT0FBbEMsQ0FBbEI7QUFDQSxhQUFLSSxhQUFMLEdBQXFCLEtBQUtKLE9BQUwsQ0FBYUksYUFBYixDQUEyQkQsSUFBM0IsQ0FBZ0MsS0FBS0gsT0FBckMsQ0FBckI7QUFDQSxhQUFLSyxnQkFBTCxHQUF3QixLQUFLTCxPQUFMLENBQWFLLGdCQUFiLENBQThCRixJQUE5QixDQUFtQyxLQUFLSCxPQUF4QyxDQUF4QjtBQUNBLGFBQUtNLGdCQUFMLEdBQXdCLEtBQUtOLE9BQUwsQ0FBYU0sZ0JBQWIsQ0FBOEJILElBQTlCLENBQW1DLEtBQUtILE9BQXhDLENBQXhCO0FBQ0EsYUFBS08sRUFBTCxHQUFVLEtBQUtQLE9BQUwsQ0FBYU8sRUFBYixDQUFnQkosSUFBaEIsQ0FBcUIsS0FBS0gsT0FBMUIsQ0FBVjtBQUNBLGFBQUtRLGNBQUwsR0FBc0IsS0FBS1IsT0FBTCxDQUFhUSxjQUFiLENBQTRCTCxJQUE1QixDQUFpQyxLQUFLSCxPQUF0QyxDQUF0QjtBQUNBLGFBQUtTLGNBQUwsR0FBc0IsS0FBS1QsT0FBTCxDQUFhUyxjQUFiLENBQTRCTixJQUE1QixDQUFpQyxLQUFLSCxPQUF0QyxDQUF0QjtBQUNBLGFBQUtVLFdBQUwsR0FBbUIsS0FBS1YsT0FBTCxDQUFhVSxXQUFiLENBQXlCUCxJQUF6QixDQUE4QixLQUFLSCxPQUFuQyxDQUFuQjtBQUNBLGFBQUtXLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxhQUFLQyxXQUFMLEdBQW1CLEtBQUtaLE9BQUwsQ0FBYVksV0FBYixDQUF5QlQsSUFBekIsQ0FBOEIsS0FBS0gsT0FBbkMsQ0FBbkI7O0FBRUEsK0JBQVEsaUJBQVIsRUFBMkJhLEtBQTNCLENBQWlDZixNQUFqQztBQUNIOzs7OytCQUVNO0FBQUE7O0FBQ0gsZ0JBQUksS0FBS2EsU0FBVCxFQUFvQjtBQUNoQix1QkFBT0csUUFBUUMsT0FBUixDQUFnQixLQUFLSixTQUFyQixDQUFQO0FBQ0g7O0FBRUQsbUJBQU8sS0FBS1gsT0FBTCxDQUFhZ0IsSUFBYixHQUFvQkMsSUFBcEIsQ0FBeUIsWUFBTTtBQUNsQyxzQkFBS04sU0FBTCxHQUFpQixJQUFqQjtBQUNBLHVCQUFPLE1BQUtBLFNBQVo7QUFDSCxhQUhNLENBQVA7QUFLSDs7O3FDQUVZO0FBQ1QsbUJBQU9PLHVCQUFRQyxJQUFmO0FBQ0g7Ozs7OztBQUdMdEIsT0FBT3VCLE1BQVAsR0FBZ0IsVUFBQ3RCLE1BQUQsRUFBU0MsV0FBVCxFQUF5QjtBQUNyQyxRQUFJLENBQUNELE1BQUwsRUFBYTtBQUNUQSxpQkFBU3VCLE9BQU9ELE1BQVAsQ0FBYyxJQUFkLENBQVQ7QUFDSDs7QUFFRHRCLGFBQVN1QixPQUFPQyxNQUFQLENBQWNDLDJCQUFhQyxRQUFiLEVBQWQsRUFBdUN6QixZQUFZRCxNQUFuRCxFQUEyREEsTUFBM0QsQ0FBVDs7QUFFQSxXQUFPLElBQUlELE1BQUosQ0FBV0MsTUFBWCxFQUFtQkMsV0FBbkIsQ0FBUDtBQUNILENBUkQiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9jbGllbnQuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
