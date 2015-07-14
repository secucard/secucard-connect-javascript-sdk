System.register(['babel-runtime/helpers/class-call-check', 'babel-runtime/core-js/object/assign', 'eventemitter3'], function (_export) {
	var _classCallCheck, _Object$assign, EE, SocketAtBrowser;

	return {
		setters: [function (_babelRuntimeHelpersClassCallCheck) {
			_classCallCheck = _babelRuntimeHelpersClassCallCheck['default'];
		}, function (_babelRuntimeCoreJsObjectAssign) {
			_Object$assign = _babelRuntimeCoreJsObjectAssign['default'];
		}, function (_eventemitter3) {
			EE = _eventemitter3['default'];
		}],
		execute: function () {
			'use strict';

			SocketAtBrowser = (function () {
				function SocketAtBrowser(url) {
					var _this = this;

					_classCallCheck(this, SocketAtBrowser);

					_Object$assign(this, EE.prototype);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3NvY2tldC9zb2NrZXQtYnJvd3Nlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzBDQUNhLGVBQWU7Ozs7Ozs7Ozs7Ozs7QUFBZixrQkFBZTtBQUVoQixhQUZDLGVBQWUsQ0FFZixHQUFHLEVBQUU7OzsyQkFGTCxlQUFlOztBQUkxQixvQkFBYyxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUVsQyxTQUFJLEVBQUUsR0FBRyxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixPQUFFLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FBQzs7QUFFOUIsT0FBRSxDQUFDLE1BQU0sR0FBRyxZQUFNOztBQUVqQixhQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3pCLFlBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO01BRXJCLENBQUM7O0FBRUYsT0FBRSxDQUFDLFNBQVMsR0FBRyxVQUFDLEtBQUssRUFBSzs7QUFFekIsYUFBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDbkMsWUFBSyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztNQUU5QixDQUFDOztBQUVGLE9BQUUsQ0FBQyxPQUFPLEdBQUcsVUFBQyxLQUFLLEVBQUs7O0FBSXZCLFVBQUcsS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUM7QUFFckIsYUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7T0FDbkIsTUFBTTtBQUNOLGFBQUssSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7T0FDakM7TUFFRCxDQUFDOztBQUVGLFNBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0tBQ2I7O0FBckNXLG1CQUFlLFdBdUMzQixLQUFLLEdBQUEsaUJBQUc7O0FBRVAsU0FBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUVoQjs7QUEzQ1csbUJBQWUsV0E2QzNCLEtBQUssR0FBQSxlQUFDLEtBQUssRUFBRTs7QUFFWixTQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwQixZQUFPLElBQUksQ0FBQztLQUVaOztXQWxEVyxlQUFlOzs7OEJBQWYsZUFBZTs7QUFzRDVCLGtCQUFlLENBQUMsT0FBTyxHQUFHLFVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBSzs7QUFFM0csUUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsUUFBUSxDQUFDO0FBQ3ZDLFFBQUksVUFBVSxFQUFFO0FBQ2YsUUFBRyxHQUFJLFFBQVEsR0FBRyxHQUFHLENBQUM7S0FDdEIsTUFBTTtBQUNOLFFBQUcsR0FBSSxPQUFPLEdBQUcsR0FBRyxDQUFDO0tBQ3JCOztBQUlELFFBQUksTUFBTSxHQUFHLElBQUksZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3RDLFVBQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFdEIsQ0FBQzs7QUFFRixrQkFBZSxDQUFDLFVBQVUsR0FBRyxVQUFDLE1BQU0sRUFBSzs7QUFFeEMsV0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztBQUMvQyxVQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFFZixDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3NvY2tldC9zb2NrZXQtYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=