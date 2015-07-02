'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _netHttp = require('../net/Http');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var host_auth = 'https://connect.secucard.com';
var url = {
  oauth_token: host_auth + '/oauth/token'
};
var grant_options = function grant_options(extend) {
  return _lodash2['default'].merge({
    send: {
      username: 'developer@secucard.de',
      password: 'Test12345!',
      client_id: 'f0478f73afe218e8b5f751a07c978ecf',
      client_secret: '30644327cfbde722ad2ad12bb9c0a2f86a2bee0a2d8de8d862210112af3d01bb'
    },
    set: [{ label: 'Content-Type', value: 'application/x-www-form-urlencoded' }]
  }, extend);
};

var Auth = (function () {
  function Auth() {
    var _this = this;

    _classCallCheck(this, Auth);

    this.http = new _netHttp.Http();
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

exports.Auth = Auth;