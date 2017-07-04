/*
 * SDK-Generator version: 1.1.0
 */
export class Transaction {
  constructor(
    purpose, customer, recipient, basket, experience, accrual, subscription, redirectUrl, optData, paymentAction,
    contract, amount, currency, orderId, transId, status, transactionStatus, usedPaymentInstrument) {
    this['purpose'] = purpose;
    this['customer'] = customer;
    this['recipient'] = recipient;
    this['basket'] = basket;
    this['experience'] = experience;
    this['accrual'] = accrual;
    this['subscription'] = subscription;
    this['redirect_url'] = redirectUrl;
    this['opt_data'] = optData;
    this['payment_action'] = paymentAction;
    this['contract'] = contract;
    this['amount'] = amount;
    this['currency'] = currency;
    this['order_id'] = orderId;
    this['trans_id'] = transId;
    this['status'] = status;
    this['transaction_status'] = transactionStatus;
    this['used_payment_instrument'] = usedPaymentInstrument;
  }
}
