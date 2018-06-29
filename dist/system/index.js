'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MiniLog = exports.SecucardConnect = exports.Channel = exports.Services = undefined;

var _clientNodeEnvironment = require('./de.secucard.connect/client-node-environment');

Object.defineProperty(exports, 'Services', {
  enumerable: true,
  get: function get() {
    return _clientNodeEnvironment.ServiceMap;
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

var SecucardConnect = exports.SecucardConnect = {
  description: 'SecucardConnect for nodejs'
};

var MiniLog = exports.MiniLog = _minilog2.default;
_minilog2.default.suggest.deny(/secucard\..*/, 'warn');

SecucardConnect.create = function (config) {
  return _client.Client.create(config, _clientNodeEnvironment.ClientNodeEnvironment);
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIlNlcnZpY2VNYXAiLCJDaGFubmVsIiwiU2VjdWNhcmRDb25uZWN0IiwiZGVzY3JpcHRpb24iLCJNaW5pTG9nIiwibWluaWxvZyIsInN1Z2dlc3QiLCJkZW55IiwiY3JlYXRlIiwiY29uZmlnIiwiQ2xpZW50IiwiQ2xpZW50Tm9kZUVudmlyb25tZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7O2tDQUlRQSxVOzs7Ozs7Ozs7b0JBQ0FDLE87Ozs7QUFKUjs7QUFDQTs7Ozs7O0FBS08sSUFBTUMsNENBQWtCO0FBQzdCQyxlQUFhO0FBRGdCLENBQXhCOztBQUlBLElBQU1DLDRCQUFVQyxpQkFBaEI7QUFDUEEsa0JBQVFDLE9BQVIsQ0FBZ0JDLElBQWhCLENBQXFCLGNBQXJCLEVBQXFDLE1BQXJDOztBQUVBTCxnQkFBZ0JNLE1BQWhCLEdBQXlCLFVBQUNDLE1BQUQsRUFBWTtBQUNuQyxTQUFPQyxlQUFPRixNQUFQLENBQWNDLE1BQWQsRUFBc0JFLDRDQUF0QixDQUFQO0FBQ0QsQ0FGRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
