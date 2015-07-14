import es6shim from 'es6-shim';
import {ClientBrowserEnvironment} from './de.secucard.connect/client-browser-environment';
import {Client} from './de.secucard.connect/client';

export const SecucardConnect = {
	description: 'SecucardConnect for browser'
};
SecucardConnect.create = (config) => {
	
	return Client.create(ClientBrowserEnvironment, config);
	
};
