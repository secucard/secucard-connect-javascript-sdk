System.register(['./net/message', './client-config', './client-context', './client-version', 'minilog'], function (_export) {
    'use strict';

    var Message, ClientConfig, ClientContext, Version, minilog, Client;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [function (_netMessage) {
            Message = _netMessage.Message;
        }, function (_clientConfig) {
            ClientConfig = _clientConfig.ClientConfig;
        }, function (_clientContext) {
            ClientContext = _clientContext.ClientContext;
        }, function (_clientVersion) {
            Version = _clientVersion.Version;
        }, function (_minilog) {
            minilog = _minilog['default'];
        }],
        execute: function () {
            Client = (function () {
                function Client(config, environment) {
                    _classCallCheck(this, Client);

                    this.config = config;
                    this.context = new ClientContext(config, environment);
                    this.getService = this.context.getService.bind(this.context);
                    this.addAppService = this.context.addAppService.bind(this.context);
                    this.removeAppService = this.context.removeAppService.bind(this.context);
                    this.emitServiceEvent = this.context.emitServiceEvent.bind(this.context);
                    this.on = this.context.on.bind(this.context);
                    this.setCredentials = this.context.setCredentials.bind(this.context);
                    this.getStoredToken = this.context.getStoredToken.bind(this.context);
                    this.connected = false;

                    minilog('secucard.client').debug(config);
                }

                Client.prototype.open = function open() {
                    var _this = this;

                    if (this.connected) {
                        return Promise.resolve(this.connected);
                    }

                    return this.context.open().then(function () {
                        _this.connected = true;
                        return _this.connected;
                    });
                };

                Client.prototype.getVersion = function getVersion() {
                    return Version.name;
                };

                return Client;
            })();

            _export('Client', Client);

            Client.create = function (config, environment) {

                if (!config) {
                    config = Object.create(null);
                }

                config = Object.assign(ClientConfig.defaults(), environment.config, config);

                return new Client(config, environment);
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztnRUFpQmEsTUFBTTs7Ozs7O2tDQU5YLE9BQU87O3lDQUNQLFlBQVk7OzJDQUNaLGFBQWE7O3FDQUNiLE9BQU87Ozs7O0FBR0Ysa0JBQU07QUFFSix5QkFGRixNQUFNLENBRUgsTUFBTSxFQUFFLFdBQVcsRUFBRTswQ0FGeEIsTUFBTTs7QUFJWCx3QkFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsd0JBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxhQUFhLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ3RELHdCQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0Qsd0JBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNuRSx3QkFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN6RSx3QkFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN6RSx3QkFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdDLHdCQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDckUsd0JBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNyRSx3QkFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7O0FBRXZCLDJCQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBRTVDOztBQWpCUSxzQkFBTSxXQW1CZixJQUFJLEdBQUEsZ0JBQUc7OztBQUVILHdCQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7QUFDaEIsK0JBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7cUJBQzFDOztBQUVELDJCQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQU07QUFDbEMsOEJBQUssU0FBUyxHQUFHLElBQUksQ0FBQztBQUN0QiwrQkFBTyxNQUFLLFNBQVMsQ0FBQztxQkFDekIsQ0FBQyxDQUFDO2lCQUVOOztBQTlCUSxzQkFBTSxXQWdDZixVQUFVLEdBQUEsc0JBQUc7QUFDVCwyQkFBTyxPQUFPLENBQUMsSUFBSSxDQUFDO2lCQUN2Qjs7dUJBbENRLE1BQU07Ozs4QkFBTixNQUFNOztBQXNDbkIsa0JBQU0sQ0FBQyxNQUFNLEdBQUcsVUFBQyxNQUFNLEVBQUUsV0FBVyxFQUFLOztBQUVyQyxvQkFBSSxDQUFDLE1BQU0sRUFBRTtBQUNULDBCQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDaEM7O0FBRUQsc0JBQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxXQUFXLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztBQUU1RSx1QkFBTyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7YUFFMUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L2NsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=