'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Stomp = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _frame2 = require('./frame');

var _eventemitter = require('eventemitter3');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _minilog = require('minilog');

var _minilog2 = _interopRequireDefault(_minilog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = {};
utils.really_defined = function (var_to_test) {
    return !(var_to_test == null || var_to_test == undefined);
};

var Stomp = exports.Stomp = function () {
    function Stomp(SocketImpl) {
        _classCallCheck(this, Stomp);

        Object.assign(this, _eventemitter2.default.prototype);

        this._subscribed_to = {};
        this.session = null;
        this.connected = false;
        this.SocketImpl = SocketImpl;
    }

    _createClass(Stomp, [{
        key: 'isConnected',
        value: function isConnected(ignoreSession) {
            return this.connected && (ignoreSession || this.session);
        }
    }, {
        key: 'configure',
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
        key: 'connect',
        value: function connect(credentials) {
            this.login = credentials.login;
            this.passcode = credentials.passcode;
            this._connect(this);
        }
    }, {
        key: 'is_a_message',
        value: function is_a_message(this_frame) {
            return this_frame.headers !== null && utils.really_defined(this_frame.headers['message-id']);
        }
    }, {
        key: 'should_run_message_callback',
        value: function should_run_message_callback(this_frame) {}
    }, {
        key: 'handle_new_frame',
        value: function handle_new_frame(this_frame) {

            switch (this_frame.command) {
                case "MESSAGE":
                    if (this.is_a_message(this_frame)) {
                        this.should_run_message_callback(this_frame);
                        this.emit('message', this_frame);
                    }
                    break;
                case "CONNECTED":
                    (0, _minilog2.default)('secucard.STOMP').debug('Connected');
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
                    (0, _minilog2.default)('secucard.STOMP').error('Could not parse command', this_frame.command);
            }
        }
    }, {
        key: 'disconnect',
        value: function disconnect() {
            this._disconnect(this);
        }
    }, {
        key: 'subscribe',
        value: function subscribe(headers, callback) {

            var destination = headers['destination'];
            headers['session'] = this.session;
            this.send_command(this, 'SUBSCRIBE', headers);

            this._subscribed_to[destination] = { enabled: true, callback: callback };
        }
    }, {
        key: 'unsubscribe',
        value: function unsubscribe(headers) {
            var destination = headers['destination'];
            headers['session'] = this.session;
            this.send_command(this, 'UNSUBSCRIBE', headers);
            this._subscribed_to[destination].enabled = false;
        }
    }, {
        key: 'ack',
        value: function ack(message_id) {
            this.send_command(this, 'ACK', { 'message-id': message_id });
        }
    }, {
        key: 'begin',
        value: function begin() {
            var transaction_id = Math.floor(Math.random() * 99999999999).toString();
            this.send_command(this, 'BEGIN', { 'transaction': transaction_id });

            return transaction_id;
        }
    }, {
        key: 'commit',
        value: function commit(transaction_id) {
            this.send_command(this, 'COMMIT', { 'transaction': transaction_id });
        }
    }, {
        key: 'abort',
        value: function abort(transaction_id) {
            this.send_command(this, 'ABORT', { 'transaction': transaction_id });
        }
    }, {
        key: 'send',
        value: function send(destination, headers, body, withReceipt) {
            headers['session'] = this.session;
            headers['destination'] = destination;
            (0, _minilog2.default)('secucard.STOMP').debug(headers, body);
            return this.send_command(this, 'SEND', headers, body, withReceipt);
        }
    }, {
        key: 'parse_command',
        value: function parse_command(data) {
            var command,
                this_string = data.toString('utf8', 0, data.length);
            command = this_string.split('\n');
            return command[0];
        }
    }, {
        key: 'parse_headers',
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
        key: 'parse_frame',
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
        key: '_connect',
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
        key: '_setupListeners',
        value: function _setupListeners(stomp, handleConnected) {
            var _this2 = this;

            var _connected = function _connected() {

                (0, _minilog2.default)('secucard.STOMP').debug('Connected to socket');
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
                (0, _minilog2.default)('secucard.STOMP').debug('draining');
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
                (0, _minilog2.default)('secucard.STOMP').debug('Disconnected with error:', error);
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
        key: 'stomp_connect',
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
        key: '_disconnect',
        value: function _disconnect(stomp) {

            stomp.SocketImpl.disconnect(stomp.socket);
        }
    }, {
        key: 'send_command',
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
        key: 'send_frame',
        value: function send_frame(stomp, _frame) {

            var socket = stomp.socket;
            var frame_str = _frame.as_string();

            (0, _minilog2.default)('secucard.STOMP').debug('socket write:', frame_str);

            if (socket.write(frame_str) === false) {
                (0, _minilog2.default)('secucard.STOMP').debug('Write buffered');
            }

            return true;
        }
    }, {
        key: 'createReceiptId',
        value: function createReceiptId() {

            return 'rcpt-' + _uuid2.default.v1();
        }
    }]);

    return Stomp;
}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3N0b21wLWltcGwvc3RvbXAuanMiXSwibmFtZXMiOlsidXRpbHMiLCJyZWFsbHlfZGVmaW5lZCIsInZhcl90b190ZXN0IiwidW5kZWZpbmVkIiwiU3RvbXAiLCJTb2NrZXRJbXBsIiwiT2JqZWN0IiwiYXNzaWduIiwiRUUiLCJwcm90b3R5cGUiLCJfc3Vic2NyaWJlZF90byIsInNlc3Npb24iLCJjb25uZWN0ZWQiLCJpZ25vcmVTZXNzaW9uIiwiY29uZmlnIiwicG9ydCIsImhvc3QiLCJkZWJ1ZyIsImxvZ2luIiwicGFzc2NvZGUiLCJzc2wiLCJzc2xfdmFsaWRhdGUiLCJzc2xfb3B0aW9ucyIsInZob3N0IiwiaGVhcnRiZWF0TXMiLCJlbmRwb2ludCIsImNyZWRlbnRpYWxzIiwiX2Nvbm5lY3QiLCJ0aGlzX2ZyYW1lIiwiaGVhZGVycyIsImNvbW1hbmQiLCJpc19hX21lc3NhZ2UiLCJzaG91bGRfcnVuX21lc3NhZ2VfY2FsbGJhY2siLCJlbWl0IiwiZXJyb3IiLCJfZGlzY29ubmVjdCIsImNhbGxiYWNrIiwiZGVzdGluYXRpb24iLCJzZW5kX2NvbW1hbmQiLCJlbmFibGVkIiwibWVzc2FnZV9pZCIsInRyYW5zYWN0aW9uX2lkIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9TdHJpbmciLCJib2R5Iiwid2l0aFJlY2VpcHQiLCJkYXRhIiwidGhpc19zdHJpbmciLCJsZW5ndGgiLCJzcGxpdCIsInJhd19oZWFkZXJzIiwiaGVhZGVyc19zcGxpdCIsImkiLCJoZWFkZXIiLCJoZWFkZXJfa2V5Iiwic2hpZnQiLCJ0cmltIiwiaGVhZGVyX3ZhbCIsImpvaW4iLCJjaHVuayIsImFyZ3MiLCJwYXJzZV9jb21tYW5kIiwic2xpY2UiLCJ0aGVfcmVzdCIsInBhcnNlX2hlYWRlcnMiLCJGcmFtZSIsInJldHVybl9mcmFtZSIsImJ1aWxkX2ZyYW1lIiwic3RvbXAiLCJvbkluaXQiLCJzb2NrZXQiLCJoYW5kbGVDb25uZWN0ZWQiLCJfc2V0dXBMaXN0ZW5lcnMiLCJvbkVycm9yIiwiZXJyIiwiY29ubmVjdCIsIl9jb25uZWN0ZWQiLCJzdG9tcF9jb25uZWN0Iiwib24iLCJidWZmZXIiLCJmcmFtZXMiLCJwb3AiLCJwYXJzZWRfZnJhbWUiLCJfZnJhbWUiLCJwYXJzZV9mcmFtZSIsImhhbmRsZV9uZXdfZnJhbWUiLCJmcmFtZV90b19zZW5kIiwic2VuZF9mcmFtZSIsImRpc2Nvbm5lY3QiLCJjcmVhdGVSZWNlaXB0SWQiLCJmcmFtZV9zdHIiLCJhc19zdHJpbmciLCJ3cml0ZSIsIlVVSUQiLCJ2MSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBV0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQUlBLFFBQVEsRUFBWjtBQUNBQSxNQUFNQyxjQUFOLEdBQXVCLFVBQUNDLFdBQUQsRUFBaUI7QUFDcEMsV0FBTyxFQUFFQSxlQUFlLElBQWYsSUFBdUJBLGVBQWVDLFNBQXhDLENBQVA7QUFDSCxDQUZEOztJQUlhQyxLLFdBQUFBLEs7QUFFVCxtQkFBWUMsVUFBWixFQUF3QjtBQUFBOztBQUVwQkMsZUFBT0MsTUFBUCxDQUFjLElBQWQsRUFBb0JDLHVCQUFHQyxTQUF2Qjs7QUFFQSxhQUFLQyxjQUFMLEdBQXNCLEVBQXRCO0FBQ0EsYUFBS0MsT0FBTCxHQUFlLElBQWY7QUFDQSxhQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsYUFBS1AsVUFBTCxHQUFrQkEsVUFBbEI7QUFFSDs7OztvQ0FFV1EsYSxFQUFlO0FBQ3ZCLG1CQUFPLEtBQUtELFNBQUwsS0FBbUJDLGlCQUFpQixLQUFLRixPQUF6QyxDQUFQO0FBQ0g7OztrQ0FFU0csTSxFQUFROztBQUVkLGlCQUFLQyxJQUFMLEdBQVlELE9BQU8sTUFBUCxLQUFrQixLQUE5QjtBQUNBLGlCQUFLRSxJQUFMLEdBQVlGLE9BQU8sTUFBUCxLQUFrQixXQUE5QjtBQUNBLGlCQUFLRyxLQUFMLEdBQWFILE9BQU8sT0FBUCxDQUFiO0FBQ0EsaUJBQUtJLEtBQUwsR0FBYUos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
