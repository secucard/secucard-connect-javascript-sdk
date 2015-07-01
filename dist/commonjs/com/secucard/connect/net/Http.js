'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var Http = (function () {
  function Http() {
    _classCallCheck(this, Http);

    this.request = _superagent2['default'];
  }

  Http.prototype.post = function post(url) {
    var options = arguments[1] === undefined ? { send: {} } : arguments[1];

    var request = this.request.post(url).send(options.send);
    _lodash2['default'].forEach(options.set, function (set) {
      request.set(set.label, set.value);
    });
    return new Promise(function (resolve, reject) {
      request.end(function (err, res) {
        if (err) {
          reject(err, res);
        } else {
          resolve(res);
        }
      });
    });
  };

  return Http;
})();

exports.Http = Http;