import {ProductService} from '../product-service'

export class FileAccessService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['general','fileaccesses'];
	}
	
	getEventTargets() {
		return [];
	}
	
}

FileAccessService.Uid = (['general','fileaccesses']).join('.');
