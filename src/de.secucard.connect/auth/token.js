export class Token {
	
	constructor() {
		this.access_token = null;
		this.refresh_token = null;
		this.token_type = null;
		this.expires = null;
	}
	
	getRefreshToken() {
		
		return this.refresh_token;
		
	}
	
	getAccessToken() {
		
		return this.access_token;
		
	}
	
}
