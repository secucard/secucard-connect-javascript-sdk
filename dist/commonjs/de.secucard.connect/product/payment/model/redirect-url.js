'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var RedirectUrl = function RedirectUrl(urlSuccess, urlFailure, iframeUrl) {
  _classCallCheck(this, RedirectUrl);

  this['url_success'] = urlSuccess;
  this['url_failure'] = urlFailure;
  this['iframe_url'] = iframeUrl;
};

exports.RedirectUrl = RedirectUrl;