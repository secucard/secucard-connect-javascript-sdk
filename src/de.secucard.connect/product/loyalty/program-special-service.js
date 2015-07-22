import {ProductService} from '../product-service'

export class ProgramSpecialService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['loyalty','programspecials'];
	}
	
	getEventTargets() {
		return [];
	}
	
}

ProgramSpecialService.Uid = (['loyalty','programspecials']).join('.');
