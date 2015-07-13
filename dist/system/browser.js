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
			SecucardConnect = {
				description: 'SecucardConnect for browser'
			};

			_export('SecucardConnect', SecucardConnect);

			SecucardConnect.create = function (config) {

				return Client.create(ClientBrowserEnvironment, config);
			};
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3VDQUdhLGVBQWU7Ozt5RUFIcEIsd0JBQXdCOztxQ0FDeEIsTUFBTTs7O0FBRUQsa0JBQWUsR0FBRztBQUM5QixlQUFXLEVBQUUsNkJBQTZCO0lBQzFDOzs4QkFGWSxlQUFlOztBQUc1QixrQkFBZSxDQUFDLE1BQU0sR0FBRyxVQUFDLE1BQU0sRUFBSzs7QUFFcEMsV0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLHdCQUF3QixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRXZELENBQUMiLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=