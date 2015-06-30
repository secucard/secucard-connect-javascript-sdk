import Request from 'superagent'

export class Rest {
	
	constructor() {
		this.methodFuns = {
			'GET': Request.get,
			'POST': Request.post,
			'PUT': Request.put,
			'HEAD': Request.head,
			'DELETE': Request.delete
		};
	}

	/**
	 * 
	 * @param url
	 * @param method
	 * @returns {Request}
	 */
	r(url, method) {
		return this.methodFuns[method](url);
	}

	/**
	 * 
	 * @param message
	 * @returns {Promise}
	 */
	send(message) {
		
		return new Promise((resolve, reject) => {
			
			let request = this.r(message.url, message.method);
			
			if(message.headers) {
				request.set(message.headers);
			}
			
			if(message.query){
				request.query(message.query);
			}
			
			if(message.body){
				request.send(message.body);
			}
			
			if(message.accept){
				request.accept(message.accept);
			}
			
			request.end((err, res) => {
				if (err) {
					reject(err, res);
				} else {
					resolve(res);
				}
			});
				
		});
		
	}
	
}

