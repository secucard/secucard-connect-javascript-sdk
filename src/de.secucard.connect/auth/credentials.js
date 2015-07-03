export class Credentials {
	
	constructor() {
		
		this.token = null;
		
		/*
		---- basic ------
		 */
		this.grant_type = null;
		this.client_id = null;
		this.client_secret = null;
		
		// ---------------
		this.uuid = null;
		// ---------------
		this.code = null;
		// ---------------
		this.username = null;
		this.password = null;
		this.device = null;
		this.deviveinfo = {name: null};
		
	}
	
}

Credentials.create = (credentials) => {
	
	let cr = new Credentials();
	return Object.assign(cr, credentials);
	
};
