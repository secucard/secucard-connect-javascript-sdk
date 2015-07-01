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
      username: 'testuser',
      password: 'testpassword',
      client_id: 'XXXXXX',
      client_secret: 'XXXXXXXX'
    },
    set: [{ label: 'Content-Type', value: 'application/x-www-form-urlencoded' }]
  }, extend);
};

var Auth = function Auth() {
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
};

exports.Auth = Auth;