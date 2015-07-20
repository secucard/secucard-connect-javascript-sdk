import {ProductService} from '../product-service'

export class NewsService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['general','news'];
	}
	
	getEventTargets() {
		return [];
	}
	
	markRead(newsId) {
		return this.updateObjectWithAction(newsId, 'markRead');
	}
	
}

NewsService.Uid = (['general','news']).join('.');
