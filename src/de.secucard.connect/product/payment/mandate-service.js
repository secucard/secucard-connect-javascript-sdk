import {ProductService} from '../product-service'

export class MandateService extends ProductService {

    constructor() {
        super()
    }

    getEndpoint() {
        return ['payment', 'mandates'];
    }

    getEventTargets() {
        return [];
    }

    /**
     * @param data List of payment mandates
     * @returns {Promise}
     */
    execBulk(data) {
        return this.execute('me', 'bulk', null, data);
    }
}

MandateService.Uid = (['payment', 'mandates']).join('.');
