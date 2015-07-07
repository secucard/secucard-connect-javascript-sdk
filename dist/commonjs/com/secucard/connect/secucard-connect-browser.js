'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _netChannelStompBrowser = require('./net/channel/stomp-browser');

var SecucardConnectBrowser = function SecucardConnectBrowser(config) {
  _classCallCheck(this, SecucardConnectBrowser);

  this.stomp = new _netChannelStompBrowser.StompBrowser(config.stomp.wsUrl);
};

exports.SecucardConnectBrowser = SecucardConnectBrowser;