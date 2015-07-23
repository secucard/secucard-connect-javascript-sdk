import ExtendableError from 'es6-error';
import {AuthenticationFailedException} from '../auth/exception';

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

SecucardConnectException.create = (data) => {
	
	let error;
	
	if(data.error == 'ProductSecurityException') {
		error = Object.assign(new AuthenticationFailedException(), data);
	} else {
		error = new SecucardConnectException(data);
	}
	
	return error;
};
