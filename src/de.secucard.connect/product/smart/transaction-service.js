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
	
	start(id, type) {
		return this.execute(id, "start", type);
	}
	
	cancel(id) {
		return this.execute(id, "cancel");
	}
	
}

TransactionService.Uid = (['smart','transactions']).join('.');
