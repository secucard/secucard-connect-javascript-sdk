import {ClientBrowserEnvironment} from './de.secucard.connect/client-browser-environment';
import {Client} from './de.secucard.connect/client';

export const SecucardConnect = {};
SecucardConnect.create = (config) => {
	
	return Client.create(ClientBrowserEnvironment, config);
	
};
