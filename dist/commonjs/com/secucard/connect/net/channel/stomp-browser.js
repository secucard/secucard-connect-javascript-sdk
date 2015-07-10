'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _stompWebsocket = require('stomp-websocket');

var _stompWebsocket2 = _interopRequireDefault(_stompWebsocket);

var _sockjsClient = require('sockjs-client');

var _sockjsClient2 = _interopRequireDefault(_sockjsClient);

var TEMP_QUEUE = '/temp-queue/main';

var REQUEST_DESTINATION = '/exchange/connect.api';

var notify = function notify(event, details) {
  if (this._listener) {
    this._listener(event, details);
  }
};

var stompDestination = function stompDestination(requestMethod) {
  return REQUEST_DESTINATION + '/' + requestMethod;
};

var tempQueue = function tempQueue() {
  return TEMP_QUEUE;
};

var header = function header(requestId, options) {
  var _header = {
    'user-id': this.accessToken,
    'reply-to': tempQueue(),
    'correlation-id': requestId
  };
  if (options.appId) {
    _header['app-id'] = options.appId;
  }
  return _header;
};

var StompBrowser = (function () {
  function StompBrowser(wsUrl) {
    _classCallCheck(this, StompBrowser);

    this.wsUrl = wsUrl;
    this._listener = null;
    return this;
  }

  StompBrowser.prototype.listener = function listener(_listener) {
    this._listener = _listener;
    return this;
  };

  StompBrowser.prototype.notifyListener = function notifyListener(event, details) {
    notify.call(this, event, details);
  };

  StompBrowser.prototype.requestHeader = function requestHeader(requestId, options) {
    header.call(this, requestId, options);
  };

  StompBrowser.prototype.request = function request(_ref) {
    var _ref$accessToken = _ref.accessToken;
    var accessToken = _ref$accessToken === undefined ? '' : _ref$accessToken;
    var _ref$requestMethod = _ref.requestMethod;
    var requestMethod = _ref$requestMethod === undefined ? '' : _ref$requestMethod;
    var _ref$requestId = _ref.requestId;
    var requestId = _ref$requestId === undefined ? '' : _ref$requestId;
    var _ref$options = _ref.options;
    var options = _ref$options === undefined ? {} : _ref$options;

    var self = this;
    var client = _stompWebsocket2['default'].over(new _sockjsClient2['default'].SockJS(self.wsUrl));
    var destination = stompDestination(requestMethod);
    var connect = function connect() {
      var onerror = function onerror(frame) {
        self.notifyListener('error', frame);
      };
      client.connect(accessToken, accessToken, function (frame) {
        self.notifyListener('connected');
        client.subscribe(destination, function (message) {
          var type = message.correlationId ? 'message' : 'event';
          self.notifyListener(type, message);
          if (type == 'message') {
            client.disconnect();
          }
        });
        client.send(destination, self.requestHeader(requestId, options), JSON.stringify(options.payload || {}));
      }, onerror, '/');
    };
    connect();
  };

  return StompBrowser;
})();

exports.StompBrowser = StompBrowser;