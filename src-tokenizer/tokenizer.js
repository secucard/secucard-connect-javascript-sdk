function ajax(url, callback, data, x) {
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

let host = 'https://tk.secupay.ag';

class Tokenizer {
    
    createToken(payload, handler) {
        
        let _handler = (responseText, xhr) => {
            //console.log(responseText, xhr);
            responseText && handler && handler(JSON.parse(responseText), xhr);
        };
        
        ajax(`${host}/create`, _handler, payload);
        
    }
    
}

let SecucardTokenizer = {
    description: 'SecucardTokenizer for browser',
};

SecucardTokenizer.create = () => {
    
    return new Tokenizer();
    
};

export default SecucardTokenizer;