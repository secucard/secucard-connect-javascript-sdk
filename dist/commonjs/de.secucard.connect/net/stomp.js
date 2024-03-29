"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stomp = void 0;
var _uuid = _interopRequireDefault(require("uuid"));
var _eventemitter = _interopRequireDefault(require("eventemitter3"));
var _minilog = _interopRequireDefault(require("minilog"));
var _channel = require("./channel");
var _stomp = require("./stomp-impl/stomp");
var _exception = require("./exception");
var _exception2 = require("../auth/exception");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var utils = {};
utils.really_defined = function (var_to_test) {
  return !(var_to_test == null || var_to_test == undefined);
};
utils.sizeOfUTF8 = function (str) {
  var size = 0;
  if (str) {
    size = encodeURI(str).match(/%..|./g).length;
  }
  return size;
};
var Stomp = function () {
  function Stomp(SocketImpl) {
    _classCallCheck(this, Stomp);
    Object.assign(this, _eventemitter["default"].prototype);
    this.connection = null;
    this.messages = {};
    this.skipSessionRefresh = false;
    this.sessionTimer = null;
    this.connectAccessToken = null;
    this.stompCommands = {};
    this.stompCommands[_channel.Channel.METHOD.GET] = 'get';
    this.stompCommands[_channel.Channel.METHOD.CREATE] = 'add';
    this.stompCommands[_channel.Channel.METHOD.EXECUTE] = 'exec';
    this.stompCommands[_channel.Channel.METHOD.UPDATE] = 'update';
    this.stompCommands[_channel.Channel.METHOD.DELETE] = 'delete';
    this.connection = new _stomp.Stomp(SocketImpl);
    this.connection.on('message', this._handleStompMessage.bind(this));
  }
  _createClass(Stomp, [{
    key: "configureWithContext",
    value: function configureWithContext(context) {
      this.emitServiceEvent = context.emitServiceEvent.bind(context);
      this.getToken = function (extend) {
        return context.getAuth().getToken(extend);
      };
      this.getStompHost = function () {
        return context.getConfig().getStompHost();
      };
      this.getStompPort = function () {
        return context.getConfig().getStompPort();
      };
      this.getStompSslEnabled = function () {
        return context.getConfig().getStompSslEnabled();
      };
      this.getStompVHost = function () {
        return context.getConfig().getStompVHost();
      };
      this.getStompQueue = function () {
        return context.getConfig().getStompQueue();
      };
      this.getStompDestination = function () {
        return context.getConfig().getStompDestination();
      };
      this.getStompEndpoint = function () {
        return context.getConfig().getStompEndpoint();
      };
      this.getStompHeartbeatMs = function () {
        return context.getConfig().getStompHeartbeatMs();
      };
    }
  }, {
    key: "getStompConfig",
    value: function getStompConfig() {
      return {
        host: this.getStompHost(),
        port: this.getStompPort(),
        ssl: this.getStompSslEnabled(),
        vhost: this.getStompVHost(),
        heartbeatMs: this.getStompHeartbeatMs(),
        endpoint: this.getStompEndpoint(),
        login: '',
        passcode: ''
      };
    }
  }, {
    key: "open",
    value: function open() {
      return this._startSessionRefresh();
    }
  }, {
    key: "connect",
    value: function connect() {
      var _this = this;
      (0, _minilog["default"])('secucard.stomp').debug('stomp start connection');
      return this.getToken().then(function (token) {
        (0, _minilog["default"])('secucard.stomp').debug('Got token', token);
        return _this._connect(token.access_token);
      });
    }
  }, {
    key: "close",
    value: function close() {
      if (this.sessionTimer) {
        clearInterval(this.sessionTimer);
      }
      return this._disconnect();
    }
  }, {
    key: "_disconnect",
    value: function _disconnect() {
      var _this2 = this;
      return new Promise(function (resolve, reject) {
        var ignoreSession = true;
        if (!_this2.connection.isConnected(ignoreSession)) {
          resolve();
          return;
        }
        if (_this2.connection && _this2.connection.disconnect) {
          _this2.connection.disconnect();
          _this2._stompOnDisconnected = function () {
            (0, _minilog["default"])('secucard.stomp').debug('stomp disconnected');
            _this2.connection.removeListener('disconnected', _this2._stompOnDisconnected);
            delete _this2._stompOnDisconnected;
            resolve();
          };
          _this2.connection.on('disconnected', _this2._stompOnDisconnected);
        } else {
          resolve();
        }
      });
    }
  }, {
    key: "request",
    value: function request(method, params) {
      var destination = this.buildDestination(method, params);
      var message = this.createMessage(params);
      return this._sendMessage(destination, message)["catch"](function (err) {
        err.request = JSON.stringify({
          method: method,
          params: params
        });
        throw err;
      });
    }
  }, {
    key: "buildDestination",
    value: function buildDestination(method, params) {
      var destination = {};
      if (params.endpoint != null) {
        destination.endpoint = params.endpoint;
      } else if (params.appId != null) {
        destination.appId = params.appId;
      } else {
        throw new Error('Missing object spec or app id');
      }
      destination.command = this.stompCommands[method];
      if (!destination.command) {
        throw new Error('Invalid method arg');
      }
      destination.action = params.action;
      return destination;
    }
  }, {
    key: "createMessage",
    value: function createMessage(params) {
      var message = {};
      if (utils.really_defined(params.objectId)) {
        message.pid = params.objectId;
      }
      if (utils.really_defined(params.actionArg)) {
        message.sid = params.actionArg;
      }
      if (utils.really_defined(params.queryParams)) {
        message.query = params.queryParams;
      }
      if (utils.really_defined(params.data)) {
        message.data = params.data;
      }
      return message;
    }
  }, {
    key: "_connect",
    value: function _connect(accessToken) {
      var _this3 = this;
      if (!accessToken) {
        return this.close().then(function () {
          return Promise.reject(new _exception2.AuthenticationFailedException('Access token is not valid'));
        });
      }
      this.connectAccessToken = accessToken;
      var stompCredentials = {
        login: accessToken,
        passcode: accessToken
      };
      this.connection.configure(this.getStompConfig());
      this.connection.connect(stompCredentials);
      return new Promise(function (resolve, reject) {
        _this3._stompOnConnected = function () {
          (0, _minilog["default"])('secucard.stomp').debug('stomp connected');
          _this3._stompClearListeners ? _this3._stompClearListeners() : null;
          resolve(true);
        };
        _this3._stompOnError = function (message) {
          (0, _minilog["default"])('secucard.stomp').error('stomp error', message);
          _this3._stompClearListeners ? _this3._stompClearListeners() : null;
          _this3.close().then(function () {
            if (message.headers && message.headers.message == 'Bad CONNECT') {
              reject(new _exception2.AuthenticationFailedException(message.body[0]));
            } else {
              reject(message);
            }
          });
        };
        _this3._stompClearListeners = function () {
          _this3.connection.removeListener('connected', _this3._stompOnConnected);
          _this3.connection.removeListener('error', _this3._stompOnError);
          delete _this3._stompOnConnected;
          delete _this3._stompOnError;
          delete _this3._stompClearListeners;
        };
        _this3.connection.on('connected', _this3._stompOnConnected);
        _this3.connection.on('error', _this3._stompOnError);
      });
    }
  }, {
    key: "_sendMessage",
    value: function _sendMessage(destinationObj, message) {
      var _this4 = this;
      (0, _minilog["default"])('secucard.stomp').debug('message', destinationObj, message);
      return this.getToken(true).then(function (token) {
        var accessToken = token.access_token;
        var correlationId = _this4.createCorrelationId();
        var headers = {};
        headers['reply-to'] = _this4.getStompQueue();
        headers['content-type'] = 'application/json';
        headers['user-id'] = accessToken;
        headers['correlation-id'] = correlationId;
        if (destinationObj.appId) {
          headers['app-id'] = destinationObj.appId;
        }
        var body = JSON.stringify(message);
        headers['content-length'] = utils.sizeOfUTF8(body);
        var destination = _this4.getStompDestination();
        if (destinationObj.appId) {
          destination += 'app:' + destinationObj.action;
        } else {
          destination += 'api:' + destinationObj.command + ':';
          var endpoint = [];
          if (destinationObj.endpoint) {
            endpoint = endpoint.concat(destinationObj.endpoint);
          }
          if (destinationObj.action) {
            endpoint.push(destinationObj.action);
          }
          destination += endpoint.join('.');
        }
        var sendWithStomp = function sendWithStomp() {
          return new Promise(function (resolve, reject) {
            _this4.messages[correlationId] = {
              resolve: resolve,
              reject: reject
            };
            _this4.connection.send(destination, headers, body);
          });
        };
        if (!_this4.connection.isConnected() || accessToken != _this4.connectAccessToken) {
          if (_this4.connection.isConnected()) {
            (0, _minilog["default"])('secucard.stomp').warn('Reconnect due token change.');
          }
          return _this4._disconnect().then(function () {
            return _this4._runSessionRefresh().then(sendWithStomp);
          });
        }
        return sendWithStomp();
      });
    }
  }, {
    key: "_startSessionRefresh",
    value: function _startSessionRefresh() {
      var _this5 = this;
      (0, _minilog["default"])('secucard.stomp').debug('Stomp session refresh loop started');
      var initial = true;
      var sessionInterval = this.getStompHeartbeatMs() > 0 ? this.getStompHeartbeatMs() - 500 : 25 * 1000;
      this.sessionTimer = setInterval(function () {
        if (_this5.skipSessionRefresh) {
          _this5.skipSessionRefresh = false;
        } else {
          _this5._runSessionRefresh(false);
        }
      }, sessionInterval);
      return this._runSessionRefresh(initial);
    }
  }, {
    key: "_runSessionRefresh",
    value: function _runSessionRefresh(initial) {
      var _this6 = this;
      var createRefreshRequest = function createRefreshRequest() {
        return _this6.request(_channel.Channel.METHOD.EXECUTE, {
          endpoint: ['auth', 'sessions'],
          objectId: 'me',
          action: 'refresh'
        }).then(function (res) {
          _this6.emit('sessionRefresh');
          (0, _minilog["default"])('secucard.stomp').debug('Session refresh sent');
          _this6.skipSessionRefresh = false;
          return res;
        })["catch"](function (err) {
          _this6.emit('sessionRefreshError');
          (0, _minilog["default"])('secucard.stomp').error('Session refresh failed');
          if (initial) {
            throw err;
          }
        });
      };
      if (!this.connection.isConnected()) {
        return this.connect().then(createRefreshRequest);
      } else {
        return createRefreshRequest();
      }
    }
  }, {
    key: "_handleStompMessage",
    value: function _handleStompMessage(frame) {
      this.skipSessionRefresh = true;
      (0, _minilog["default"])('secucard.stomp').debug('_handleStompMessage', frame);
      var body;
      if (frame && frame.headers && frame.headers['correlation-id']) {
        var correlationId = frame.headers['correlation-id'];
        body = JSON.parse(frame.body[0]);
        if (body.status == 'ok') {
          this.messages[correlationId].resolve(body.data);
        } else {
          var error = _exception.SecucardConnectException.create(body);
          this.messages[correlationId].reject(error);
        }
        delete this.messages[correlationId];
      } else if (frame) {
        body = JSON.parse(frame.body[0]);
        this.emitServiceEvent(null, body.target, body.type, body.data);
      }
    }
  }, {
    key: "createCorrelationId",
    value: function createCorrelationId() {
      return _uuid["default"].v1();
    }
  }]);
  return Stomp;
}();
exports.Stomp = Stomp;