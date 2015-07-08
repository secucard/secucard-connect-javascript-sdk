'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _nodeSecucard = require('node-secucard');

var _nodeSecucard2 = _interopRequireDefault(_nodeSecucard);

var Stomp = function Stomp() {
  var config = arguments[0] === undefined ? {} : arguments[0];

  _classCallCheck(this, Stomp);

  return new _nodeSecucard2['default'](config).Channel.Stomp;
};

exports.Stomp = Stomp;