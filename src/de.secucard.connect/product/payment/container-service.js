import {ProductService} from '../product-service';

export class ContainerService extends ProductService {

  constructor() {
    super();
  }

  getEndpoint() {
    return ['payment', 'containers'];
  }

  getEventTargets() {
    return [];
  }

  assignCustomer(containerId, customerId) {
    return this.execute(containerId, 'assign', customerId);
  }

  removeCustomer(containerId) {
    return this.removeWithAction(containerId, 'assign');
  }

}

ContainerService.Uid = (['payment', 'containers']).join('.');
