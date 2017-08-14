import {ProductService} from '../product-service';

export class SecupayCreditcardService extends ProductService {

  constructor() {
    super();
  }

  getEndpoint() {
    return ['payment', 'secupaycreditcards'];
  }

  getEventTargets() {
    return ['payment.secupaycreditcards'];
  }

  cancel(id) {
    return this.execute(id, 'cancel');
  }

}

SecupayCreditcardService.Uid = (['payment', 'secupaycreditcards']).join('.');
