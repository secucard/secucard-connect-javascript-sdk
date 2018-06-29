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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyb3dzZXIuanMiXSwibmFtZXMiOlsiU2VydmljZU1hcCIsIkNoYW5uZWwiLCJNaW5pTG9nIiwibWluaWxvZyIsInN1Z2dlc3QiLCJkZW55IiwiU2VjdWNhcmRDb25uZWN0IiwiZGVzY3JpcHRpb24iLCJjcmVhdGUiLCJjb25maWciLCJDbGllbnQiLCJDbGllbnRCcm93c2VyRW52aXJvbm1lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7cUNBSVFBLFU7Ozs7Ozs7OztvQkFDQUMsTzs7OztBQUpSOztBQUNBOzs7Ozs7QUFLTyxJQUFNQyw0QkFBVUMsaUJBQWhCO0FBQ1BBLGtCQUFRQyxPQUFSLENBQWdCQyxJQUFoQixDQUFxQixjQUFyQixFQUFxQyxNQUFyQzs7QUFFTyxJQUFNQyw0Q0FBa0I7QUFDN0JDLGVBQWE7QUFEZ0IsQ0FBeEI7O0FBSVBELGdCQUFnQkUsTUFBaEIsR0FBeUIsVUFBQ0MsTUFBRCxFQUFZO0FBQ25DLFNBQU9DLGVBQU9GLE1BQVAsQ0FBY0MsTUFBZCxFQUFzQkUsa0RBQXRCLENBQVA7QUFDRCxDQUZEIiwiZmlsZSI6ImJyb3dzZXIuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
