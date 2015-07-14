System.register(['./net/stomp', './net/socket/socket-browser'], function (_export) {
	'use strict';

	var Stomp, SocketAtBrowser, ClientBrowserEnvironment;
	return {
		setters: [function (_netStomp) {
			Stomp = _netStomp.Stomp;
		}, function (_netSocketSocketBrowser) {
			SocketAtBrowser = _netSocketSocketBrowser.SocketAtBrowser;
		}],
		execute: function () {
			ClientBrowserEnvironment = {
				config: {
					stompPort: 15671,
					stompEndpoint: '/stomp/websocket'
				}
			};

			_export('ClientBrowserEnvironment', ClientBrowserEnvironment);

			ClientBrowserEnvironment.StompChannel = {
				create: function create() {
					return new Stomp(SocketAtBrowser);
				}
			};
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LWJyb3dzZXItZW52aXJvbm1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzZCQUdhLHdCQUF3Qjs7O3FCQUg3QixLQUFLOzs2Q0FDTCxlQUFlOzs7QUFFViwyQkFBd0IsR0FBRztBQUN2QyxVQUFNLEVBQUU7QUFDUCxjQUFTLEVBQUUsS0FBSztBQUNoQixrQkFBYSxFQUFFLGtCQUFrQjtLQUNqQztJQUNEOzt1Q0FMWSx3QkFBd0I7O0FBTXJDLDJCQUF3QixDQUFDLFlBQVksR0FBRztBQUN2QyxVQUFNLEVBQUUsa0JBQU07QUFDYixZQUFPLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQ2xDO0lBQ0QsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L2NsaWVudC1icm93c2VyLWVudmlyb25tZW50LmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==