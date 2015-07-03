export class ClientConfig {
	
	constructor() {
		
	}
	
	getHost() {
		return this.host;
	}
}

ClientConfig._defaults = {
	host: 'https://connect.secucard.com',
	api: '/api/v2'
};

ClientConfig.defaults = () => {
	
	let config = new ClientConfig();
	Object.assign(config, ClientConfig._defaults);
	return config;
	
};
