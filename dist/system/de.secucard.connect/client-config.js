'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClientConfig = exports.ClientConfig = function () {
    function ClientConfig() {
        _classCallCheck(this, ClientConfig);
    }

    _createClass(ClientConfig, [{
        key: 'getOAuthUrl',
        value: function getOAuthUrl() {
            return this._getCompleteUrl(this.oAuthUrl);
        }
    }, {
        key: 'getRestUrl',
        value: function getRestUrl() {
            return this._getCompleteUrl(this.restUrl);
        }
    }, {
        key: 'getStompHost',
        value: function getStompHost() {
            var value = this.stompHost;
            if (value.endsWith('/')) {
                value = value.slice(0, value.length - 1);
            }
            return value;
        }
    }, {
        key: 'getStompPort',
        value: function getStompPort() {
            return this.stompPort;
        }
    }, {
        key: 'getStompSslEnabled',
        value: function getStompSslEnabled() {
            return this.stompSslEnabled;
        }
    }, {
        key: 'getStompVHost',
        value: function getStompVHost() {
            return this.stompVHost;
        }
    }, {
        key: 'getStompQueue',
        value: function getStompQueue() {
            return this.stompQueue;
        }
    }, {
        key: 'getStompDestination',
        value: function getStompDestination() {
            return this._getCompleteUrl(this.stompDestination);
        }
    }, {
        key: 'getStompEndpoint',
        value: function getStompEndpoint() {
            return this.stompEndpoint;
        }
    }, {
        key: 'getStompHeartbeatMs',
        value: function getStompHeartbeatMs() {
            return this.stompHeartbeatSec * 1000;
        }
    }, {
        key: 'isDevice',
        value: function isDevice() {
            return Boolean(this.deviceUUID);
        }
    }, {
        key: 'getDeviceUUID',
        value: function getDeviceUUID() {
            return this.deviceUUID;
        }
    }, {
        key: 'getRetrieveToken',
        value: function getRetrieveToken() {
            return this.retrieveToken;
        }
    }, {
        key: 'getWithCredentials',
        value: function getWithCredentials() {
            return this.withCredentials;
        }
    }, {
        key: '_getCompleteUrl',
        value: function _getCompleteUrl(value) {
            var url = value;
            if (!url.endsWith('/')) {
                url += '/';
            }
            return url;
        }
    }, {
        key: 'getLanguage',
        value: function getLanguage() {
            return this.language;
        }
    }, {
        key: 'setLanguage',
        value: function setLanguage(lang) {
            this.language = lang;
        }
    }]);

    return ClientConfig;
}();

ClientConfig._defaults = {
    channelDefault: '',
    cacheDir: '',
    deviceUUID: null,

    oAuthUrl: 'https://connect.secucard.com/oauth/',

    authDeviceTimeout: 0,
    restUrl: 'https://connect.secucard.com/api/v2/',

    restTimeout: 0,
    stompEnabled: true,

    stompHeartbeatSec: 30,

    stompHost: 'connect.secucard.com',
    stompPort: 61614,
    stompVHost: null,
    stompEndpoint: '',
    stompDestination: '/exchange/connect.api',

    stompSslEnabled: true,

    stompQueue: '/temp-queue/main',

    stompConnectTimeoutSec: 0,
    stompMessageTimeoutSec: 0,
    stompMessageAge: 0,
    retrieveToken: null,

    withCredentials: false,

    language: 'de'
};

ClientConfig.defaults = function () {
    var config = new ClientConfig();
    Object.assign(config, ClientConfig._defaults);
    return config;
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LWNvbmZpZy5qcyJdLCJuYW1lcyI6WyJDbGllbnRDb25maWciLCJfZ2V0Q29tcGxldGVVcmwiLCJvQXV0aFVybCIsInJlc3RVcmwiLCJ2YWx1ZSIsInN0b21wSG9zdCIsImVuZHNXaXRoIiwic2xpY2UiLCJsZW5ndGgiLCJzdG9tcFBvcnQiLCJzdG9tcFNzbEVuYWJsZWQiLCJzdG9tcFZIb3N0Iiwic3RvbXBRdWV1ZSIsInN0b21wRGVzdGluYXRpb24iLCJzdG9tcEVuZHBvaW50Iiwic3RvbXBIZWFydGJlYXRTZWMiLCJCb29sZWFuIiwiZGV2aWNlVVVJRCIsInJldHJpZXZlVG9rZW4iLCJ3aXRoQ3JlZGVudGlhbHMiLCJ1cmwiLCJsYW5ndWFnZSIsImxhbmciLCJfZGVmYXVsdHMiLCJjaGFubmVsRGVmYXVsdCIsImNhY2hlRGlyIiwiYXV0aERldmljZVRpbWVvdXQiLCJyZXN0VGltZW91dCIsInN0b21wRW5hYmxlZCIsInN0b21wQ29ubmVjdFRpbWVvdXRTZWMiLCJzdG9tcE1lc3NhZ2VUaW1lb3V0U2VjIiwic3RvbXBNZXNzYWdlQWdlIiwiZGVmYXVsdHMiLCJjb25maWciLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFXYUEsWSxXQUFBQSxZO0FBRVQsNEJBQWM7QUFBQTtBQUViOzs7O3NDQUVhO0FBQ1YsbUJBQU8sS0FBS0MsZUFBTCxDQUFxQixLQUFLQyxRQUExQixDQUFQO0FBQ0g7OztxQ0FFWTtBQUNULG1CQUFPLEtBQUtELGVBQUwsQ0FBcUIsS0FBS0UsT0FBMUIsQ0FBUDtBQUNIOzs7dUNBRWM7QUFDWCxnQkFBSUMsUUFBUSxLQUFLQyxTQUFqQjtBQUNBLGdCQUFJRCxNQUFNRSxRQUFOLENBQWUsR0FBZixDQUFKLEVBQXlCO0FBQ3JCRix3QkFBUUEsTUFBTUcsS0FBTixDQUFZLENBQVosRUFBZUgsTUFBTUksTUFBTixHQUFlLENBQTlCLENBQVI7QUFDSDtBQUNELG1CQUFPSixLQUFQO0FBQ0g7Ozt1Q0FFYztBQUNYLG1CQUFPLEtBQUtLLFNBQVo7QUFDSDs7OzZDQUVvQjtBQUNqQixtQkFBTyxLQUFLQyxlQUFaO0FBQ0g7Ozt3Q0FFZTtBQUNaLG1CQUFPLEtBQUtDLFVBQVo7QUFDSDs7O3dDQUVlO0FBQ1osbUJBQU8sS0FBS0MsVUFBWjtBQUNIOzs7OENBRXFCO0FBQ2xCLG1CQUFPLEtBQUtYLGVBQUwsQ0FBcUIsS0FBS1ksZ0JBQTFCLENBQVA7QUFDSDs7OzJDQUVrQjtBQUNmLG1CQUFPLEtBQUtDLGFBQVo7QUFDSDs7OzhDQUVxQjtBQUNsQixtQkFBTyxLQUFLQyxpQkFBTCxHQUF5QixJQUFoQztBQUNIOzs7bUNBRVU7QUFDUCxtQkFBT0MsUUFBUSxLQUFLQyxVQUFiLENBQVA7QUFDSDs7O3dDQUVlO0FBQ1osbUJBQU8sS0FBS0EsVUFBWjtBQUNIOzs7MkNBRWtCO0FBQ2YsbUJBQU8sS0FBS0MsYUFBWjtBQUNIOzs7NkNBRW9CO0FBQ2pCLG1CQUFPLEtBQUtDLGVBQVo7QUFDSDs7O3dDQUVlZixLLEVBQU87QUFDbkIsZ0JBQUlnQixNQUFNaEIsS0FBVjtBQUNBLGdCQUFJLENBQUNnQixJQUFJZCxRQUFKLENBQWEsR0FBYixDQUFMLEVBQXdCO0FBQ3BCYyx1QkFBTyxHQUFQO0FBQ0g7QUFDRCxtQkFBT0EsR0FBUDtBQUNIOzs7c0NBRWE7QUFDVixtQkFBTyxLQUFLQyxRQUFaO0FBQ0g7OztvQ0FFV0MsSSxFQUFNO0FBQ2QsaUJBQUtELFFBQUwsR0FBZ0JDLElBQWhCO0FBQ0g7Ozs7OztBQUdMdEIsYUFBYXVCLFNBQWIsR0FBeUI7QUFFckJDLG9CQUFnQixFQUZLO0FBS3JCQyxjQUFVLEVBTFc7QUFRckJSLGdCQUFZLElBUlM7O0FBV3JCZixjQUFVLHFDQVhXOztBQWFyQndCLHVCQUFtQixDQWJFO0FBZ0JyQnZCLGFBQVMsc0NBaEJZOztBQWtCckJ3QixpQkFBYSxDQWxCUTtBQXFCckJDLGtCQUFjLElBckJPOztBQXVCckJiLHVCQUFtQixFQXZCRTs7QUF5QnJCVixlQUFXLHNCQXpCVTtBQTBCckJJLGVBQVcsS0ExQlU7QUEyQnJCRSxnQkFBWSxJQTNCUztBQTRCckJHLG1CQUFlLEVBNUJNO0FBOEJyQkQsc0JBQWtCLHVCQTlCRzs7QUFnQ3JCSCxxQkFBaUIsSUFoQ0k7O0FBbUNyQkUsZ0JBQVksa0JBbkNTOztBQXNDckJpQiw0QkFBd0IsQ0F0Q0g7QUF3Q3JCQyw0QkFBd0IsQ0F4Q0g7QUE4Q3JCQyxxQkFBaUIsQ0E5Q0k7QUFpRHJCYixtQkFBZSxJQWpETTs7QUFvRHJCQyxxQkFBaUIsS0FwREk7O0FBdURyQkUsY0FBVTtBQXZEVyxDQUF6Qjs7QUEwREFyQixhQUFhZ0MsUUFBYixHQUF3QixZQUFNO0FBQzFCLFFBQUlDLFNBQVMsSUFBSWpDLFlBQUosRUFBYjtBQUNBa0MsV0FBT0MsTUFBUCxDQUFjRixNQUFkLEVBQXNCakMsYUFBYXVCLFNBQW5DO0FBQ0EsV0FBT1UsTUFBUDtBQUNILENBSkQiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9jbGllbnQtY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
