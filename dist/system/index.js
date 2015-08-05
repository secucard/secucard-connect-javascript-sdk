System.register(['es6-shim', './de.secucard.connect/client-node-environment', './de.secucard.connect/client', './de.secucard.connect/net/channel'], function (_export) {
  'use strict';

  var es6shim, ClientNodeEnvironment, Client, SecucardConnect;
  return {
    setters: [function (_es6Shim) {
      es6shim = _es6Shim['default'];
    }, function (_deSecucardConnectClientNodeEnvironment) {
      ClientNodeEnvironment = _deSecucardConnectClientNodeEnvironment.ClientNodeEnvironment;

      _export('Services', _deSecucardConnectClientNodeEnvironment.ServiceMap);
    }, function (_deSecucardConnectClient) {
      Client = _deSecucardConnectClient.Client;
    }, function (_deSecucardConnectNetChannel) {
      _export('Channel', _deSecucardConnectNetChannel.Channel);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs4Q0FpQmEsZUFBZTs7Ozs7c0VBTHBCLHFCQUFxQjs7a0VBRXJCLFVBQVU7O3dDQURWLE1BQU07O3NEQUVOLE9BQU87OztBQUVGLHFCQUFlLEdBQUc7QUFDOUIsbUJBQVcsRUFBRSw0QkFBNEI7T0FDekM7O2lDQUZZLGVBQWU7O0FBRzVCLHFCQUFlLENBQUMsTUFBTSxHQUFHLFVBQUMsTUFBTSxFQUFLOztBQUVwQyxlQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUUsTUFBTSxDQUFDLENBQUM7T0FFcEQsQ0FBQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=