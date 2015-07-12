System.register(['es6-shim', './de.secucard.connect/client-node-environment', './de.secucard.connect/client'], function (_export) {
	'use strict';

	var es6shim, ClientNodeEnvironment, Client, SecucardConnect;
	return {
		setters: [function (_es6Shim) {
			es6shim = _es6Shim['default'];
		}, function (_deSecucardConnectClientNodeEnvironment) {
			ClientNodeEnvironment = _deSecucardConnectClientNodeEnvironment.ClientNodeEnvironment;
		}, function (_deSecucardConnectClient) {
			Client = _deSecucardConnectClient.Client;
		}],
		execute: function () {
			SecucardConnect = {};

			_export('SecucardConnect', SecucardConnect);

			SecucardConnect.create = function (config) {

				return Client.create(ClientNodeEnvironment, config);
			};
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs2Q0FJYSxlQUFlOzs7OzttRUFIcEIscUJBQXFCOztxQ0FDckIsTUFBTTs7O0FBRUQsa0JBQWUsR0FBRyxFQUFFOzs4QkFBcEIsZUFBZTs7QUFDNUIsa0JBQWUsQ0FBQyxNQUFNLEdBQUcsVUFBQyxNQUFNLEVBQUs7O0FBRXBDLFdBQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUVwRCxDQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==