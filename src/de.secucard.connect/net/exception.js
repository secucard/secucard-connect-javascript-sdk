import {AuthenticationFailedException} from '../auth/exception';

export class SecucardConnectException {
	constructor(data) {
		
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		} else {
			Object.defineProperty(this, 'stack', {
					configurable: true,
					enumerable: false,
					value: Error(message).stack
				});
		}

		Object.defineProperty(this, 'message', {
			configurable: true,
			enumerable: false,
			value: data.error_details
		});

		Object.defineProperty(this, 'name', {
			configurable: true,
			enumerable: false,
			value: this.constructor.name
		});
		
		Object.defineProperty(this, 'status', {
			configurable: true,
			enumerable: false,
			value: data.status
		});
		
		Object.defineProperty(this, 'error', {
			configurable: true,
			enumerable: false,
			value: data.error
		});
		
		Object.defineProperty(this, 'error_details', {
			configurable: true,
			enumerable: false,
			value: data.error_details
		});
		
		
		Object.defineProperty(this, 'error_user', {
			configurable: true,
			enumerable: false,
			value: data.error_user
		});
		
		Object.defineProperty(this, 'code', {
			configurable: true,
			enumerable: false,
			value: data.code
		});
		
		Object.defineProperty(this, 'supportId', {
			configurable: true,
			enumerable: false,
			value: data.supportId
		});
		
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
