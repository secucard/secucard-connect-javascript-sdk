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
            username: 'developer@secucard.de',
            password: 'Test12345!',
            client_id: 'f0478f73afe218e8b5f751a07c978ecf',
            client_secret: '30644327cfbde722ad2ad12bb9c0a2f86a2bee0a2d8de8d862210112af3d01bb'
          },
          set: [{ label: 'Content-Type', value: 'application/x-www-form-urlencoded' }]
        }, extend);
      };

      Auth = (function () {
        function Auth() {
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
        }

        Auth.prototype.getToken = function getToken() {
          return this.grant.access.appUser();
        };

        return Auth;
      })();

      _export('Auth', Auth);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbS9zZWN1Y2FyZC9jb25uZWN0L2F1dGgvQXV0aC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7ZUFHSSxTQUFTLEVBQ1QsR0FBRyxFQUdGLGFBQWEsRUFhTCxJQUFJOzs7Ozs7c0JBcEJULElBQUk7Ozs7O0FBR1IsZUFBUyxHQUFHLDhCQUE4QjtBQUMxQyxTQUFHLEdBQUc7QUFDUixtQkFBVyxFQUFDLFNBQVMsR0FBRyxjQUFjO09BQ3RDOztBQUNHLG1CQUFhLEdBQUcsU0FBaEIsYUFBYSxDQUFJLE1BQU0sRUFBSztBQUMvQixlQUFPLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDYixjQUFJLEVBQUU7QUFDTixvQkFBUSxFQUFFLHVCQUF1QjtBQUNqQyxvQkFBUSxFQUFFLFlBQVk7QUFDdEIscUJBQVMsRUFBQyxrQ0FBa0M7QUFDNUMseUJBQWEsRUFBQyxrRUFBa0U7V0FDakY7QUFDRCxhQUFHLEVBQUMsQ0FDSixFQUFDLEtBQUssRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFDLG1DQUFtQyxFQUFDLENBQ2pFO1NBQ0EsRUFBRSxNQUFNLENBQUMsQ0FBQTtPQUNWOztBQUNXLFVBQUk7QUFDSixpQkFEQSxJQUFJLEdBQ0Q7OztnQ0FESCxJQUFJOztBQUViLGNBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQTtBQUN0QixjQUFJLENBQUMsS0FBSyxHQUFHO0FBQ1gsa0JBQU0sRUFBRTtBQUNOLHFCQUFPLEVBQUUsbUJBQU07QUFDYixvQkFBSSxPQUFPLEdBQUcsYUFBYSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxFQUFDLENBQUMsQ0FBQTtBQUMxRCx1QkFBTyxNQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQTtlQUNoRDthQUNGO1dBQ0YsQ0FBQTtTQUNGOztBQVhVLFlBQUksV0FZZixRQUFRLEdBQUEsb0JBQUc7QUFDVCxpQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtTQUNuQzs7ZUFkVSxJQUFJOzs7c0JBQUosSUFBSSIsImZpbGUiOiJjb20vc2VjdWNhcmQvY29ubmVjdC9hdXRoL0F1dGguanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9