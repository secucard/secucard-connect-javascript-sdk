"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stomp = void 0;
var _frame2 = require("./frame");
var _eventemitter = _interopRequireDefault(require("eventemitter3"));
var _uuid = _interopRequireDefault(require("uuid"));
var _minilog = _interopRequireDefault(require("minilog"));
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
var Stomp = function () {
  function Stomp(SocketImpl) {
    _classCallCheck(this, Stomp);
    Object.assign(this, _eventemitter["default"].prototype);
    this._subscribed_to = {};
    this.session = null;
    this.connected = false;
    this.SocketImpl = SocketImpl;
  }
  _createClass(Stomp, [{
    key: "isConnected",
    value: function isConnected(ignoreSession) {
      return this.connected && (ignoreSession || this.session);
    }
  }, {
    key: "configure",
    value: function configure(config) {
      this.port = config['port'] || 61613;
      this.host = config['host'] || '127.0.0.1';
      this.debug = config['debug'];
      this.login = config['login'] || null;
      this.passcode = config['passcode'] || null;
      this.ssl = config['ssl'] ? true : false;
      this.ssl_validate = config['ssl_validate'] ? true : false;
      this.ssl_options = config['ssl_options'] || {};
      this.vhost = config['vhost'];
      this.heartbeatMs = config['heartbeatMs'];
      this.endpoint = config['endpoint'] || '';
      this['client-id'] = config['client-id'] || null;
    }
  }, {
    key: "connect",
    value: function connect(credentials) {
      this.login = credentials.login;
      this.passcode = credentials.passcode;
      this._connect(this);
    }
  }, {
    key: "is_a_message",
    value: function is_a_message(this_frame) {
      return this_frame.headers !== null && utils.really_defined(this_frame.headers['message-id']);
    }
  }, {
    key: "should_run_message_callback",
    value: function should_run_message_callback(this_frame) {}
  }, {
    key: "handle_new_frame",
    value: function handle_new_frame(this_frame) {
      switch (this_frame.command) {
        case "MESSAGE":
          if (this.is_a_message(this_frame)) {
            this.should_run_message_callback(this_frame);
            this.emit('message', this_frame);
          }
          break;
        case "CONNECTED":
          (0, _minilog["default"])('secucard.STOMP').debug('Connected');
          this.session = this_frame.headers['session'];
          this.emit('connected');
          break;
        case "RECEIPT":
          this.emit('receipt', this_frame.headers['receipt-id']);
          break;
        case "ERROR":
          this.emit('error', this_frame);
          break;
        default:
          (0, _minilog["default"])('secucard.STOMP').error('Could not parse command', this_frame.command);
      }
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      this._disconnect(this);
    }
  }, {
    key: "subscribe",
    value: function subscribe(headers, callback) {
      var destination = headers['destination'];
      headers['session'] = this.session;
      this.send_command(this, 'SUBSCRIBE', headers);
      this._subscribed_to[destination] = {
        enabled: true,
        callback: callback
      };
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(headers) {
      var destination = headers['destination'];
      headers['session'] = this.session;
      this.send_command(this, 'UNSUBSCRIBE', headers);
      this._subscribed_to[destination].enabled = false;
    }
  }, {
    key: "ack",
    value: function ack(message_id) {
      this.send_command(this, 'ACK', {
        'message-id': message_id
      });
    }
  }, {
    key: "begin",
    value: function begin() {
      var transaction_id = Math.floor(Math.random() * 99999999999).toString();
      this.send_command(this, 'BEGIN', {
        'transaction': transaction_id
      });
      return transaction_id;
    }
  }, {
    key: "commit",
    value: function commit(transaction_id) {
      this.send_command(this, 'COMMIT', {
        'transaction': transaction_id
      });
    }
  }, {
    key: "abort",
    value: function abort(transaction_id) {
      this.send_command(this, 'ABORT', {
        'transaction': transaction_id
      });
    }
  }, {
    key: "send",
    value: function send(destination, headers, body, withReceipt) {
      headers['session'] = this.session;
      headers['destination'] = destination;
      (0, _minilog["default"])('secucard.STOMP').debug(headers, body);
      return this.send_command(this, 'SEND', headers, body, withReceipt);
    }
  }, {
    key: "parse_command",
    value: function parse_command(data) {
      var command,
        this_string = data.toString('utf8', 0, data.length);
      command = this_string.split('\n');
      return command[0];
    }
  }, {
    key: "parse_headers",
    value: function parse_headers(raw_headers) {
      var headers = {},
        headers_split = raw_headers.split('\n');
      for (var i = 0; i < headers_split.length; i++) {
        var header = headers_split[i].split(':');
        if (header.length > 1) {
          var header_key = header.shift().trim();
          var header_val = header.join(':').trim();
          headers[header_key] = header_val;
          continue;
        }
        headers[header[0].trim()] = header[1].trim();
      }
      return headers;
    }
  }, {
    key: "parse_frame",
    value: function parse_frame(chunk) {
      var args = {},
        data = null,
        command = null,
        headers = null,
        body = null;
      if (!utils.really_defined(chunk)) {
        return null;
      }
      command = this.parse_command(chunk);
      data = chunk.slice(command.length + 1, chunk.length);
      data = data.toString('utf8', 0, data.length);
      var the_rest = data.split('\n\n');
      headers = this.parse_headers(the_rest[0]);
      body = the_rest.slice(1, the_rest.length);
      if ('content-length' in headers) {
        headers['bytes_message'] = true;
      }
      args = {
        command: command,
        headers: headers,
        body: body
      };
      var this_frame = new _frame2.Frame();
      var return_frame = this_frame.build_frame(args);
      return return_frame;
    }
  }, {
    key: "_connect",
    value: function _connect(stomp) {
      var _this = this;
      var onInit = function onInit(socket, handleConnected) {
        stomp.socket = socket;
        _this._setupListeners(stomp, handleConnected);
      };
      var onError = function onError(err) {
        stomp.emit('connectionError', err);
      };
      stomp.SocketImpl.connect(stomp.host, stomp.port, stomp.endpoint, stomp.ssl, stomp.ssl_options, stomp.ssl_validate, onInit, onError);
    }
  }, {
    key: "_setupListeners",
    value: function _setupListeners(stomp, handleConnected) {
      var _this2 = this;
      var _connected = function _connected() {
        (0, _minilog["default"])('secucard.STOMP').debug('Connected to socket');
        _this2.connected = true;
        var headers = {};
        if (utils.really_defined(stomp.login) && utils.really_defined(stomp.passcode)) {
          headers.login = stomp.login;
          headers.passcode = stomp.passcode;
        }
        if (utils.really_defined(stomp["client-id"])) {
          headers["client-id"] = stomp["client-id"];
        }
        if (utils.really_defined(stomp["vhost"])) {
          headers["host"] = stomp["vhost"];
        }
        _this2.stomp_connect(stomp, headers);
      };
      var socket = stomp.socket;
      socket.on('drain', function (data) {
        (0, _minilog["default"])('secucard.STOMP').debug('draining');
      });
      var buffer = '';
      socket.on('data', function (chunk) {
        buffer += chunk;
        var frames = buffer.split('\0\n');
        if (frames.length == 1) {
          frames = buffer.split('\0');
        }
        if (frames.length == 1) return;
        buffer = frames.pop();
        var parsed_frame = null;
        var _frame = null;
        while (_frame = frames.shift()) {
          parsed_frame = _this2.parse_frame(_frame);
          stomp.handle_new_frame(parsed_frame);
        }
      });
      socket.on('end', function () {});
      socket.on('close', function (error) {
        (0, _minilog["default"])('secucard.STOMP').debug('Disconnected with error:', error);
        stomp.session = null;
        stomp.connected = false;
        stomp.emit("disconnected", error);
      });
      if (handleConnected) {
        _connected();
      } else {
        socket.on('connect', _connected);
      }
    }
  }, {
    key: "stomp_connect",
    value: function stomp_connect(stomp, headers) {
      var _frame = new _frame2.Frame(),
        args = {},
        headers = headers || {};
      if (this.heartbeatMs > 0) {
        headers['heart-beat'] = this.heartbeatMs + ',0';
      }
      args['command'] = 'CONNECT';
      args['headers'] = headers;
      var frame_to_send = _frame.build_frame(args);
      this.send_frame(stomp, frame_to_send);
    }
  }, {
    key: "_disconnect",
    value: function _disconnect(stomp) {
      stomp.SocketImpl.disconnect(stomp.socket);
    }
  }, {
    key: "send_command",
    value: function send_command(stomp, command, headers, body, withReceipt) {
      var withReceipt = withReceipt || false;
      if (!utils.really_defined(headers)) {
        headers = {};
      }
      if (withReceipt) {
        headers['receipt'] = this.createReceiptId();
      }
      var args = {
        'command': command,
        'headers': headers,
        'body': body
      };
      var _frame = new _frame2.Frame();
      var this_frame = _frame.build_frame(args);
      this.send_frame(stomp, this_frame);
      return this_frame;
    }
  }, {
    key: "send_frame",
    value: function send_frame(stomp, _frame) {
      var socket = stomp.socket;
      var frame_str = _frame.as_string();
      (0, _minilog["default"])('secucard.STOMP').debug('socket write:', frame_str);
      if (socket.write(frame_str) === false) {
        (0, _minilog["default"])('secucard.STOMP').debug('Write buffered');
      }
      return true;
    }
  }, {
    key: "createReceiptId",
    value: function createReceiptId() {
      return 'rcpt-' + _uuid["default"].v1();
    }
  }]);
  return Stomp;
}();
exports.Stomp = Stomp;