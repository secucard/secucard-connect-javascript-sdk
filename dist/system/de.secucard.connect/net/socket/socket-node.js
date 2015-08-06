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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3NvY2tldC9zb2NrZXQtbm9kZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBY2EsWUFBWTs7Ozs7Ozs7OztBQUFaLGVBQVksR0FBRyxFQUFFOzsyQkFBakIsWUFBWTs7QUFFekIsZUFBWSxDQUFDLE9BQU8sR0FBRyxVQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUs7O0FBRXhHLFFBQUksTUFBTSxHQUFHLElBQUksQ0FBQzs7QUFFbEIsUUFBSSxVQUFVLEVBQUU7O0FBRWYsWUFBTyxDQUFDLHNCQUFzQixDQUFDLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLFlBQVksQ0FBQyxDQUFDOztBQUUzRixXQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxZQUFNO0FBQ25ELGFBQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDOztBQUVqRSxVQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtBQUN2QixjQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEVBQUUsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDM0YsV0FBSSxZQUFZLEVBQUU7QUFDakIsZUFBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ25DLGtCQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzlCLGVBQU87UUFDUDtPQUNEOztBQUVELFlBQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7TUFFckIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQ2xDLGFBQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDaEQsYUFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO01BQ2IsQ0FBQyxDQUFDO0tBQ0gsTUFFSTtBQUNKLFlBQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDOztBQUU1RSxXQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDMUIsV0FBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDM0IsV0FBTSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztLQUV0QjtJQUVELENBQUM7O0FBRUYsZUFBWSxDQUFDLFVBQVUsR0FBRyxVQUFDLE1BQU0sRUFBSzs7QUFFckMsVUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ2IsUUFBSSxNQUFNLENBQUMsVUFBVSxJQUFJLFVBQVUsRUFBRTtBQUNwQyxXQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDakI7O0FBRUQsV0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFFM0QsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L25ldC9zb2NrZXQvc29ja2V0LW5vZGUuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9