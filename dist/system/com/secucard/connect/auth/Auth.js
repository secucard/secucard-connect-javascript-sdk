System.register(['../net/Http', 'lodash'], function (_export) {
  'use strict';

  var Http, _, host_auth, url, grant_options, Auth;

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

      grant_options = function grant_options(extend) {
        return _.merge({
          send: {
            username: 'testuser',
            password: 'testpassword',
            client_id: 'XXXXXX',
            client_secret: 'XXXXXXXX'
          },
          set: [{ label: 'Content-Type', value: 'application/x-www-form-urlencoded' }]
        }, extend);
      };

      Auth = function Auth() {
        var _this = this;

        _classCallCheck(this, Auth);

        this.http = new Http();
        this.grant = {
          access: {
            appUser: function appUser() {
              var options = grant_options({ send: { grant_type: 'appuser' } });
              return _this.http.post(url.oauth_token, options);
            }
          }
        };
      };

      _export('Auth', Auth);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbS9zZWN1Y2FyZC9jb25uZWN0L2F1dGgvQXV0aC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7ZUFHSSxTQUFTLEVBQ1QsR0FBRyxFQUdGLGFBQWEsRUFhTCxJQUFJOzs7Ozs7c0JBcEJULElBQUk7Ozs7O0FBR1IsZUFBUyxHQUFHLDhCQUE4QjtBQUMxQyxTQUFHLEdBQUc7QUFDUixtQkFBVyxFQUFDLFNBQVMsR0FBRyxjQUFjO09BQ3RDOztBQUNHLG1CQUFhLEdBQUcsU0FBaEIsYUFBYSxDQUFJLE1BQU0sRUFBSztBQUMvQixlQUFPLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDYixjQUFJLEVBQUU7QUFDTixvQkFBUSxFQUFFLFVBQVU7QUFDcEIsb0JBQVEsRUFBRSxjQUFjO0FBQ3hCLHFCQUFTLEVBQUMsUUFBUTtBQUNsQix5QkFBYSxFQUFDLFVBQVU7V0FDekI7QUFDRCxhQUFHLEVBQUMsQ0FDSixFQUFDLEtBQUssRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFDLG1DQUFtQyxFQUFDLENBQ2pFO1NBQ0EsRUFBRSxNQUFNLENBQUMsQ0FBQTtPQUNWOztBQUNXLFVBQUksR0FDSixTQURBLElBQUksR0FDRDs7OzhCQURILElBQUk7O0FBRWIsWUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO0FBQ3RCLFlBQUksQ0FBQyxLQUFLLEdBQUc7QUFDYixnQkFBTSxFQUFDO0FBQ0wsbUJBQU8sRUFBRSxtQkFBTTtBQUNiLGtCQUFJLE9BQU8sR0FBRyxhQUFhLENBQUMsRUFBQyxJQUFJLEVBQUMsRUFBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLEVBQUMsQ0FBQyxDQUFBO0FBQzFELHFCQUFPLE1BQUssSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFBO2FBQ2hEO1dBQ0Y7U0FDRixDQUFBO09BQ0Y7O3NCQVhZLElBQUkiLCJmaWxlIjoiY29tL3NlY3VjYXJkL2Nvbm5lY3QvYXV0aC9BdXRoLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==