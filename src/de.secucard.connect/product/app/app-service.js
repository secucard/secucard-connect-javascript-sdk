import {ProductService} from '../product-service'
import mixins from '../../util/mixins';
export class AppService extends ProductService {
	
	isApp = true;
	
	constructor() {
		super();
		this.init();
	}
	
	init() {
		
	}
	
	getEndpoint() {
		return ['general','apps'];
	};
	
	getEventTargets() {
		return [];
	}
	
	getUid() {
		return super.getUid() + '.' + this.getAppId();
	}
	
}

AppService.createWithMixin = (ServiceMixin) => {
	
	let Mixed = mixins(AppService, ServiceMixin);
	return new Mixed();
	
};
