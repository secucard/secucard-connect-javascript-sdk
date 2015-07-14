System.register(['eventemitter3'], function (_export) {
	'use strict';

	var EE, SocketAtBrowser;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [function (_eventemitter3) {
			EE = _eventemitter3['default'];
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

						console.log('ws.onopen');
						_this.emit('connect');
					};

					ws.onmessage = function (event) {

						console.log('ws.onmessage', event);
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

				console.log('SocketNode', 'disconnect called');
				socket.close();
			};
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3NvY2tldC9zb2NrZXQtYnJvd3Nlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7U0FDYSxlQUFlOzs7Ozs7Ozs7QUFBZixrQkFBZTtBQUVoQixhQUZDLGVBQWUsQ0FFZixHQUFHLEVBQUU7OzsyQkFGTCxlQUFlOztBQUkxQixXQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBRWxDLFNBQUksRUFBRSxHQUFHLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzVCLE9BQUUsQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDOztBQUU5QixPQUFFLENBQUMsTUFBTSxHQUFHLFlBQU07O0FBRWpCLGFBQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDekIsWUFBSyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7TUFFckIsQ0FBQzs7QUFFRixPQUFFLENBQUMsU0FBUyxHQUFHLFVBQUMsS0FBSyxFQUFLOztBQUV6QixhQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNuQyxZQUFLLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO01BRTlCLENBQUM7O0FBRUYsT0FBRSxDQUFDLE9BQU8sR0FBRyxVQUFDLEtBQUssRUFBSzs7QUFJdkIsVUFBRyxLQUFLLENBQUMsSUFBSSxJQUFJLElBQUksRUFBQztBQUVyQixhQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztPQUNuQixNQUFNO0FBQ04sYUFBSyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztPQUNqQztNQUVELENBQUM7O0FBRUYsU0FBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7S0FDYjs7QUFyQ1csbUJBQWUsV0F1QzNCLEtBQUssR0FBQSxpQkFBRzs7QUFFUCxTQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBRWhCOztBQTNDVyxtQkFBZSxXQTZDM0IsS0FBSyxHQUFBLGVBQUMsS0FBSyxFQUFFOztBQUVaLFNBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BCLFlBQU8sSUFBSSxDQUFDO0tBRVo7O1dBbERXLGVBQWU7Ozs4QkFBZixlQUFlOztBQXNENUIsa0JBQWUsQ0FBQyxPQUFPLEdBQUcsVUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFLOztBQUUzRyxRQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxRQUFRLENBQUM7QUFDdkMsUUFBSSxVQUFVLEVBQUU7QUFDZixRQUFHLEdBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQztLQUN0QixNQUFNO0FBQ04sUUFBRyxHQUFJLE9BQU8sR0FBRyxHQUFHLENBQUM7S0FDckI7O0FBSUQsUUFBSSxNQUFNLEdBQUcsSUFBSSxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEMsVUFBTSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUV0QixDQUFDOztBQUVGLGtCQUFlLENBQUMsVUFBVSxHQUFHLFVBQUMsTUFBTSxFQUFLOztBQUV4QyxXQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0FBQy9DLFVBQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUVmLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9uZXQvc29ja2V0L3NvY2tldC1icm93c2VyLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==