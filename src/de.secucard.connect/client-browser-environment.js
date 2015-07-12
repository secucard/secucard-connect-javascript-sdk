import {Stomp} from './net/stomp';
import {Stomp as StompBrowserImpl} from './net/stomp-browser/stomp';

export const ClientBrowserEnvironment = {};
ClientBrowserEnvironment.StompChannel = {
	create: () => {
		return new Stomp(StompBrowserImpl);
	}
};