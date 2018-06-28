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
                    this.exportToken = this.context.exportToken.bind(this.context);
                    this.connected = false;
                    this.setLanguage = this.context.setLanguage.bind(this.context);

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztnRUFpQmEsTUFBTTs7Ozs7O2tDQU5YLE9BQU87O3lDQUNQLFlBQVk7OzJDQUNaLGFBQWE7O3FDQUNiLE9BQU87Ozs7O0FBR0Ysa0JBQU07QUFFSix5QkFGRixNQUFNLENBRUgsTUFBTSxFQUFFLFdBQVcsRUFBRTswQ0FGeEIsTUFBTTs7QUFHWCx3QkFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsd0JBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxhQUFhLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ3RELHdCQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0Qsd0JBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNuRSx3QkFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN6RSx3QkFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN6RSx3QkFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdDLHdCQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDckUsd0JBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNyRSx3QkFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQy9ELHdCQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztBQUN2Qix3QkFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUUvRCwyQkFBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUM1Qzs7QUFqQlEsc0JBQU0sV0FtQmYsSUFBSSxHQUFBLGdCQUFHOzs7QUFDSCx3QkFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO0FBQ2hCLCtCQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3FCQUMxQzs7QUFFRCwyQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFNO0FBQ2xDLDhCQUFLLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFDdEIsK0JBQU8sTUFBSyxTQUFTLENBQUM7cUJBQ3pCLENBQUMsQ0FBQztpQkFFTjs7QUE3QlEsc0JBQU0sV0ErQmYsVUFBVSxHQUFBLHNCQUFHO0FBQ1QsMkJBQU8sT0FBTyxDQUFDLElBQUksQ0FBQztpQkFDdkI7O3VCQWpDUSxNQUFNOzs7OztBQW9DbkIsa0JBQU0sQ0FBQyxNQUFNLEdBQUcsVUFBQyxNQUFNLEVBQUUsV0FBVyxFQUFLO0FBQ3JDLG9CQUFJLENBQUMsTUFBTSxFQUFFO0FBQ1QsMEJBQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNoQzs7QUFFRCxzQkFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLFdBQVcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7O0FBRTVFLHVCQUFPLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQzthQUMxQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
