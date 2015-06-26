import TestPromise from 'jasmine-es6/helpers/promise';
import {catchError} from 'jasmine-es6';
import install from 'jasmine-es6/overrides/async';
import {Promise as ES6Promise} from 'es6-promise';

install();

const implementation = {
  fetch(url) {
    return new Promise((resolve, reject) => '') 
  },
  async doStuff() {
    this.showSpinner = true;
    await this.fetch('https://google.com');
    this.showSpinner = false;
  }
};

describe('Promise', function() {
  it('makes it easier to time assertions correctly', async function() {
    
    /*
    An experimental TestPromise subclass for injecting into the implementation under test. 
    It provides resolve and reject methods for controlling the promise. 
    resolve and reject also return a promise that is resolved when all listeners are finished executing.
     */
    const promise = new TestPromise();
    
    spyOn(implementation, 'fetch').and.returnValue(promise);
    implementation.doStuff();
    expect(implementation.showSpinner).toBe(true);
    await promise.resolve();
    expect(implementation.showSpinner).toBe(false);
    
    //Promise here is native implementation
    const pr = new Promise((resolve, reject) => {
      resolve(1);
    });
    
    let result;
    
    await pr.then((res)=>{
      result = res;
    });
    
    expect(result).toBe(1);
    
  });
});