System.register(['./net/stomp', './net/stomp-browser/stomp'], function (_export) {
	'use strict';

	var Stomp, StompBrowserImpl, ClientBrowserEnvironment;
	return {
		setters: [function (_netStomp) {
			Stomp = _netStomp.Stomp;
		}, function (_netStompBrowserStomp) {
			StompBrowserImpl = _netStompBrowserStomp.Stomp;
		}],
		execute: function () {
			ClientBrowserEnvironment = {};

			_export('ClientBrowserEnvironment', ClientBrowserEnvironment);

			ClientBrowserEnvironment.StompChannel = {
				create: function create() {
					return new Stomp(StompBrowserImpl);
				}
			};
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LWJyb3dzZXItZW52aXJvbm1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzhCQUdhLHdCQUF3Qjs7O3FCQUg3QixLQUFLOzs0Q0FDTCxLQUFLOzs7QUFFQSwyQkFBd0IsR0FBRyxFQUFFOzt1Q0FBN0Isd0JBQXdCOztBQUNyQywyQkFBd0IsQ0FBQyxZQUFZLEdBQUc7QUFDdkMsVUFBTSxFQUFFLGtCQUFNO0FBQ2IsWUFBTyxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0tBQ25DO0lBQ0QsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L2NsaWVudC1icm93c2VyLWVudmlyb25tZW50LmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==