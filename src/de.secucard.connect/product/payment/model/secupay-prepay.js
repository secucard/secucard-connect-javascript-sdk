import {Transaction} from './transaction';
export class SecupayPrepay extends Transaction {
  constructor(
    transferPurpose, transferAccount, purpose, customer, recipient, basket, experience, accrual, subscription,
    redirectUrl, optData, paymentAction, contract, amount, currency, orderId, transId, status, transactionStatus) {
    super(purpose, customer, recipient, basket, experience, accrual, subscription, redirectUrl, optData, paymentAction,
      contract, amount, currency, orderId, transId, status, transactionStatus);
    this['transfer_purpose'] = transferPurpose;
    this['transfer_account'] = transferAccount;
  }
}
