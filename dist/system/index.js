System.register(['es6-shim', './de.secucard.connect/client-node-environment', './de.secucard.connect/client', 'minilog', './de.secucard.connect/net/channel'], function (_export) {
    'use strict';

    var es6shim, ClientNodeEnvironment, Client, minilog, SecucardConnect, MiniLog;
    return {
        setters: [function (_es6Shim) {
            es6shim = _es6Shim['default'];
        }, function (_deSecucardConnectClientNodeEnvironment) {
            ClientNodeEnvironment = _deSecucardConnectClientNodeEnvironment.ClientNodeEnvironment;

            _export('Services', _deSecucardConnectClientNodeEnvironment.ServiceMap);
        }, function (_deSecucardConnectClient) {
            Client = _deSecucardConnectClient.Client;
        }, function (_minilog) {
            minilog = _minilog['default'];
        }, function (_deSecucardConnectNetChannel) {
            _export('Channel', _deSecucardConnectNetChannel.Channel);
        }],
        execute: function () {
            SecucardConnect = {
                description: 'SecucardConnect for nodejs'
            };

            _export('SecucardConnect', SecucardConnect);

            MiniLog = minilog;

            _export('MiniLog', MiniLog);

            minilog.suggest.deny(/secucard\..*/, 'warn');

            SecucardConnect.create = function (config) {

                return Client.create(config, ClientNodeEnvironment);
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt5REFpQmEsZUFBZSxFQUtmLE9BQU87Ozs7OzRFQVZaLHFCQUFxQjs7d0VBRXJCLFVBQVU7OzhDQURWLE1BQU07Ozs7NERBRU4sT0FBTzs7O0FBRUYsMkJBQWUsR0FBRztBQUMzQiwyQkFBVyxFQUFFLDRCQUE0QjthQUM1Qzs7OztBQUdZLG1CQUFPLEdBQUcsT0FBTzs7OztBQUM5QixtQkFBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDOztBQUU3QywyQkFBZSxDQUFDLE1BQU0sR0FBRyxVQUFDLE1BQU0sRUFBSzs7QUFFakMsdUJBQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUscUJBQXFCLENBQUMsQ0FBQzthQUV2RCxDQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==