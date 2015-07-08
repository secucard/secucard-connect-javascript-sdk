System.register(['../net/Http', 'lodash'], function (_export) {
  'use strict';

  var Http, _, grant_options_default, grant_options, Auth;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_netHttp) {
      Http = _netHttp.Http;
    }, function (_lodash) {
      _ = _lodash['default'];
    }],
    execute: function () {
      grant_options_default = {
        client_id: '',
        client_secret: ''
      };

      grant_options = function grant_options(extend) {
        return _.merge({
          send: grant_options_default,
          set: [{ label: 'Content-Type', value: 'application/x-www-form-urlencoded' }]
        }, extend);
      };

      Auth = (function () {
        function Auth(config) {
          var _this = this;

          _classCallCheck(this, Auth);

          this.http = new Http();
          this.oauthTokenUrl = config.host_auth + '/oauth/token';
          grant_options_default = {
            client_id: config.client_id,
            client_secret: config.client_secret
          };
          this.grant = {
            access: {
              clientCredentials: function clientCredentials() {
                var options = grant_options({ send: { grant_type: 'client_credentials' } });
                return _this.http.post(url.oauth_token, options);
              }
            }
          };
        }

        Auth.prototype.getClientCredentials = function getClientCredentials() {
          return this.grant.access.clientCredentials();
        };

        return Auth;
      })();

      _export('Auth', Auth);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbS9zZWN1Y2FyZC9jb25uZWN0L2F1dGgvQXV0aC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7ZUFHSyxxQkFBcUIsRUFJckIsYUFBYSxFQVFMLElBQUk7Ozs7OztzQkFmVCxJQUFJOzs7OztBQUdQLDJCQUFxQixHQUFHO0FBQzNCLGlCQUFTLEVBQUMsRUFBRTtBQUNaLHFCQUFhLEVBQUMsRUFBRTtPQUNoQjs7QUFDRyxtQkFBYSxHQUFHLFNBQWhCLGFBQWEsQ0FBSSxNQUFNLEVBQUs7QUFDL0IsZUFBTyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ2IsY0FBSSxFQUFFLHFCQUFxQjtBQUM3QixhQUFHLEVBQUMsQ0FDSixFQUFDLEtBQUssRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFDLG1DQUFtQyxFQUFDLENBQ2pFO1NBQ0EsRUFBRSxNQUFNLENBQUMsQ0FBQTtPQUNWOztBQUNXLFVBQUk7QUFDSixpQkFEQSxJQUFJLENBQ0gsTUFBTSxFQUFFOzs7Z0NBRFQsSUFBSTs7QUFFYixjQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUE7QUFDdEIsY0FBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQTtBQUN0RCwrQkFBcUIsR0FBRztBQUN0QixxQkFBUyxFQUFDLE1BQU0sQ0FBQyxTQUFTO0FBQzFCLHlCQUFhLEVBQUMsTUFBTSxDQUFDLGFBQWE7V0FDbkMsQ0FBQTtBQUNELGNBQUksQ0FBQyxLQUFLLEdBQUc7QUFDWCxrQkFBTSxFQUFFO0FBQ04sK0JBQWlCLEVBQUUsNkJBQU07QUFDdkIsb0JBQUksT0FBTyxHQUFHLGFBQWEsQ0FBQyxFQUFDLElBQUksRUFBQyxFQUFDLFVBQVUsRUFBQyxvQkFBb0IsRUFBQyxFQUFDLENBQUMsQ0FBQTtBQUNyRSx1QkFBTyxNQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQTtlQUNoRDthQUNGO1dBQ0YsQ0FBQTtTQUNGOztBQWhCVSxZQUFJLFdBaUJmLG9CQUFvQixHQUFBLGdDQUFHO0FBQ3JCLGlCQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUE7U0FDN0M7O2VBbkJVLElBQUk7OztzQkFBSixJQUFJIiwiZmlsZSI6ImNvbS9zZWN1Y2FyZC9jb25uZWN0L2F1dGgvQXV0aC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=