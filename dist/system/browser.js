System.register(['es6-shim', './de.secucard.connect/client-browser-environment', './de.secucard.connect/client', './de.secucard.connect/net/channel'], function (_export) {
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
    }, function (_deSecucardConnectNetChannel) {
      _export('Channel', _deSecucardConnectNetChannel.Channel);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2lEQWlCYSxlQUFlOzs7Ozs0RUFMcEIsd0JBQXdCOztxRUFFeEIsVUFBVTs7d0NBRFYsTUFBTTs7c0RBRU4sT0FBTzs7O0FBRUYscUJBQWUsR0FBRztBQUM5QixtQkFBVyxFQUFFLDZCQUE2QjtPQUMxQzs7aUNBRlksZUFBZTs7QUFHNUIscUJBQWUsQ0FBQyxNQUFNLEdBQUcsVUFBQyxNQUFNLEVBQUs7O0FBRXBDLGVBQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRSxNQUFNLENBQUMsQ0FBQztPQUV2RCxDQUFDIiwiZmlsZSI6ImJyb3dzZXIuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9