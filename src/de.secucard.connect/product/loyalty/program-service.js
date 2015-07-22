import {ProductService} from '../product-service'

export class ProgramService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['loyalty','programs'];
	}
	
	getEventTargets() {
		return [];
	}
	
}

ProgramService.Uid = (['loyalty','programs']).join('.');
