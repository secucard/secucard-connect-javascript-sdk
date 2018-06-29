'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecucardConnect = exports.MiniLog = exports.Channel = exports.Services = undefined;

var _clientBrowserEnvironment = require('./de.secucard.connect/client-browser-environment');

Object.defineProperty(exports, 'Services', {
  enumerable: true,
  get: function get() {
    return _clientBrowserEnvironment.ServiceMap;
  }
});

var _channel = require('./de.secucard.connect/net/channel');

Object.defineProperty(exports, 'Channel', {
  enumerable: true,
  get: function get() {
    return _channel.Channel;
  }
});

var _client = require('./de.secucard.connect/client');

var _minilog = require('minilog');

var _minilog2 = _interopRequireDefault(_minilog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MiniLog = exports.MiniLog = _minilog2.default;
_minilog2.default.suggest.deny(/secucard\..*/, 'warn');

var SecucardConnect = exports.SecucardConnect = {
  description: 'SecucardConnect for browser'
};

SecucardConnect.create = function (config) {
  return _client.Client.create(config, _clientBrowserEnvironment.ClientBrowserEnvironment);
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyb3dzZXItc2hpbWVkLmpzIl0sIm5hbWVzIjpbIlNlcnZpY2VNYXAiLCJDaGFubmVsIiwiTWluaUxvZyIsIm1pbmlsb2ciLCJzdWdnZXN0IiwiZGVueSIsIlNlY3VjYXJkQ29ubmVjdCIsImRlc2NyaXB0aW9uIiwiY3JlYXRlIiwiY29uZmlnIiwiQ2xpZW50IiwiQ2xpZW50QnJvd3NlckVudmlyb25tZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7O3FDQUlRQSxVOzs7Ozs7Ozs7b0JBQ0FDLE87Ozs7QUFKUjs7QUFDQTs7Ozs7O0FBS08sSUFBTUMsNEJBQVVDLGlCQUFoQjtBQUNQQSxrQkFBUUMsT0FBUixDQUFnQkMsSUFBaEIsQ0FBcUIsY0FBckIsRUFBcUMsTUFBckM7O0FBRU8sSUFBTUMsNENBQWtCO0FBQzdCQyxlQUFhO0FBRGdCLENBQXhCOztBQUlQRCxnQkFBZ0JFLE1BQWhCLEdBQXlCLFVBQUNDLE1BQUQsRUFBWTtBQUNuQyxTQUFPQyxlQUFPRixNQUFQLENBQWNDLE1BQWQsRUFBc0JFLGtEQUF0QixDQUFQO0FBQ0QsQ0FGRCIsImZpbGUiOiJicm93c2VyLXNoaW1lZC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
