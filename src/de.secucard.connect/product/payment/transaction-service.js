import {ProductService} from '../product-service';

export class TransactionService extends ProductService {

  constructor() {
    super();
  }

  getShippingUrl(id) {
    return this.retrieveWithAction(id, 'shippingUrl');
  }

  cancel(id, data) {
    return this.execute(id, 'cancel', null, data);
  }

  getEndpoint() {
    return ['payment', 'transactions'];
  }

  getEventTargets() {
    return [];
  }

    /**
     * Get the crowdfunding data for the specific merchant
     * @param id string MRC_ID
     * @returns {Promise}
     */
    getCrowdfundingData(id) {
        return this.retrieveWithAction('me', 'CrowdFundingData', id);
    }

}

TransactionService.Uid = (['payment', 'transactions']).join('.');
