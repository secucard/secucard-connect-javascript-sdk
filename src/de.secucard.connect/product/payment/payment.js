import {ContainerService} from './container-service';
import {ContractService} from './contract-service';
import {CustomerService} from './customer-service';
import {SecupayCreditcardService} from './secupay-creditcard-service';
import {SecupayDebitService} from './secupay-debit-service';
import {SecupayInvoiceService} from './secupay-invoice-service';
import {SecupayPrepayService} from './secupay-prepay-service';
import {TransactionService} from './transaction-service';

export const Payment = {};
Payment.ContainerService = ContainerService;
Payment.ContractService = ContractService;
Payment.CustomerService = CustomerService;
Payment.SecupayCreditcardService = SecupayCreditcardService;
Payment.SecupayDebitService = SecupayDebitService;
Payment.SecupayInvoiceService = SecupayInvoiceService;
Payment.SecupayPrepayService = SecupayPrepayService;
Payment.TransactionService = TransactionService;
