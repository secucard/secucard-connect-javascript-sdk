System.register(['es6-shim', './de.secucard.connect/client-browser-environment', './de.secucard.connect/client'], function (_export) {
	'use strict';

	var es6shim, ClientBrowserEnvironment, Client, SecucardConnect;
	return {
		setters: [function (_es6Shim) {
			es6shim = _es6Shim['default'];
		}, function (_deSecucardConnectClientBrowserEnvironment) {
			ClientBrowserEnvironment = _deSecucardConnectClientBrowserEnvironment.ClientBrowserEnvironment;

			_export('Services', _deSecucardConnectClientBrowserEnvironment.ServiceMap);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2dEQUthLGVBQWU7Ozs7O3lFQUpwQix3QkFBd0I7O2tFQUV4QixVQUFVOztxQ0FEVixNQUFNOzs7QUFHRCxrQkFBZSxHQUFHO0FBQzlCLGVBQVcsRUFBRSw2QkFBNkI7SUFDMUM7OzhCQUZZLGVBQWU7O0FBRzVCLGtCQUFlLENBQUMsTUFBTSxHQUFHLFVBQUMsTUFBTSxFQUFLOztBQUVwQyxXQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsd0JBQXdCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFdkQsQ0FBQyIsImZpbGUiOiJicm93c2VyLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==