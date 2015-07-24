import es6shim from 'es6-shim';
import {ClientBrowserEnvironment} from './de.secucard.connect/client-browser-environment';
import {Client} from './de.secucard.connect/client';
export {ServiceMap as Services} from './de.secucard.connect/client-browser-environment';
export {Channel} from './de.secucard.connect/net/channel';

export const SecucardConnect = {
	description: 'SecucardConnect for browser'
};
SecucardConnect.create = (config) => {
	
	return Client.create(ClientBrowserEnvironment, config);
	
};
