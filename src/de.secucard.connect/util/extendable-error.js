/**
 * modified, from dist https://github.com/bjyoungblood/es6-error
 * added just the check for Error.captureStackTrace existence
 * TODO move to separate package
 */
class ExtendableError {
	constructor(message) {
		Error.call(this, message);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}
		Object.defineProperty(this, 'name', {
			configurable: true,
			enumerable: false,
			value: this.constructor.name
		});
	}
}

ExtendableError.prototype = new Error();

export default ExtendableError;