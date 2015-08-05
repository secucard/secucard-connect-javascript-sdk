System.register(['net', 'tls'], function (_export) {
	'use strict';

	var net, tls, SocketAtNode;
	return {
		setters: [function (_net) {
			net = _net['default'];
		}, function (_tls) {
			tls = _tls['default'];
		}],
		execute: function () {
			SocketAtNode = {};

			_export('SocketAtNode', SocketAtNode);

			SocketAtNode.connect = function (host, port, endpoint, sslEnabled, ssl_options, ssl_validate, onInit, onError) {

				var socket = null;

				if (sslEnabled) {
					console.log('SocketNode', 'ssl', 'Connecting to ' + host + ':' + port + ' using SSL');
					socket = tls.connect(port, host, ssl_options, function () {
						console.log('SocketNode', 'SSL connection complete');

						if (!socket.authorized) {
							console.log('SocketNode', 'SSL is not authorized: ' + socket.authorizationError);
							if (ssl_validate) {
								onError(socket.authorizationError);
								SocketNode.disconnect(socket);
								return;
							}
						}

						onInit(socket, true);
					}).on('error', function (err, obj) {
						console.log(err);
						console.log(obj);
						onError(err);
					});
				} else {
					console.log('SocketNode', 'Connecting to ' + host + ':' + port);

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

				console.log('SocketNode', 'disconnect called');
			};
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3NvY2tldC9zb2NrZXQtbm9kZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7ZUFjYSxZQUFZOzs7Ozs7OztBQUFaLGVBQVksR0FBRyxFQUFFOzsyQkFBakIsWUFBWTs7QUFFekIsZUFBWSxDQUFDLE9BQU8sR0FBRyxVQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUs7O0FBRXhHLFFBQUksTUFBTSxHQUFHLElBQUksQ0FBQzs7QUFFbEIsUUFBSSxVQUFVLEVBQUU7QUFDZixZQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsWUFBWSxDQUFDLENBQUM7QUFDdEYsV0FBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsWUFBTTtBQUNuRCxhQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSx5QkFBeUIsQ0FBQyxDQUFDOztBQUVyRCxVQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtBQUN2QixjQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSx5QkFBeUIsR0FBRyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUNqRixXQUFJLFlBQVksRUFBRTtBQUNqQixlQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDbkMsa0JBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDOUIsZUFBTztRQUNQO09BQ0Q7O0FBRUQsWUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztNQUVyQixDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDbEMsYUFBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNqQixhQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2pCLGFBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztNQUNiLENBQUMsQ0FBQztLQUNILE1BRUk7QUFDSixZQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDOztBQUVoRSxXQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDMUIsV0FBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDM0IsV0FBTSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztLQUV0QjtJQUVELENBQUM7O0FBRUYsZUFBWSxDQUFDLFVBQVUsR0FBRyxVQUFDLE1BQU0sRUFBSzs7QUFFckMsVUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ2IsUUFBSSxNQUFNLENBQUMsVUFBVSxJQUFJLFVBQVUsRUFBRTtBQUNwQyxXQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDakI7O0FBRUQsV0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztJQUUvQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3NvY2tldC9zb2NrZXQtbm9kZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=