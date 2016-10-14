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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3NvY2tldC9zb2NrZXQtbm9kZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7MkJBY2EsWUFBWTs7Ozs7Ozs7OztBQUFaLHdCQUFZLEdBQUcsRUFBRTs7b0NBQWpCLFlBQVk7O0FBRXpCLHdCQUFZLENBQUMsT0FBTyxHQUFHLFVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBSzs7QUFFckcsb0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQzs7QUFFbEIsb0JBQUksVUFBVSxFQUFFOztBQUVaLDJCQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsWUFBWSxDQUFDLENBQUM7O0FBRTNGLDBCQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxZQUFNO0FBQ2hELCtCQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQzs7QUFFakUsNEJBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO0FBQ3BCLG1DQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEVBQUUsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDM0YsZ0NBQUksWUFBWSxFQUFFO0FBQ2QsdUNBQU8sQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUNuQywwQ0FBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM5Qix1Q0FBTzs2QkFDVjt5QkFDSjs7QUFFRCw4QkFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztxQkFFeEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQy9CLCtCQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ2hELCtCQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ2hCLENBQUMsQ0FBQztpQkFDTixNQUVJO0FBQ0QsMkJBQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDOztBQUU1RSwwQkFBTSxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzFCLDBCQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMzQiwwQkFBTSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFFekI7YUFFSixDQUFDOztBQUVGLHdCQUFZLENBQUMsVUFBVSxHQUFHLFVBQUMsTUFBTSxFQUFLOztBQUVsQyxzQkFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ2Isb0JBQUksTUFBTSxDQUFDLFVBQVUsSUFBSSxVQUFVLEVBQUU7QUFDakMsMEJBQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDcEI7O0FBRUQsdUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2FBRTlELENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9uZXQvc29ja2V0L3NvY2tldC1ub2RlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==