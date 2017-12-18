import {Transaction} from './transaction';
export class SecupayDebit extends Transaction {
  constructor(
    container, purpose, customer, recipient, basket, experience, accrual, subscription, redirectUrl, optData,
    paymentAction, contract, amount, currency, orderId, transId, status, transactionStatus) {
    super(purpose, customer, recipient, basket, experience, accrual, subscription, redirectUrl, optData, paymentAction,
      contract, amount, currency, orderId, transId, status, transactionStatus);
    this['container'] = container;
  }
}
