import ExtendableError from 'es6-error';

export class AuthenticationFailedException extends ExtendableError {
	constructor() {
		
		super('Authentication failed');
		
		Object.defineProperty(this, 'name', {
		  configurable : true,
		  enumerable : false,
		  value : this.constructor.name
		});
		
	}
}
