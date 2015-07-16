import {ProductService} from '../product-service'

export class TransactionService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['smart','transactions'];
	};
	
	getEventTargets() {
		return ['general.notifications'];
	}
	
	startTransaction(id, type) {
		return this.execute(id, "start", type);
	}
	
}
