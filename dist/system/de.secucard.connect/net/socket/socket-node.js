System.register(['net', 'tls', 'minilog'], function (_export) {
    'use strict';

    var net, tls, minilog, SocketAtNode;
    return {
        setters: [function (_net) {
            net = _net['default'];
        }, function (_tls) {
            tls = _tls['default'];
        }, function (_minilog) {
            minilog = _minilog['default'];
        }],
        execute: function () {
            SocketAtNode = {};

            _export('SocketAtNode', SocketAtNode);

            SocketAtNode.connect = function (host, port, endpoint, sslEnabled, ssl_options, ssl_validate, onInit, onError) {

                var socket = null;

                if (sslEnabled) {

                    minilog('secucard.socket.node').debug('Connecting to ' + host + ':' + port + ' using SSL');

                    socket = tls.connect(port, host, ssl_options, function () {
                        minilog('secucard.socket.node').debug('SSL connection complete');

                        if (!socket.authorized) {
                            minilog('secucard.socket.node').error('SSL is not authorized:', socket.authorizationError);
                            if (ssl_validate) {
                                onError(socket.authorizationError);
                                SocketNode.disconnect(socket);
                                return;
                            }
                        }

                        onInit(socket, true);
                    }).on('error', function (err, obj) {
                        minilog('secucard.socket.node').error(err, obj);
                        onError(err);
                    });
                } else {
                    minilog('secucard.socket.node').debug('Connecting to ' + host + ':' + port);

                    socket = new net.Socket();
                    socket.connect(port, host);
                    onInit(socket, false);
                }
            };

            SocketAtNode.disconnect = function (socket) {

                socket.end();
                if (socket.readyState == 'readOnly') {
                    socket.destroy();
                }

                minilog('secucard.socket.node').debug('disconnect called');
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3NvY2tldC9zb2NrZXQtbm9kZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7MkJBY2EsWUFBWTs7Ozs7Ozs7OztBQUFaLHdCQUFZLEdBQUcsRUFBRTs7OztBQUU5Qix3QkFBWSxDQUFDLE9BQU8sR0FBRyxVQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUs7O0FBRXJHLG9CQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7O0FBRWxCLG9CQUFJLFVBQVUsRUFBRTs7QUFFWiwyQkFBTyxDQUFDLHNCQUFzQixDQUFDLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLFlBQVksQ0FBQyxDQUFDOztBQUUzRiwwQkFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsWUFBTTtBQUNoRCwrQkFBTyxDQUFDLHNCQUFzQixDQUFDLENBQUMsS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7O0FBRWpFLDRCQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtBQUNwQixtQ0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUMsS0FBSyxDQUFDLHdCQUF3QixFQUFFLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQzNGLGdDQUFJLFlBQVksRUFBRTtBQUNkLHVDQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDbkMsMENBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDOUIsdUNBQU87NkJBQ1Y7eUJBQ0o7O0FBRUQsOEJBQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7cUJBRXhCLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUMvQiwrQkFBTyxDQUFDLHNCQUFzQixDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNoRCwrQkFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUNoQixDQUFDLENBQUM7aUJBQ04sTUFFSTtBQUNELDJCQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQzs7QUFFNUUsMEJBQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUMxQiwwQkFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDM0IsMEJBQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBRXpCO2FBRUosQ0FBQzs7QUFFRix3QkFBWSxDQUFDLFVBQVUsR0FBRyxVQUFDLE1BQU0sRUFBSzs7QUFFbEMsc0JBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNiLG9CQUFJLE1BQU0sQ0FBQyxVQUFVLElBQUksVUFBVSxFQUFFO0FBQ2pDLDBCQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7aUJBQ3BCOztBQUVELHVCQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQzthQUU5RCxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3NvY2tldC9zb2NrZXQtbm9kZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=