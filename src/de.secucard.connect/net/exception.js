import ExtendableError from 'es6-error';

export class SecucardConnectException extends ExtendableError {
	constructor(data) {
		
		super(data.error_details);
		
		Object.defineProperty(this, 'name', {
		  configurable : true,
		  enumerable : false,
		  value : this.constructor.name
		});
		
		this.status = data.status;
		this.error = data.error;
		this.error_details = data.error_details;
		this.error_user = data.error_user;
		this.code = data.code;
		this.supportId = data.supportId;
		
	}
}
