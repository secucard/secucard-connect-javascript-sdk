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
					ws.binaryType = 'arraybuffer';

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3NvY2tldC9zb2NrZXQtYnJvd3Nlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7a0JBYWEsZUFBZTs7Ozs7Ozs7Ozs7QUFBZixrQkFBZTtBQUVoQixhQUZDLGVBQWUsQ0FFZixHQUFHLEVBQUU7OzsyQkFGTCxlQUFlOztBQUkxQixXQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBRWxDLFNBQUksRUFBRSxHQUFHLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzVCLE9BQUUsQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDOztBQUU5QixPQUFFLENBQUMsTUFBTSxHQUFHLFlBQU07O0FBRWpCLGFBQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNuRCxZQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztNQUVyQixDQUFDOztBQUVGLE9BQUUsQ0FBQyxTQUFTLEdBQUcsVUFBQyxLQUFLLEVBQUs7O0FBRXpCLGFBQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDN0QsWUFBSyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztNQUU5QixDQUFDOztBQUVGLE9BQUUsQ0FBQyxPQUFPLEdBQUcsVUFBQyxLQUFLLEVBQUs7O0FBSXZCLFVBQUcsS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUM7QUFFckIsYUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7T0FDbkIsTUFBTTtBQUNOLGFBQUssSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7T0FDakM7TUFFRCxDQUFDOztBQUVGLFNBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0tBQ2I7O0FBckNXLG1CQUFlLFdBdUMzQixLQUFLLEdBQUEsaUJBQUc7O0FBRVAsU0FBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUVoQjs7QUEzQ1csbUJBQWUsV0E2QzNCLEtBQUssR0FBQSxlQUFDLEtBQUssRUFBRTs7QUFFWixTQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwQixZQUFPLElBQUksQ0FBQztLQUVaOztXQWxEVyxlQUFlOzs7OEJBQWYsZUFBZTs7QUFzRDVCLGtCQUFlLENBQUMsT0FBTyxHQUFHLFVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBSzs7QUFFM0csUUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsUUFBUSxDQUFDO0FBQ3ZDLFFBQUksVUFBVSxFQUFFO0FBQ2YsUUFBRyxHQUFJLFFBQVEsR0FBRyxHQUFHLENBQUM7S0FDdEIsTUFBTTtBQUNOLFFBQUcsR0FBSSxPQUFPLEdBQUcsR0FBRyxDQUFDO0tBQ3JCOztBQUlELFFBQUksTUFBTSxHQUFHLElBQUksZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3RDLFVBQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFdEIsQ0FBQzs7QUFFRixrQkFBZSxDQUFDLFVBQVUsR0FBRyxVQUFDLE1BQU0sRUFBSzs7QUFFeEMsV0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDOUQsVUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBRWYsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L25ldC9zb2NrZXQvc29ja2V0LWJyb3dzZXIuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9