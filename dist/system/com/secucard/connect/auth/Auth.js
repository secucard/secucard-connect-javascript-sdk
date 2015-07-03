System.register(['../net/Http', 'lodash'], function (_export) {
  'use strict';

  var Http, _, host_auth, url, grant_options_default, grant_options, Auth;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_netHttp) {
      Http = _netHttp.Http;
    }, function (_lodash) {
      _ = _lodash['default'];
    }],
    execute: function () {
      host_auth = 'https://connect.secucard.com';
      url = {
        oauth_token: host_auth + '/oauth/token'
      };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbS9zZWN1Y2FyZC9jb25uZWN0L2F1dGgvQXV0aC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7ZUFHSSxTQUFTLEVBQ1QsR0FBRyxFQUdGLHFCQUFxQixFQUlyQixhQUFhLEVBUUwsSUFBSTs7Ozs7O3NCQW5CVCxJQUFJOzs7OztBQUdSLGVBQVMsR0FBRyw4QkFBOEI7QUFDMUMsU0FBRyxHQUFHO0FBQ1IsbUJBQVcsRUFBQyxTQUFTLEdBQUcsY0FBYztPQUN0QztBQUNHLDJCQUFxQixHQUFHO0FBQzNCLGlCQUFTLEVBQUMsRUFBRTtBQUNaLHFCQUFhLEVBQUMsRUFBRTtPQUNoQjs7QUFDRyxtQkFBYSxHQUFHLFNBQWhCLGFBQWEsQ0FBSSxNQUFNLEVBQUs7QUFDL0IsZUFBTyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ2IsY0FBSSxFQUFFLHFCQUFxQjtBQUM3QixhQUFHLEVBQUMsQ0FDSixFQUFDLEtBQUssRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFDLG1DQUFtQyxFQUFDLENBQ2pFO1NBQ0EsRUFBRSxNQUFNLENBQUMsQ0FBQTtPQUNWOztBQUNXLFVBQUk7QUFDSixpQkFEQSxJQUFJLENBQ0gsTUFBTSxFQUFFOzs7Z0NBRFQsSUFBSTs7QUFFYixjQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUE7QUFDdEIsK0JBQXFCLEdBQUc7QUFDdEIscUJBQVMsRUFBQyxNQUFNLENBQUMsU0FBUztBQUMxQix5QkFBYSxFQUFDLE1BQU0sQ0FBQyxhQUFhO1dBQ25DLENBQUE7QUFDRCxjQUFJLENBQUMsS0FBSyxHQUFHO0FBQ1gsa0JBQU0sRUFBRTtBQUNOLCtCQUFpQixFQUFFLDZCQUFNO0FBQ3ZCLG9CQUFJLE9BQU8sR0FBRyxhQUFhLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBQyxVQUFVLEVBQUMsb0JBQW9CLEVBQUMsRUFBQyxDQUFDLENBQUE7QUFDckUsdUJBQU8sTUFBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUE7ZUFDaEQ7YUFDRjtXQUNGLENBQUE7U0FDRjs7QUFmVSxZQUFJLFdBZ0JmLG9CQUFvQixHQUFBLGdDQUFHO0FBQ3JCLGlCQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUE7U0FDN0M7O2VBbEJVLElBQUk7OztzQkFBSixJQUFJIiwiZmlsZSI6ImNvbS9zZWN1Y2FyZC9jb25uZWN0L2F1dGgvQXV0aC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=