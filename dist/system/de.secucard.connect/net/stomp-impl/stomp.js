System.register(['./frame', 'eventemitter3', 'uuid', 'minilog'], function (_export) {
    'use strict';

    var Frame, EE, UUID, minilog, utils, Stomp;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [function (_frame2) {
            Frame = _frame2.Frame;
        }, function (_eventemitter3) {
            EE = _eventemitter3['default'];
        }, function (_uuid) {
            UUID = _uuid['default'];
        }, function (_minilog) {
            minilog = _minilog['default'];
        }],
        execute: function () {
            utils = {};

            utils.really_defined = function (var_to_test) {
                return !(var_to_test == null || var_to_test == undefined);
            };

            Stomp = (function () {
                function Stomp(SocketImpl) {
                    _classCallCheck(this, Stomp);

                    Object.assign(this, EE.prototype);

                    this._subscribed_to = {};
                    this.session = null;
                    this.connected = false;
                    this.SocketImpl = SocketImpl;
                }

                Stomp.prototype.isConnected = function isConnected(ignoreSession) {
                    return this.connected && (ignoreSession || this.session);
                };

                Stomp.prototype.configure = function configure(config) {

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
                };

                Stomp.prototype.connect = function connect(credentials) {
                    this.login = credentials.login;
                    this.passcode = credentials.passcode;
                    this._connect(this);
                };

                Stomp.prototype.is_a_message = function is_a_message(this_frame) {
                    return this_frame.headers !== null && utils.really_defined(this_frame.headers['message-id']);
                };

                Stomp.prototype.should_run_message_callback = function should_run_message_callback(this_frame) {};

                Stomp.prototype.handle_new_frame = function handle_new_frame(this_frame) {

                    switch (this_frame.command) {
                        case "MESSAGE":
                            if (this.is_a_message(this_frame)) {
                                this.should_run_message_callback(this_frame);
                                this.emit('message', this_frame);
                            }
                            break;
                        case "CONNECTED":
                            minilog('secucard.STOMP').debug('Connected');
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
                            minilog('secucard.STOMP').error('Could not parse command', this_frame.command);
                    }
                };

                Stomp.prototype.disconnect = function disconnect() {
                    this._disconnect(this);
                };

                Stomp.prototype.subscribe = function subscribe(headers, callback) {

                    var destination = headers['destination'];
                    headers['session'] = this.session;
                    this.send_command(this, 'SUBSCRIBE', headers);

                    this._subscribed_to[destination] = { enabled: true, callback: callback };
                };

                Stomp.prototype.unsubscribe = function unsubscribe(headers) {
                    var destination = headers['destination'];
                    headers['session'] = this.session;
                    this.send_command(this, 'UNSUBSCRIBE', headers);
                    this._subscribed_to[destination].enabled = false;
                };

                Stomp.prototype.ack = function ack(message_id) {
                    this.send_command(this, 'ACK', { 'message-id': message_id });
                };

                Stomp.prototype.begin = function begin() {
                    var transaction_id = Math.floor(Math.random() * 99999999999).toString();
                    this.send_command(this, 'BEGIN', { 'transaction': transaction_id });

                    return transaction_id;
                };

                Stomp.prototype.commit = function commit(transaction_id) {
                    this.send_command(this, 'COMMIT', { 'transaction': transaction_id });
                };

                Stomp.prototype.abort = function abort(transaction_id) {
                    this.send_command(this, 'ABORT', { 'transaction': transaction_id });
                };

                Stomp.prototype.send = function send(destination, headers, body, withReceipt) {
                    headers['session'] = this.session;
                    headers['destination'] = destination;
                    minilog('secucard.STOMP').debug(headers, body);
                    return this.send_command(this, 'SEND', headers, body, withReceipt);
                };

                Stomp.prototype.parse_command = function parse_command(data) {
                    var command,
                        this_string = data.toString('utf8', 0, data.length);
                    command = this_string.split('\n');
                    return command[0];
                };

                Stomp.prototype.parse_headers = function parse_headers(raw_headers) {
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
                };

                Stomp.prototype.parse_frame = function parse_frame(chunk) {
                    var args = {},
                        data = null,
                        command = null,
                        headers = null,
                        body = null,
                        headers_str = null;

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

                    var this_frame = new Frame();
                    var return_frame = this_frame.build_frame(args);

                    return return_frame;
                };

                Stomp.prototype._connect = function _connect(stomp) {
                    var _this = this;

                    var onInit = function onInit(socket, handleConnected) {

                        stomp.socket = socket;
                        _this._setupListeners(stomp, handleConnected);
                    };

                    var onError = function onError(err) {
                        stomp.emit('connectionError', err);
                    };

                    stomp.SocketImpl.connect(stomp.host, stomp.port, stomp.endpoint, stomp.ssl, stomp.ssl_options, stomp.ssl_validate, onInit, onError);
                };

                Stomp.prototype._setupListeners = function _setupListeners(stomp, handleConnected) {
                    var _this2 = this;

                    var _connected = function _connected() {

                        minilog('secucard.STOMP').debug('Connected to socket');
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
                        minilog('secucard.STOMP').debug('draining');
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
                        minilog('secucard.STOMP').debug('Disconnected with error:', error);
                        stomp.session = null;
                        stomp.connected = false;
                        stomp.emit("disconnected", error);
                    });

                    if (handleConnected) {
                        _connected();
                    } else {
                        socket.on('connect', _connected);
                    }
                };

                Stomp.prototype.stomp_connect = function stomp_connect(stomp, headers) {

                    var _frame = new Frame(),
                        args = {},
                        headers = headers || {};

                    if (this.heartbeatMs > 0) {
                        headers['heart-beat'] = this.heartbeatMs + ',0';
                    }

                    args['command'] = 'CONNECT';
                    args['headers'] = headers;

                    var frame_to_send = _frame.build_frame(args);
                    this.send_frame(stomp, frame_to_send);
                };

                Stomp.prototype._disconnect = function _disconnect(stomp) {

                    stomp.SocketImpl.disconnect(stomp.socket);
                };

                Stomp.prototype.send_command = function send_command(stomp, command, headers, body, withReceipt) {

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

                    var _frame = new Frame();
                    var this_frame = _frame.build_frame(args);
                    this.send_frame(stomp, this_frame);
                    return this_frame;
                };

                Stomp.prototype.send_frame = function send_frame(stomp, _frame) {

                    var socket = stomp.socket;
                    var frame_str = _frame.as_string();

                    minilog('secucard.STOMP').debug('socket write:', frame_str);

                    if (socket.write(frame_str) === false) {
                        minilog('secucard.STOMP').debug('Write buffered');
                    }

                    return true;
                };

                Stomp.prototype.createReceiptId = function createReceiptId() {

                    return 'rcpt-' + UUID.v1();
                };

                return Stomp;
            })();

            _export('Stomp', Stomp);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3N0b21wLWltcGwvc3RvbXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2tDQWdCSSxLQUFLLEVBS0ksS0FBSzs7Ozs7OzRCQVZWLEtBQUs7Ozs7Ozs7OztBQUtULGlCQUFLLEdBQUcsRUFBRTs7QUFDZCxpQkFBSyxDQUFDLGNBQWMsR0FBRyxVQUFDLFdBQVcsRUFBSztBQUNwQyx1QkFBTyxFQUFFLFdBQVcsSUFBSSxJQUFJLElBQUksV0FBVyxJQUFJLFNBQVMsQ0FBQSxBQUFDLENBQUM7YUFDN0QsQ0FBQzs7QUFFVyxpQkFBSztBQUVILHlCQUZGLEtBQUssQ0FFRixVQUFVLEVBQUU7MENBRmYsS0FBSzs7QUFJViwwQkFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUVsQyx3QkFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDekIsd0JBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLHdCQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztBQUN2Qix3QkFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7aUJBRWhDOztBQVhRLHFCQUFLLFdBYWQsV0FBVyxHQUFBLHFCQUFDLGFBQWEsRUFBRTtBQUN2QiwyQkFBTyxJQUFJLENBQUMsU0FBUyxLQUFLLGFBQWEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFBLEFBQUMsQ0FBQztpQkFDNUQ7O0FBZlEscUJBQUssV0FpQmQsU0FBUyxHQUFBLG1CQUFDLE1BQU0sRUFBRTs7QUFFZCx3QkFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDO0FBQ3BDLHdCQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxXQUFXLENBQUM7QUFDMUMsd0JBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FB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QUMsVUFBVSxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztpQkFDekM7O0FBL1RRLHFCQUFLLFdBaVVkLFdBQVcsR0FBQSxxQkFBQyxLQUFLLEVBQUU7O0FBRWYseUJBQUssQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFFN0M7O0FBclVRLHFCQUFLLFdBdVVkLFlBQVksR0FBQSxzQkFBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFOztBQUVyRCx3QkFBSSxXQUFXLEdBQUcsV0FBVyxJQUFJLEtBQUssQ0FBQzs7QUFFdkMsd0JBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQ2hDLCtCQUFPLEdBQUcsRUFBRSxDQUFDO3FCQUNoQjs7QUFFRCx3QkFBSSxXQUFXLEVBQUU7QUFDYiwrQkFBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztxQkFDL0M7O0FBRUQsd0JBQUksSUFBSSxHQUFHO0FBQ1AsaUNBQVMsRUFBRSxPQUFPO0FBQ2xCLGlDQUFTLEVBQUUsT0FBTztBQUNsQiw4QkFBTSxFQUFFLElBQUk7cUJBQ2YsQ0FBQzs7QUFFRix3QkFBSSxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztBQUN6Qix3QkFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMxQyx3QkFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDbkMsMkJBQU8sVUFBVSxDQUFDO2lCQUVyQjs7QUE5VlEscUJBQUssV0FnV2QsVUFBVSxHQUFBLG9CQUFDLEtBQUssRUFBRSxNQUFNLEVBQUU7O0FBRXRCLHdCQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQzFCLHdCQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7O0FBRW5DLDJCQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLFNBQVMsQ0FBQyxDQUFDOztBQUU1RCx3QkFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEtBQUssRUFBRTtBQUNuQywrQkFBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7cUJBQ3JEOztBQUVELDJCQUFPLElBQUksQ0FBQztpQkFDZjs7QUE1V1EscUJBQUssV0E4V2QsZUFBZSxHQUFBLDJCQUFHOztBQUVkLDJCQUFPLE9BQU8sR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7aUJBRTlCOzt1QkFsWFEsS0FBSyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L25ldC9zdG9tcC1pbXBsL3N0b21wLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
