import {Stomp} from './net/stomp';
import {Stomp as StompNodeImpl} from './net/stomp-node/stomp';

export const ClientNodeEnvironment = {
	config: {
		stompPort: 61614
	}
};
ClientNodeEnvironment.StompChannel = {
	create: () => {
		return new Stomp(StompNodeImpl);
	}
};