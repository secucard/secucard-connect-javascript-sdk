import {ProductService} from '../product-service'

export class CardGroupService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['loyalty','cardgroups'];
	}
	
	getEventTargets() {
		return [];
	}
	
}

CardGroupService.Uid = (['loyalty','cardgroups']).join('.');
