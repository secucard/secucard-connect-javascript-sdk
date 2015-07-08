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
var grant_options_default = {
  client_id: '',
  client_secret: ''
};
var grant_options = function grant_options(extend) {
  return _lodash2['default'].merge({
    send: grant_options_default,
    set: [{ label: 'Content-Type', value: 'application/x-www-form-urlencoded' }]
  }, extend);
};

var Auth = (function () {
  function Auth(config) {
    var _this = this;

    _classCallCheck(this, Auth);

    this.http = new _netHttp.Http();
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

exports.Auth = Auth;