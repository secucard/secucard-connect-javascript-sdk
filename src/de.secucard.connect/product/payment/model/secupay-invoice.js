import {Transaction} from './transaction';
export class SecupayInvoice extends Transaction {
  constructor(
    purpose, customer, recipient, basket, experience, accrual, subscription, redirectUrl, optData, paymentAction,
    contract, amount, currency, orderId, transId, status, transactionStatus) {
    super(purpose, customer, recipient, basket, experience, accrual, subscription, redirectUrl, optData, paymentAction,
      contract, amount, currency, orderId, transId, status, transactionStatus);
  }
}
