'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _authAuth = require('./auth/Auth');

var _netChannelStomp = require('./net/channel/stomp');

var SecucardConnect = function SecucardConnect(options) {
  _classCallCheck(this, SecucardConnect);

  this.auth = new _authAuth.Auth(options.auth);
  this.stomp = new _netChannelStomp.Stomp(options.stomp);
};

exports.SecucardConnect = SecucardConnect;