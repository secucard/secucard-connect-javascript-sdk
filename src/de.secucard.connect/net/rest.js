import Request from 'superagent';
import {GET, POST, PUT, HEAD, DELETE} from './message';
import {Message} from './message';
export class Rest {
	
	constructor() {
		
		this.methodFuns = {};
		
		this.methodFuns[GET] = Request.get;
		this.methodFuns[POST] = Request.post;
		
		this.methodFuns[PUT] = Request.put;
		this.methodFuns[HEAD] = Request.head;
		this.methodFuns[DELETE] = Request.delete;
		
	}
	
	/**
	 * 
	 * @returns {Message}
	 */
	createMessage() {
		let message = new Message();
		return message.setBaseUrl(this.getHost());
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
			
			let url = message.baseUrl? message.baseUrl + message.url : message.url;
			let request = this.r(url, message.method);
			
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
	
	configureWithContext(context) {
		
		this.getHost = () => {
			
			return context.getConfig().getHost();
			
		}
		
	}
	
}

