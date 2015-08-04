import {ProductService} from '../product-service'

export class SessionService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['auth','sessions'];
	};
	
	getEventTargets() {
		return [];
	}
	
	check() {
		return this.retrieveWithAction('me', 'debug');
	}
	
}

SessionService.Uid = (['auth','sessions']).join('.');