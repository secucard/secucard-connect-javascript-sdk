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
          _classCallCheck(this, Auth);

          var self = this;
          self.http = new Http();
          self.oauthTokenUrl = config.host_auth + '/oauth/token';
          grant_options_default = {
            client_id: config.client_id,
            client_secret: config.client_secret
          };
          self.grant = {
            access: {
              clientCredentials: function clientCredentials() {
                var options = grant_options({ send: { grant_type: 'client_credentials' } });
                return self.http.post(self.oauthTokenUrl, options);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbS9zZWN1Y2FyZC9jb25uZWN0L2F1dGgvQXV0aC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7ZUFHSyxxQkFBcUIsRUFJckIsYUFBYSxFQVFMLElBQUk7Ozs7OztzQkFmVCxJQUFJOzs7OztBQUdQLDJCQUFxQixHQUFHO0FBQzNCLGlCQUFTLEVBQUMsRUFBRTtBQUNaLHFCQUFhLEVBQUMsRUFBRTtPQUNoQjs7QUFDRyxtQkFBYSxHQUFHLFNBQWhCLGFBQWEsQ0FBSSxNQUFNLEVBQUs7QUFDL0IsZUFBTyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ2IsY0FBSSxFQUFFLHFCQUFxQjtBQUM3QixhQUFHLEVBQUMsQ0FDSixFQUFDLEtBQUssRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFDLG1DQUFtQyxFQUFDLENBQ2pFO1NBQ0EsRUFBRSxNQUFNLENBQUMsQ0FBQTtPQUNWOztBQUNXLFVBQUk7QUFDSixpQkFEQSxJQUFJLENBQ0gsTUFBTSxFQUFFO2dDQURULElBQUk7O0FBRWIsY0FBSSxJQUFJLEdBQUcsSUFBSSxDQUFBO0FBQ2YsY0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO0FBQ3RCLGNBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUE7QUFDdEQsK0JBQXFCLEdBQUc7QUFDdEIscUJBQVMsRUFBQyxNQUFNLENBQUMsU0FBUztBQUMxQix5QkFBYSxFQUFDLE1BQU0sQ0FBQyxhQUFhO1dBQ25DLENBQUE7QUFDRCxjQUFJLENBQUMsS0FBSyxHQUFHO0FBQ1gsa0JBQU0sRUFBRTtBQUNOLCtCQUFpQixFQUFFLDZCQUFNO0FBQ3ZCLG9CQUFJLE9BQU8sR0FBRyxhQUFhLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBQyxVQUFVLEVBQUMsb0JBQW9CLEVBQUMsRUFBQyxDQUFDLENBQUE7QUFDckUsdUJBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQTtlQUNuRDthQUNGO1dBQ0YsQ0FBQTtTQUNGOztBQWpCVSxZQUFJLFdBa0JmLG9CQUFvQixHQUFBLGdDQUFHO0FBQ3JCLGlCQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUE7U0FDN0M7O2VBcEJVLElBQUk7OztzQkFBSixJQUFJIiwiZmlsZSI6ImNvbS9zZWN1Y2FyZC9jb25uZWN0L2F1dGgvQXV0aC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=