import {Stomp} from './net/stomp';
import {Stomp as StompBrowserImpl} from './net/stomp-browser/stomp';

export const ClientBrowserEnvironment = {
	config: {
		stompPort: 15674
	}
};
ClientBrowserEnvironment.StompChannel = {
	create: () => {
		return new Stomp(StompBrowserImpl);
	}
};