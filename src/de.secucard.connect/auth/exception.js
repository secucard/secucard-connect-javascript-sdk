export class AuthenticationFailedException {

	constructor(message = 'Authentication failed') {

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
			value: message
		});

		Object.defineProperty(this, 'name', {
			configurable: true,
			enumerable: false,
			value: this.constructor.name
		});

	}
}
