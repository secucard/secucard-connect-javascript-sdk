import {ProductService} from '../product-service';

export class SecupayInvoiceService extends ProductService {

  constructor() {
    super();
  }

  getEndpoint() {
    return ['payment', 'secupayinvoices'];
  }

  getEventTargets() {
    return ['payment.secupayinvoices'];
  }

  cancel(id) {
    return this.execute(id, 'cancel');
  }

}

SecupayInvoiceService.Uid = (['payment', 'secupayinvoices']).join('.');
