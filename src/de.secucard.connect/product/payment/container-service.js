import {ProductService} from '../product-service'

export class ContainerService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['payment','containers'];
	}
	
	getEventTargets() {
		return [];
	}
	
	updateContainerAssignment(containerId, customerId) {
		return this.execute(containerId, 'assign', customerId);
	}
	
	deleteContainerAssignment(containerId) {
		return this.deleteObjectWithAction(containerId, 'assign');
	}
	
}

ContainerService.Uid = (['payment','containers']).join('.');
