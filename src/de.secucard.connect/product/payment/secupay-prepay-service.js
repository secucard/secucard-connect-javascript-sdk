import {ProductService} from '../product-service';

export class SecupayPrepayService extends ProductService {

  constructor() {
    super();
  }

  getEndpoint() {
    return ['payment', 'secupayprepays'];
  }

  getEventTargets() {
    return ['payment.secupayprepays'];
  }

  cancel(id) {
    return this.execute(id, 'cancel');
  }

}

SecupayPrepayService.Uid = (['payment', 'secupayprepays']).join('.');
