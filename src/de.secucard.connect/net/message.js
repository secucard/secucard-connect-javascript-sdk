export const HEAD = 'HEAD';
export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';

export class Message {
	
	constructor() {
		
	}

	/**
	 * 
	 * @param value
	 * @returns {Message}
	 */
	setBaseUrl(value) {
		this.baseUrl = value;
		return this;
	}
	
	/**
	 * 
	 * @param value
	 * @returns {Message}
	 */
	setUrl(value) {
		this.url = value;
		return this;
	}
	
	/**
	 * 
	 * @param value
	 * @returns {Message}
	 */
	setMethod(value) {
		this.method = value;
		return this;
	}

	/**
	 * 
	 * @param value
	 * @returns {Message}
	 */
	setHeaders(value) {
		this.headers = value;
		return this;
	}

	/**
	 * 
	 * @param value
	 * @returns {Message}
	 */
	setQuery(value) {
		this.query = value;
		return this;
	}

	/**
	 * 
	 * @param value
	 * @returns {Message}
	 */
	setBody(value) {
		this.body = value;
		return this;
	}

	/**
	 * 
	 * @param value
	 * @returns {Message}
	 */
	setAccept(value) {
		this.accept = value;
		return this;
	}
	
}
