import {ProductService} from '../product-service';

export class WebsiteService extends ProductService {

	constructor() {
		super();
	}

	getEndpoint() {
		return ['public', 'website'];
	}

	getEventTargets() {
		return [];
	}
}

WebsiteService.Uid = (['public', 'website']).join('.');
