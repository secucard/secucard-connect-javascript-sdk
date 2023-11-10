import {ProductService} from '../product-service'

export class ActionService extends ProductService {

	constructor() {
		super()
	}

	getEndpoint() {
		return ['event', 'actions'];
	}

	getEventTargets() {
		return ['event.actions'];
	}
}

ActionService.Uid = (['event', 'actions']).join('.');
