export class ClientConfig {
	
	constructor() {
		
	}
	
	getOAuthUrl() {
		return this._getCompleteUrl(this.oAuthUrl);
	}
	
	getRestUrl() {
		return this._getCompleteUrl(this.restUrl);
	}
	
	getStompHost() {
		return this.stompHost;
	}
	
	getStompPort() {
		return this.stompPort;
	}
	
	getStompSslEnabled() {
		return this.stompSslEnabled;
	}
	
	getStompVHost() {
		return this.stompVHost;
	}
	
	getStompQueue() {
		return this.stompQueue;
	}
	
	getStompDestination() {
		return this._getCompleteUrl(this.stompDestination);
	}
	
	isDevice() {
		
		return Boolean(this.deviceUUID);
		
	}
	
	_getCompleteUrl(value) {
		
		let url = value;
		if(!url.endsWith('/')) {
			url += '/';
		}
		return url;
		
	}
	
}

ClientConfig._defaults = {
	
	// The default server communication channel: REST | STOMP.
	channelDefault : '',
	
	// Cache dir
	cacheDir: '',
	
	// Unique device id like UUID. Mandatory when using device auth type.
	deviceUUID: '',
	
	// URL of the OAuth service to use.
	oAuthUrl:'https://connect.secucard.com/oauth/',
	// Timeout in seconds to use when waiting for auth tokens when performing "device" auth type.
	authDeviceTimeout:0,
	
	// URL of the secucard REST API.
	restUrl: 'https://connect.secucard.com/api/v2/',
	// Timeout for getting any response. 0 for no timeout.
	restTimeout: 0,
	
	// STOMP server communication is enabled: true | false/nothing
	stompEnabled: true,
	// The interval the STOMP channel sends a "heartbeat".
	stompHeartbeat: 10,
	// stomp host, virtual host, stomp port
	stompHost: 'connect.secucard.com',
	stompPort: 61614,
	stompVHost: null,
	
	// Base path of the secucard STOMP API.
	stompDestination: '/exchange/connect.api',
	// SSL used with for STOMP: true | false/nothing.
	stompSslEnabled: true,
	
	// The default queue for all STOMP messages.
	stompQueue: '/temp-queue/main',
	
	// Timeout for trying to connect to STOMP server. 0 means no waiting.
	stompConnectTimeout: 0,
	// Timeout for awaiting message receipts and also message responses. An error is raised after. 0 means no waiting.
	stompMessageTimout: 0,
	/*
	Max age of received STOMP messages in the systems message box before they get deleted.
	Keeps the message queue clean, usually messages should not get very old in the box, if a message reaches this max age
	its very likely that nobody is interested or a problem exist and therefore we can remove.
	 */
	stompMessageAge: 0
	
};

ClientConfig.defaults = () => {
	
	let config = new ClientConfig();
	Object.assign(config, ClientConfig._defaults);
	return config;
	
};
