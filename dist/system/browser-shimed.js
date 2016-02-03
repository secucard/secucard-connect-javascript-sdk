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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyb3dzZXItc2hpbWVkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs0REFrQmEsT0FBTyxFQUdQLGVBQWU7Ozs7O2tGQVRwQix3QkFBd0I7OzJFQUV4QixVQUFVOzs4Q0FEVixNQUFNOzs7OzREQUVOLE9BQU87OztBQUdGLG1CQUFPLEdBQUcsT0FBTzs7K0JBQWpCLE9BQU87O0FBQ3BCLG1CQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7O0FBRWhDLDJCQUFlLEdBQUc7QUFDM0IsMkJBQVcsRUFBRSw2QkFBNkI7YUFDN0M7O3VDQUZZLGVBQWU7O0FBSTVCLDJCQUFlLENBQUMsTUFBTSxHQUFHLFVBQUMsTUFBTSxFQUFLOztBQUVqQyx1QkFBTyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO2FBRTFELENBQUMiLCJmaWxlIjoiYnJvd3Nlci1zaGltZWQuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9