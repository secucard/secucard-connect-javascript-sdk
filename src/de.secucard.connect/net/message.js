export let HEAD = 'HEAD';
export let GET = 'GET';
export let POST = 'POST';
export let PUT = 'PUT';
export let DELETE = 'DELETE';

export class Message {
	
	constructor() {
		
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
