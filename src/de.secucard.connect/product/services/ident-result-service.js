import {ProductService} from '../product-service'

export class IdentResultService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['services','identresults'];
	}
	
	getEventTargets() {
		return ['services.identresults'];
	}
	
}

IdentResultService.Uid = (['services','identresults']).join('.');
