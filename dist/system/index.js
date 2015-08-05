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

        return Client.create(ClientNodeEnvironment, config);
      };
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt1REFpQmEsZUFBZSxFQUtmLE9BQU87Ozs7O3NFQVZaLHFCQUFxQjs7a0VBRXJCLFVBQVU7O3dDQURWLE1BQU07Ozs7c0RBRU4sT0FBTzs7O0FBRUYscUJBQWUsR0FBRztBQUM5QixtQkFBVyxFQUFFLDRCQUE0QjtPQUN6Qzs7aUNBRlksZUFBZTs7QUFLZixhQUFPLEdBQUcsT0FBTzs7eUJBQWpCLE9BQU87O0FBQ3BCLGFBQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQzs7QUFFN0MscUJBQWUsQ0FBQyxNQUFNLEdBQUcsVUFBQyxNQUFNLEVBQUs7O0FBRXBDLGVBQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxNQUFNLENBQUMsQ0FBQztPQUVwRCxDQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==