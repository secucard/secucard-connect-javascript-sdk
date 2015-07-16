import {ProductService} from '../product-service'

export class SkeletonService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['general','skeletons'];
	};
	
	demoEvent() {
		
		return this.execute(1, 'demoevent');
		
	}
	
}
