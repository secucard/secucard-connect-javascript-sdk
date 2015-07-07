'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _stompjs = require('stompjs');

var _stompjs2 = _interopRequireDefault(_stompjs);

var _sockjsClient = require('sockjs-client');

var _sockjsClient2 = _interopRequireDefault(_sockjsClient);

var StompBrowser = function StompBrowser(wsUrl) {
  _classCallCheck(this, StompBrowser);

  return new _stompjs2['default'].over(new _sockjsClient2['default'](wsUrl));
};

exports.StompBrowser = StompBrowser;