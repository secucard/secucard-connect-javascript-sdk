System.register(['./de.secucard.connect/client-browser-environment', './de.secucard.connect/client'], function (_export) {
	'use strict';

	var ClientBrowserEnvironment, Client, SecucardConnect;
	return {
		setters: [function (_deSecucardConnectClientBrowserEnvironment) {
			ClientBrowserEnvironment = _deSecucardConnectClientBrowserEnvironment.ClientBrowserEnvironment;
		}, function (_deSecucardConnectClient) {
			Client = _deSecucardConnectClient.Client;
		}],
		execute: function () {
			SecucardConnect = {};

			_export('SecucardConnect', SecucardConnect);

			SecucardConnect.create = function (config) {

				return Client.create(ClientBrowserEnvironment, config);
			};
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3VDQUdhLGVBQWU7Ozt5RUFIcEIsd0JBQXdCOztxQ0FDeEIsTUFBTTs7O0FBRUQsa0JBQWUsR0FBRyxFQUFFOzs4QkFBcEIsZUFBZTs7QUFDNUIsa0JBQWUsQ0FBQyxNQUFNLEdBQUcsVUFBQyxNQUFNLEVBQUs7O0FBRXBDLFdBQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUV2RCxDQUFDIiwiZmlsZSI6ImJyb3dzZXIuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9