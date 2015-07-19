import {ProductService} from '../product-service'

export class IdentService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['smart','idents'];
	};
	
	getEventTargets() {
		return [];
	}
	
	validate(id) {
		return this.execute(id, "validate");
	}
	
	read(id) {
		return this.execute(id, "read");
	}
	
}

IdentService.Uid = (['smart','idents']).join('.');