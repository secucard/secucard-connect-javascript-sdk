import ExtendableError from '../util/extendable-error';
export class AuthenticationFailedException extends ExtendableError {
	
	constructor(message = 'Authentication failed') {
		
		super(message);
		
		Object.defineProperty(this, 'name', {
		  configurable : true,
		  enumerable : false,
		  value : this.constructor.name
		});
		
	}
}
