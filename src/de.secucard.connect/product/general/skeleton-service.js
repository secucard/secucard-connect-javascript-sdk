import {ProductService} from '../product-service'

export class SkeletonService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['general','skeletons'];
	};
	
	demoEvent() {
		
		// /exchange/connect.api/api:exec:General.Skeletons.Demoevent
		return this.execute(1, 'demoevent');
		
	}
	
}
