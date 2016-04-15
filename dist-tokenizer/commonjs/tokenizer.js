'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _sizzle = require('sizzle');

var _sizzle2 = _interopRequireDefault(_sizzle);

function _ajax(url, callback, data, xClient, x) {
    try {
        x = new (XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
        x.open(data ? 'POST' : 'GET', url, 1);

        x.setRequestHeader('Content-type', 'application/json');
        x.setRequestHeader('Accept', 'application/json');
        x.setRequestHeader('Accept-Charset', 'utf-8');

        if (xClient) {
            x.setRequestHeader('X-Client', xClient);
        }

        x.onreadystatechange = function () {
            x.readyState == 4 && callback && callback(x);
        };
        x.send(data);
    } catch (e) {
        window.console && console.error('SecucardTokenizer', e);
    }
}

function _defaults() {
    return {
        host: 'https://tk.secupay.ag',
        clientId: undefined,
        hiddenInputName: 'secupayToken'
    };
}

var objectToString = Object.prototype.toString,
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

function isObject(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
}

function isFunction(value) {
    var tag = isObject(value) ? objectToString.call(value) : '';
    return tag == funcTag || tag == genTag;
}

var Tokenizer = (function () {
    function Tokenizer(config) {
        _classCallCheck(this, Tokenizer);

        this.config = config;
    }

    Tokenizer.prototype.createToken = function createToken(payload, resolve, reject) {

        if (!isFunction(resolve) || !isFunction(reject)) {
            return;
        }

        var _handler = function _handler(xhr) {

            if (xhr.status == 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {

                if (xhr.status == 400) {
                    reject(JSON.parse(xhr.responseText));
                } else {
                    reject([{ Message: xhr.responseText }]);
                }
            }
        };

        _ajax(this.config.host + '/create', _handler, JSON.stringify(payload), this.config.clientId);
    };

    Tokenizer.prototype.validate = function validate(form, resolve, reject) {
        var _this = this;

        this.removeTokenHidden(form);

        var tokenInputs = _sizzle2['default']("input[data-token]", form);
        tokenInputs.forEach(function (input) {
            if (input.hasAttribute('name')) {
                var _name = input.getAttribute('name');
                input.removeAttribute('name');
                console.warn('SecucardTokenizer', '[Tokenizer-Warning] Attribute "name = ' + _name + '" was removed from form input. Don\'t submit card data, it is not secure!');
            }
        });

        var selectors = ['pan', 'cvc', 'expiry-month', 'expiry-year', 'card-holder'].map(function (prop) {
            return '[data-token="' + prop + '"]';
        });

        var data = {};
        var prop = undefined;
        _sizzle2['default'].matches(selectors.join(','), tokenInputs).forEach(function (input) {
            prop = input.getAttribute('data-token').replace('-', '_');
            if (prop) {
                data[prop] = prop == 'expiry_month' || prop == 'expiry_year' ? parseInt(input.value) : input.value;
            }
        });

        var _resolve = function _resolve(result) {
            _this.addTokenHidden(form, result.Uid);
            resolve(result);
        };

        this.createToken({ type: 'creditcard', data: data }, _resolve, reject);
    };

    Tokenizer.prototype.addTokenHidden = function addTokenHidden(form, uid) {

        var hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.name = this.config.hiddenInputName;
        hidden.value = uid;
        form.appendChild(hidden);
    };

    Tokenizer.prototype.removeTokenHidden = function removeTokenHidden(form) {

        var hidden = _sizzle2['default']('input[name="' + this.config.hiddenInputName + '"]', form);
        if (hidden.length == 1) {
            hidden[0].parentNode.removeChild(hidden[0]);
        } else if (hidden.length > 1) {
            console.error('SecucardTokenizer', 'internal error 0');
        }
    };

    return Tokenizer;
})();

var SecucardTokenizer = {
    description: 'SecucardTokenizer for browser'
};

SecucardTokenizer.create = function (config) {

    return new Tokenizer(Object.assign(_defaults(), config));
};

SecucardTokenizer.find = function (selector, context, results) {
    return _sizzle2['default'](selector, context, results);
};

exports['default'] = SecucardTokenizer;
module.exports = exports['default'];