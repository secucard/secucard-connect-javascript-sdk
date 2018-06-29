'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ClientContext = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _rest = require('./net/rest');

var _auth = require('./auth/auth');

var _credentials = require('./auth/credentials');

var _appService = require('./product/app/app-service');

var _channel = require('./net/channel');

var _eventemitter = require('eventemitter3');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _tokenStorage = require('./auth/token-storage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClientContext = exports.ClientContext = function () {
    function ClientContext(config, environment) {
        _classCallCheck(this, ClientContext);

        Object.assign(this, _eventemitter2.default.prototype);

        this.tokenStorageCreate = environment.TokenStorage.create;

        var auth = new _auth.Auth();
        auth.configureWithContext(this);
        this.auth = auth;

        var restChannel = new _rest.Rest();
        restChannel.configureWithContext(this);
        this.restChannel = restChannel;

        if (config.stompEnabled) {
            var stompChannel = environment.StompChannel.create();
            stompChannel.configureWithContext(this);
            this.stompChannel = stompChannel;
        }

        this.channels = {
            stomp: this.stompChannel,
            rest: this.restChannel
        };

        this.serviceEventTargets = Object.create(null);

        this.createServices(environment.services);

        this.config = config;
    }

    _createClass(ClientContext, [{
        key: 'open',
        value: function open() {
            var _this = this;

            return this.getAuth().getToken().then(function () {
                if (!_this.config.stompEnabled) {
                    return true;
                }

                return Promise.all(_lodash2.default.map(_lodash2.default.values(_this.channels), function (channel) {
                    return channel.open();
                }));
            });
        }
    }, {
        key: 'createServices',
        value: function createServices(classList) {
            var services = Object.create(null);
            var ServiceClass = void 0;
            var service = void 0;
            var uid = void 0;
            for (var i = 0; i < classList.length; i++) {
                ServiceClass = classList[i];
                service = new ServiceClass();
                service.configureWithContext(this);
                uid = service.getUid();
                services[uid] = service;
                this.registerServiceEventTargets(service, service.getEventTargets());
            }

            this.services = services;
        }
    }, {
        key: 'getService',
        value: function getService(uid) {
            return this.services[uid.toLowerCase()];
        }
    }, {
        key: 'addAppService',
        value: function addAppService(AppMixin) {
            var appService = _appService.AppService.createWithMixin(AppMixin);
            appService.configureWithContext(this);
            this.services[appService.getUid()] = appService;
            this.registerServiceEventTargets(appService, appService.getEventTargets());
            return appService;
        }
    }, {
        key: 'removeAppService',
        value: function removeAppService(uid) {
            var appService = this.services[uid];

            if (appService && appService.isApp) {
                this.unregisterServiceEventTargets(appService.getEventTargets());
                delete this.services[uid];
            } else {
                throw new Error('Service not found: ' + uid);
            }
        }
    }, {
        key: 'setCredentials',
        value: function setCredentials(credentials, TokenStorageMixin) {
            this.credentials = _credentials.Credentials.create(credentials);
            if (TokenStorageMixin) {
                this.tokenStorage = _tokenStorage.TokenStorageInMem.createWithMixin(TokenStorageMixin);
            } else {
                this.tokenStorage = this.tokenStorageCreate();
            }
            this.tokenStorage.getRetrieveToken = this.config.getRetrieveToken.bind(this.config);

            return this.tokenStorage.setCredentials(Object.assign({}, credentials));
        }
    }, {
        key: 'setLanguage',
        value: function setLanguage(lang) {
            this.config.setLanguage(lang);
        }
    }, {
        key: 'getCredentials',
        value: function getCredentials() {
            return this.credentials;
        }
    }, {
        key: 'getTokenStorage',
        value: function getTokenStorage() {
            return this.tokenStorage;
        }
    }, {
        key: 'getStoredToken',
        value: function getStoredToken() {
            return this.tokenStorage ? this.tokenStorage.getStoredToken() : Promise.resolve(null);
        }
    }, {
        key: 'exportToken',
        value: function exportToken(isRaw) {
            return this.getAuth().getToken().then(function (token) {
                return token ? !isRaw ? _lodash2.default.pick(token, ['access_token', 'expireTime', 'scope', 'expires_in']) : token : null;
            });
        }
    }, {
        key: 'getConfig',
        value: function getConfig() {
            return this.config;
        }
    }, {
        key: 'getAuth',
        value: function getAuth() {
            return this.auth;
        }
    }, {
        key: 'getChannel',
        value: function getChannel(channelConfig) {
            var _this2 = this;

            var ch = null;
            _lodash2.default.each((0, _lodash2.default)(channelConfig).reverse().value(), function (type) {
                if (_this2.getChannelByType(type)) {
                    ch = _this2.getChannelByType(type);
                }
            });
            if (!ch) {
                throw new Error('Channel not found, please, check channel config for the service: ' + JSON.stringify(channelConfig));
            }
            return ch;
        }
    }, {
        key: 'getChannelByType',
        value: function getChannelByType(type) {
            return this.channels[type];
        }
    }, {
        key: 'getRestChannel',
        value: function getRestChannel() {
            return this.restChannel;
        }
    }, {
        key: 'getStompChannel',
        value: function getStompChannel() {
            return this.stompChannel;
        }
    }, {
        key: 'getServiceDefaultOptions',
        value: function getServiceDefaultOptions() {
            return {
                channelConfig: [_channel.Channel.STOMP, _channel.Channel.REST],
                useAuth: true
            };
        }
    }, {
        key: 'isRequestWithToken',
        value: function isRequestWithToken(options) {
            return !options || options && (!options.hasOwnProperty('useAuth') || options.useAuth);
        }
    }, {
        key: 'registerServiceEventTargets',
        value: function registerServiceEventTargets(service, targets) {
            var _this3 = this;

            _lodash2.default.each(targets, function (target) {
                if (_this3.serviceEventTargets[target.toLowerCase()]) {
                    throw new Error('Provided event target is registered already: ' + target.toLowerCase());
                }

                _this3.serviceEventTargets[target.toLowerCase()] = service;
            });
        }
    }, {
        key: 'unregisterServiceEventTargets',
        value: function unregisterServiceEventTargets(targets) {
            var _this4 = this;

            _lodash2.default.each(targets, function (target) {
                delete _this4.serviceEventTargets[target.toLowerCase()];
            });
        }
    }, {
        key: 'emitServiceEvent',
        value: function emitServiceEvent(event, target, type, data) {
            if (event) {
                target = event.target || target;
                type = event.type || type;
                data = event.data || data;
            }

            target = target.toLowerCase();
            var service = this.serviceEventTargets[target];
            service.emit(type, data);
        }
    }]);

    return ClientContext;
}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LWNvbnRleHQuanMiXSwibmFtZXMiOlsiQ2xpZW50Q29udGV4dCIsImNvbmZpZyIsImVudmlyb25tZW50IiwiT2JqZWN0IiwiYXNzaWduIiwiRUUiLCJwcm90b3R5cGUiLCJ0b2tlblN0b3JhZ2VDcmVhdGUiLCJUb2tlblN0b3JhZ2UiLCJjcmVhdGUiLCJhdXRoIiwiQXV0aCIsImNvbmZpZ3VyZVdpdGhDb250ZXh0IiwicmVzdENoYW5uZWwiLCJSZXN0Iiwic3RvbXBFbmFibGVkIiwic3RvbXBDaGFubmVsIiwiU3RvbXBDaGFubmVsIiwiY2hhbm5lbHMiLCJzdG9tcCIsInJlc3QiLCJzZXJ2aWNlRXZlbnRUYXJnZXRzIiwiY3JlYXRlU2VydmljZXMiLCJzZXJ2aWNlcyIsImdldEF1dGgiLCJnZXRUb2tlbiIsInRoZW4iLCJQcm9taXNlIiwiYWxsIiwiXyIsIm1hcCIsInZhbHVlcyIsImNoYW5uZWwiLCJvcGVuIiwiY2xhc3NMaXN0IiwiU2VydmljZUNsYXNzIiwic2VydmljZSIsInVpZCIsImkiLCJsZW5ndGgiLCJnZXRVaWQiLCJyZWdpc3RlclNlcnZpY2VFdmVudFRhcmdldHMiLCJnZXRFdmVudFRhcmdldHMiLCJ0b0xvd2VyQ2FzZSIsIkFwcE1peGluIiwiYXBwU2VydmljZSIsIkFwcFNlcnZpY2UiLCJjcmVhdGVXaXRoTWl4aW4iLCJpc0FwcCIsInVucmVnaXN0ZXJTZXJ2aWNlRXZlbnRUYXJnZXRzIiwiRXJyb3IiLCJjcmVkZW50aWFscyIsIlRva2VuU3RvcmFnZU1peGluIiwiQ3JlZGVudGlhbHMiLCJ0b2tlblN0b3JhZ2UiLCJUb2tlblN0b3JhZ2VJbk1lbSIsImdldFJldHJpZXZlVG9rZW4iLCJiaW5kIiwic2V0Q3JlZGVudGlhbHMiLCJsYW5nIiwic2V0TGFuZ3VhZ2UiLCJnZXRTdG9yZWRUb2tlbiIsInJlc29sdmUiLCJpc1JhdyIsInRva2VuIiwicGljayIsImNoYW5uZWxDb25maWciLCJjaCIsImVhY2giLCJyZXZlcnNlIiwidmFsdWUiLCJ0eXBlIiwiZ2V0Q2hhbm5lbEJ5VHlwZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJDaGFubmVsIiwiU1RPTVAiLCJSRVNUIiwidXNlQXV0aCIsIm9wdGlvbnMiLCJoYXNPd25Qcm9wZXJ0eSIsInRhcmdldHMiLCJ0YXJnZXQiLCJldmVudCIsImRhdGEiLCJlbWl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFXQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVhQSxhLFdBQUFBLGE7QUFFVCwyQkFBWUMsTUFBWixFQUFvQkMsV0FBcEIsRUFBaUM7QUFBQTs7QUFDN0JDLGVBQU9DLE1BQVAsQ0FBYyxJQUFkLEVBQW9CQyx1QkFBR0MsU0FBdkI7O0FBRUEsYUFBS0Msa0JBQUwsR0FBMEJMLFlBQVlNLFlBQVosQ0FBeUJDLE1BQW5EOztBQUVBLFlBQUlDLE9BQU8sSUFBSUMsVUFBSixFQUFYO0FBQ0FELGFBQUtFLG9CQUFMLENBQTBCLElBQTFCO0FBQ0EsYUFBS0YsSUFBTCxHQUFZQSxJQUFaOztBQUVBLFlBQUlHLGNBQWMsSUFBSUMsVUFBSixFQUFsQjtBQUNBRCxvQkFBWUQsb0JBQVosQ0FBaUMsSUFBakM7QUFDQSxhQUFLQyxXQUFMLEdBQW1CQSxXQUFuQjs7QUFFQSxZQUFJWixPQUFPYyxZQUFYLEVBQXlCO0FBQ3JCLGdCQUFJQyxlQUFlZCxZQUFZZSxZQUFaLENBQXlCUixNQUF6QixFQUFuQjtBQUNBTyx5QkFBYUosb0JBQWIsQ0FBa0MsSUFBbEM7QUFDQSxpQkFBS0ksWUFBTCxHQUFvQkEsWUFBcEI7QUFDSDs7QUFFRCxhQUFLRSxRQUFMLEdBQWdCO0FBQ1pDLG1CQUFPLEtBQUtILFlBREE7QUFFWkksa0JBQU0sS0FBS1A7QUFGQyxTQUFoQjs7QUFLQSxhQUFLUSxtQkFBTCxHQUEyQmxCLE9BQU9NLE1BQVAsQ0FBYyxJQUFkLENBQTNCOztBQUVBLGFBQUthLGNBQUwsQ0FBb0JwQixZQUFZcUIsUUFBaEM7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O3lDQUVnQkksSSxFQUFNO0FBQ25CLG1CQUFPLEtBQUtyRCxRQUFMLENBQWNxRCxJQUFkLENBQVA7QUFDSDs7O3lDQUVnQjtBQUNiLG1CQUFPLEtBQUsxRCxXQUFaO0FBQ0g7OzswQ0FFaUI7QUFDZCxtQkFBTyxLQUFLRyxZQUFaO0FBQ0g7OzttREFFMEI7QUFDdkIsbUJBQU87QUFFSGtELCtCQUFlLENBQUNTLGlCQUFRQyxLQUFULEVBQWdCRCxpQkFBUUUsSUFBeEIsQ0FGWjtBQUdIQyx5QkFBUztBQUhOLGFBQVA7QUFLSDs7OzJDQUVrQkMsTyxFQUFTO0FBQ3hCLG1CQUFPLENBQUNBLE9BQUQsSUFBYUEsWUFBWSxDQUFDQSxRQUFRQyxjQUFSLENBQXVCLFNBQXZCLENBQUQsSUFBc0NELFFBQVFELE9BQTFELENBQXBCO0FBQ0g7OztvREFFMkIxQyxPLEVBQVM2QyxPLEVBQVM7QUFBQTs7QUFDMUNwRCw2QkFBRXVDLElBQUYsQ0FBT2EsT0FBUCxFQUFnQixVQUFDQyxNQUFELEVBQVk7QUFDeEIsb0JBQUksT0FBSzdELG1CQUFMLENBQXlCNkQsT0FBT3ZDLFdBQVAsRUFBekIsQ0FBSixFQUFvRDtBQUNoRCwwQkFBTSxJQUFJTyxLQUFKLENBQVUsa0RBQWtEZ0MsT0FBT3ZDLFdBQVAsRUFBNUQsQ0FBTjtBQUNIOztBQUVELHVCQUFLdEIsbUJBQUwsQ0FBeUI2RCxPQUFPdkMsV0FBUCxFQUF6QixJQUFpRFAsT0FBakQ7QUFDSCxhQU5EO0FBT0g7OztzREFFNkI2QyxPLEVBQVM7QUFBQTs7QUFDbkNwRCw2QkFBRXVDLElBQUYsQ0FBT2EsT0FBUCxFQUFnQixVQUFDQyxNQUFELEVBQVk7QUFDeEIsdUJBQU8sT0FBSzdELG1CQUFMLENBQXlCNkQsT0FBT3ZDLFdBQVAsRUFBekIsQ0FBUDtBQUNILGFBRkQ7QUFHSDs7O3lDQUVnQndDLEssRUFBT0QsTSxFQUFRWCxJLEVBQU1hLEksRUFBTTtBQUN4QyxnQkFBSUQsS0FBSixFQUFXO0FBQ1BELHlCQUFTQyxNQUFNRCxNQUFOLElBQWdCQSxNQUF6QjtBQUNBWCx1QkFBT1ksTUFBTVosSUFBTixJQUFjQSxJQUFyQjtBQUNBYSx1QkFBT0QsTUFBTUMsSUFBTixJQUFjQSxJQUFyQjtBQUNIOztBQUVERixxQkFBU0EsT0FBT3ZDLFdBQVAsRUFBVDtBQUNBLGdCQUFJUCxVQUFVLEtBQUtmLG1CQUFMLENBQXlCNkQsTUFBekIsQ0FBZDtBQUNBOUMsb0JBQVFpRCxJQUFSLENBQWFkLElBQWIsRUFBbUJhLElBQW5CO0FBQ0giLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9jbGllbnQtY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
