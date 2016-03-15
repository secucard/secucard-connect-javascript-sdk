System.register(['eventemitter3', 'minilog'], function (_export) {
    'use strict';

    var EE, minilog, SocketAtBrowser;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [function (_eventemitter3) {
            EE = _eventemitter3['default'];
        }, function (_minilog) {
            minilog = _minilog['default'];
        }],
        execute: function () {
            SocketAtBrowser = (function () {
                function SocketAtBrowser(url) {
                    var _this = this;

                    _classCallCheck(this, SocketAtBrowser);

                    Object.assign(this, EE.prototype);

                    var ws = new WebSocket(url);
                    ws.binaryType = "arraybuffer";

                    ws.onopen = function () {

                        minilog('secucard.socket.browser').debug('onopen');
                        _this.emit('connect');
                    };

                    ws.onmessage = function (event) {

                        minilog('secucard.socket.browser').debug('onmessage', event);
                        _this.emit('data', event.data);
                    };

                    ws.onclose = function (event) {

                        if (event.code == 1000) {
                            _this.emit('close');
                        } else {
                            _this.emit('close', event.reason);
                        }
                    };

                    this.ws = ws;
                }

                SocketAtBrowser.prototype.close = function close() {

                    this.ws.close();
                };

                SocketAtBrowser.prototype.write = function write(chunk) {

                    this.ws.send(chunk);
                    return true;
                };

                return SocketAtBrowser;
            })();

            _export('SocketAtBrowser', SocketAtBrowser);

            SocketAtBrowser.connect = function (host, port, endpoint, sslEnabled, ssl_options, ssl_validate, onInit, onError) {

                var url = host + ':' + port + endpoint;
                if (sslEnabled) {
                    url = 'wss://' + url;
                } else {
                    url = 'ws://' + url;
                }

                var socket = new SocketAtBrowser(url);
                onInit(socket, false);
            };

            SocketAtBrowser.disconnect = function (socket) {

                minilog('secucard.socket.browser').debug('disconnect called');
                socket.close();
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3NvY2tldC9zb2NrZXQtYnJvd3Nlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7cUJBYWEsZUFBZTs7Ozs7Ozs7Ozs7QUFBZiwyQkFBZTtBQUViLHlCQUZGLGVBQWUsQ0FFWixHQUFHLEVBQUU7OzswQ0FGUixlQUFlOztBQUlwQiwwQkFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUVsQyx3QkFBSSxFQUFFLEdBQUcsSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUIsc0JBQUUsQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDOztBQUU5QixzQkFBRSxDQUFDLE1BQU0sR0FBRyxZQUFNOztBQUVkLCtCQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDbkQsOEJBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3FCQUV4QixDQUFDOztBQUVGLHNCQUFFLENBQUMsU0FBUyxHQUFHLFVBQUMsS0FBSyxFQUFLOztBQUV0QiwrQkFBTyxDQUFDLHlCQUF5QixDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM3RCw4QkFBSyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFFakMsQ0FBQzs7QUFFRixzQkFBRSxDQUFDLE9BQU8sR0FBRyxVQUFDLEtBQUssRUFBSzs7QUFJcEIsNEJBQUksS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUU7QUFFcEIsa0NBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3lCQUN0QixNQUFNO0FBQ0gsa0NBQUssSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7eUJBQ3BDO3FCQUVKLENBQUM7O0FBRUYsd0JBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO2lCQUNoQjs7QUFyQ1EsK0JBQWUsV0F1Q3hCLEtBQUssR0FBQSxpQkFBRzs7QUFFSix3QkFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFFbkI7O0FBM0NRLCtCQUFlLFdBNkN4QixLQUFLLEdBQUEsZUFBQyxLQUFLLEVBQUU7O0FBRVQsd0JBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BCLDJCQUFPLElBQUksQ0FBQztpQkFFZjs7dUJBbERRLGVBQWU7Ozs7O0FBc0Q1QiwyQkFBZSxDQUFDLE9BQU8sR0FBRyxVQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUs7O0FBRXhHLG9CQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxRQUFRLENBQUM7QUFDdkMsb0JBQUksVUFBVSxFQUFFO0FBQ1osdUJBQUcsR0FBRyxRQUFRLEdBQUcsR0FBRyxDQUFDO2lCQUN4QixNQUFNO0FBQ0gsdUJBQUcsR0FBRyxPQUFPLEdBQUcsR0FBRyxDQUFDO2lCQUN2Qjs7QUFJRCxvQkFBSSxNQUFNLEdBQUcsSUFBSSxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEMsc0JBQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFFekIsQ0FBQzs7QUFFRiwyQkFBZSxDQUFDLFVBQVUsR0FBRyxVQUFDLE1BQU0sRUFBSzs7QUFFckMsdUJBQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQzlELHNCQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7YUFFbEIsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L25ldC9zb2NrZXQvc29ja2V0LWJyb3dzZXIuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9