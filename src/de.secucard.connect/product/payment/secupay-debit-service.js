import {ProductService} from '../product-service'

export class SecupayDebitService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['payment','secupaydebit'];
	}
	
	getEventTargets() {
		return ['payment.secupaydebit'];
	}
	
	cancel(id) {
		return this.execute(id, 'cancel');
	}
	
}

SecupayDebitService.Uid = (['payment','secupaydebit']).join('.');
