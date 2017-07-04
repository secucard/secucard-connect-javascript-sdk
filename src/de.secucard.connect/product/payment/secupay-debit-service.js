import {ProductService} from '../product-service';

export class SecupayDebitService extends ProductService {

  constructor() {
    super();
  }

  getEndpoint() {
    return ['payment', 'secupaydebits'];
  }

  getEventTargets() {
    return ['payment.secupaydebits'];
  }

  cancel(id) {
    return this.execute(id, 'cancel');
  }

}

SecupayDebitService.Uid = (['payment', 'secupaydebits']).join('.');
