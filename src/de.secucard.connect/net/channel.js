export class Channel {
	
	constructor() {
		
	}
	
	send() {
		
	}
	
	request(method, params) {
		
		
		
	}
	
}

Channel.REST = 'rest';
Channel.STOMP = 'stomp';

Channel.METHOD = {
	GET: "GET",
	CREATE: "CREATE", 
	UPDATE: "UPDATE", 
	DELETE:"DELETE", 
	EXECUTE: "EXECUTE"
};