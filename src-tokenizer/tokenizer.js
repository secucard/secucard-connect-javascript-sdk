import Sizzle from 'sizzle';

function _ajax(url, callback, data, xClient, x) {
    try {
        x = new(XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
        x.open(data ? 'POST' : 'GET', url, 1);
        
        // suppose all requests are cross-domain
        //x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        x.setRequestHeader('Content-type', 'application/json');
        x.setRequestHeader('Accept', 'application/json');
        x.setRequestHeader('X-Frame-Options', 'deny');
        
        if(xClient) {
            x.setRequestHeader('X-Client', xClient);
        }
        
        x.onreadystatechange = function () {
            x.readyState == 4 && callback && callback(x);
        };
        x.send(data)
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

// https://github.com/lodash/lodash/blob/master/lodash.js#L10890-L10893
function isObject(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
}



// https://github.com/lodash/lodash/blob/master/lodash.js#L10795-L10801
function isFunction(value) {
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 8 which returns 'object' for typed array and weak map constructors,
    // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
    var tag = isObject(value) ? objectToString.call(value) : '';
    return tag == funcTag || tag == genTag;
}

class Tokenizer {
    
    constructor(config) {
        this.config = config;
    }
    
    createToken(payload, resolve, reject) {
        
        if(!isFunction(resolve) || !isFunction(reject)) {
            return;
        }
        
        let _handler = (xhr) => {
           
            //console.log('SecucardTokenizer', xhr);
            
            if(xhr.status == 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                
                if(xhr.status == 400) {
                    reject(JSON.parse(xhr.responseText));
                } else {
                    reject([{Message: xhr.responseText}]);
                }
            }
            
        };
        
        _ajax(`${this.config.host}/create`, _handler, JSON.stringify(payload), this.config.clientId);
        
    }
    
    validate(form, resolve, reject) {
        
        this.removeTokenHidden(form);
        
        let tokenInputs = Sizzle("input[data-token]", form);
        tokenInputs.forEach((input) => {
            if (input.hasAttribute('name')) {
                let name = input.getAttribute('name');
                input.removeAttribute('name');
                console.warn('SecucardTokenizer', `[Tokenizer-Warning] Attribute "name = ${name}" was removed from form input. Don't submit card data, it is not secure!`);
            }
        });

        let selectors = (['pan', 'cvc', 'expiry-month', 'expiry-year', 'card-holder']).map((prop) => {
            return `[data-token="${prop}"]`;
        });

        let data = {};
        let prop;
        Sizzle.matches(selectors.join(','), tokenInputs).forEach((input) => {
            prop = input.getAttribute('data-token').replace('-', '_');
            if (prop) {
                data[prop] = (prop == 'expiry_month' || prop == 'expiry_year') ? parseInt(input.value) : input.value;
            }
        });
        
        let _resolve = (result) => {
            this.addTokenHidden(form, result.Uid);
            resolve(result);
        };
        
        this.createToken({type: 'creditcard', data: data}, _resolve, reject);
        
    }
    
    addTokenHidden(form, uid) {
        
        let hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.name = this.config.hiddenInputName;
        hidden.value = uid;
        form.appendChild(hidden);
        
    }
    
    removeTokenHidden(form) {
        
        let hidden = Sizzle(`input[name="${this.config.hiddenInputName}"]`, form);
        if(hidden.length == 1) {
            hidden[0].parentNode.removeChild(hidden[0]);
        } else if(hidden.length > 1) {
            console.error('SecucardTokenizer', 'internal error 0');
        }
    }
    
}

let SecucardTokenizer = {
    description: 'SecucardTokenizer for browser'
};

SecucardTokenizer.create = (config) => {
    
    return new Tokenizer(Object.assign(_defaults(), config));
    
};

SecucardTokenizer.find = (selector, context, results) => {
    return Sizzle(selector, context, results);
};

export default SecucardTokenizer;