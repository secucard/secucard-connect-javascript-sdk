import {ProductService} from '../product-service'

export class SecupayPrepayService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['payment','secupayprepay'];
	}
	
	getEventTargets() {
		return ['payment.secupayprepay'];
	}
	
	cancel(id) {
		return this.execute(id, 'cancel');
	}
	
}

SecupayPrepayService.Uid = (['payment','secupayprepay']).join('.');
