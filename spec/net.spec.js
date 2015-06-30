import TestPromise from 'jasmine-es6/helpers/promise';
import {catchError} from 'jasmine-es6';
import install from 'jasmine-es6/overrides/async';
import {Promise as ES6Promise} from 'es6-promise';

import {Rest} from '../src/de.secucard.connect/net/rest'
import {Message, HEAD, GET, POST, PUT, DELETE} from '../src/de.secucard.connect/net/message'

install();

describe('Rest', function() {
  
  it('run GET', async function() {
    
    let ch = new Rest();
    
    let message = new Message();
    message.setMethod(GET).setUrl('http://google.com');
    
    let status = null;
    let pr = ch.send(message);
    
    await pr.then(res => {
      status = res.status;
    });
    
    expect(status).toBe(200);
    
  });
  
  it('run HEAD', async function() {
    
    let ch = new Rest();
    
    let message = new Message();
    message.setMethod(HEAD).setUrl('http://google.com');
    
    let status = null;
    await ch.send(message).then((res) => {
      status = res.status;
    }).catch((err) => {
      status = err.status;
    });
    
    expect(status).toBe(302);
    
  });
  
});