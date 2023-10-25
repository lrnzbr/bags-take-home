/* eslint-disable max-classes-per-file */

export class Transaction {
  constructor (transactionID, merchant, price, timestamp) {
    this.transactionID = transactionID;
    this.merchant = merchant;
    this.price = price;
    this.timestamp = timestamp;
  }
}

export class Account {
  constructor (accountName, transactionHistory, accountType) {
    this.accountName = accountName;
    this.transactionHistory = transactionHistory;
    this.accountType = accountType;
  }
}

export class Merchant {
  constructor (merchantID, merchantName) {
    this.merchantID = merchantID;
    this.merchantName = merchantName;
  }
}
