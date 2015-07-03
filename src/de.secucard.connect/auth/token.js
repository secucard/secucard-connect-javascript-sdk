export class Token {
	
	constructor() {
		this.access_token = null;
		this.refresh_token = null;
		this.token_type = null;
		this.expires_in = null;
		this.scope = null;
	}
	
	getRefreshToken() {
		
		return this.refresh_token;
		
	}
	
	getAccessToken() {
		
		return this.access_token;
		
	}
	
	isExpired() {
		
		return !this.expireTime || (new Date()).getTime() > this.expireTime;
		
	}
	
	setExpireTime() {
		
		this.expireTime = parseInt(this.expires_in) * 1000 + (new Date()).getTime();
		
	}
	
	getExpireTime() {
		
		return this.expireTime;
		
	}
	
}

Token.create = (data) => {
	
	let token = new Token();
	token = Object.assign(token, data);
	return token;
	
};
