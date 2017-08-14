import {ProductService} from '../product-service';

export class ContractService extends ProductService {

  constructor() {
    super();
  }

  getEndpoint() {
    return ['payment', 'contracts'];
  }

  getEventTargets() {
    return [];
  }

  clone(contractId, cloneParams) {
    return this.execute(contractId, 'clone', null, cloneParams);
  }

  cloneMine(cloneParams) {
    return this.clone('me', cloneParams);
  }

  createSubContract(createSubContractRequest) {
    return this.execute('me', 'requestId', null, createSubContractRequest)
  }

}

ContractService.Uid = (['payment', 'contracts']).join('.');
