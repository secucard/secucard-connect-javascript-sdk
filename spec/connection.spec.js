import TestPromise from 'jasmine-es6/helpers/promise';
import {catchError} from 'jasmine-es6';
import install from 'jasmine-es6/overrides/async';
import {Promise as ES6Promise} from 'es6-promise';

import {Rest} from '../src/de.secucard.connect/net/rest'
import {Message, HEAD, GET, POST, PUT, DELETE} from '../src/de.secucard.connect/net/message'
import {Connection} from '../src/de.secucard.connect/connection'
import {ConnectionConfig} from '../src/de.secucard.connect/connection-config'

install();

describe('Connection', function() {
	
	it('configures Connection with ConnectionConfig', async function() {
	
		let config = ConnectionConfig.defaults();
		let expectedHost = 'https://connect.secucard.com';
		
		expect(config.host).toBe(expectedHost);
		
		let connection = new Connection(config);
		
		expect(connection.config.host).toBe(expectedHost);
	
	});
	  
});