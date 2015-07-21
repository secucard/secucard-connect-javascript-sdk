import {ContainerService} from './container-service';
import {ContractService} from './contract-service';
import {CustomerService} from './customer-service';
import {SecupayDebitService} from './secupay-debit-service';
import {SecupayPrepayService} from './secupay-prepay-service';

export const Payment = {};
Payment.ContainerService = ContainerService;
Payment.ContractService = ContractService;
Payment.CustomerService = CustomerService;
Payment.SecupayDebitService = SecupayDebitService;
Payment.SecupayPrepayService = SecupayPrepayService;
