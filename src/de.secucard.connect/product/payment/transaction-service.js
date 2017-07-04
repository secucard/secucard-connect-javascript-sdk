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

}

TransactionService.Uid = (['payment', 'transactions']).join('.');
