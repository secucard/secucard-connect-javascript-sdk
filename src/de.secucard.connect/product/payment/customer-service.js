import {ProductService} from '../product-service';

export class CustomerService extends ProductService {

  constructor() {
    super();
  }

  getEndpoint() {
    return ['payment', 'customers'];
  }

  getEventTargets() {
    return [];
  }

}

CustomerService.Uid = (['payment', 'customers']).join('.');
