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
			SecucardConnect = {
				description: 'SecucardConnect for nodejs'
			};

			_export('SecucardConnect', SecucardConnect);

			SecucardConnect.create = function (config) {

				return Client.create(ClientNodeEnvironment, config);
			};
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs2Q0FJYSxlQUFlOzs7OzttRUFIcEIscUJBQXFCOztxQ0FDckIsTUFBTTs7O0FBRUQsa0JBQWUsR0FBRztBQUM5QixlQUFXLEVBQUUsNEJBQTRCO0lBQ3pDOzs4QkFGWSxlQUFlOztBQUc1QixrQkFBZSxDQUFDLE1BQU0sR0FBRyxVQUFDLE1BQU0sRUFBSzs7QUFFcEMsV0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLHFCQUFxQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRXBELENBQUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9