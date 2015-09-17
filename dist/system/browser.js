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

                return Client.create(config, ClientBrowserEnvironment);
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzREQWtCYSxPQUFPLEVBR1AsZUFBZTs7Ozs7a0ZBVHBCLHdCQUF3Qjs7MkVBRXhCLFVBQVU7OzhDQURWLE1BQU07Ozs7NERBRU4sT0FBTzs7O0FBR0YsbUJBQU8sR0FBRyxPQUFPOzsrQkFBakIsT0FBTzs7QUFDcEIsbUJBQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQzs7QUFFaEMsMkJBQWUsR0FBRztBQUMzQiwyQkFBVyxFQUFFLDZCQUE2QjthQUM3Qzs7dUNBRlksZUFBZTs7QUFJNUIsMkJBQWUsQ0FBQyxNQUFNLEdBQUcsVUFBQyxNQUFNLEVBQUs7O0FBRWpDLHVCQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLHdCQUF3QixDQUFDLENBQUM7YUFFMUQsQ0FBQyIsImZpbGUiOiJicm93c2VyLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==