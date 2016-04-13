function _ajax(url, callback, data, x) {
    try {
        x = new(XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
        x.open(data ? 'POST' : 'GET', url, 1);
        
        // suppose all requests are cross-domain
        //x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        x.setRequestHeader('Content-type', 'application/json');
        x.onreadystatechange = function () {
            x.readyState > 3 && callback && callback(x.responseText, x);
        };
        x.send(data)
    } catch (e) {
        window.console && console.log(e);
    }
}

function _defaults() {
    return {
        host: 'https://tk.secupay.ag'
    };
}

class Tokenizer {
    
    constructor(config) {
        this.config = config;
    }
    
    createToken(payload, handler) {
        
        let _handler = (responseText, xhr) => {
            console.log(responseText, xhr);
            responseText && handler && handler(JSON.parse(responseText), xhr);
        };
        
        _ajax(`${this.config.host}/create`, _handler, payload);
        
    }
    
}

let SecucardTokenizer = {
    description: 'SecucardTokenizer for browser',
};

SecucardTokenizer.create = (config) => {
    
    return new Tokenizer(Object.assign(_defaults(), config));
    
};

export default SecucardTokenizer;