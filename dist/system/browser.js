System.register(['es6-shim', './de.secucard.connect/client-browser-environment', './de.secucard.connect/client', 'minilog', './de.secucard.connect/net/channel'], function (_export) {
  'use strict';

  var es6shim, ClientBrowserEnvironment, Client, minilog, MiniLog, SecucardConnect;
  return {
    setters: [function (_es6Shim) {
      es6shim = _es6Shim['default'];
    }, function (_deSecucardConnectClientBrowserEnvironment) {
      ClientBrowserEnvironment = _deSecucardConnectClientBrowserEnvironment.ClientBrowserEnvironment;

      _export('Services', _deSecucardConnectClientBrowserEnvironment.ServiceMap);
    }, function (_deSecucardConnectClient) {
      Client = _deSecucardConnectClient.Client;
    }, function (_minilog) {
      minilog = _minilog['default'];
    }, function (_deSecucardConnectNetChannel) {
      _export('Channel', _deSecucardConnectNetChannel.Channel);
    }],
    execute: function () {
      MiniLog = minilog;

      _export('MiniLog', MiniLog);

      minilog.suggest.deny(/secucard\..*/, 'warn');

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzBEQWtCYSxPQUFPLEVBR1AsZUFBZTs7Ozs7NEVBVHBCLHdCQUF3Qjs7cUVBRXhCLFVBQVU7O3dDQURWLE1BQU07Ozs7c0RBRU4sT0FBTzs7O0FBR0YsYUFBTyxHQUFHLE9BQU87O3lCQUFqQixPQUFPOztBQUNwQixhQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7O0FBRWhDLHFCQUFlLEdBQUc7QUFDOUIsbUJBQVcsRUFBRSw2QkFBNkI7T0FDMUM7O2lDQUZZLGVBQWU7O0FBSTVCLHFCQUFlLENBQUMsTUFBTSxHQUFHLFVBQUMsTUFBTSxFQUFLOztBQUVwQyxlQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsd0JBQXdCLEVBQUUsTUFBTSxDQUFDLENBQUM7T0FFdkQsQ0FBQyIsImZpbGUiOiJicm93c2VyLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==