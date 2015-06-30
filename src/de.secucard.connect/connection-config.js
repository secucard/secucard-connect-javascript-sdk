export class ConnectionConfig {
	
	constructor() {
		
	}
	
}

ConnectionConfig._defaults = {
	host: 'https://connect.secucard.com',
	api: '/api/v2'
};

ConnectionConfig.defaults = () => {
	
	let config = new ConnectionConfig();
	Object.assign(config, ConnectionConfig._defaults);
	return config;
	
};
