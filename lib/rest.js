'use strict'

const request = require('request');
const uuidv4 = require('uuid/v4');
const getHash = require('./getHash');
const API_URL = 'https://api.bitbay.net/rest';

class REST {

  /**
   * @param {string} publicKey
   * @param {string} privateKey
   */
  constructor (publicKey="", privateKey=""){
    this.apiKey = publicKey;
    this.apiSecret = privateKey;
    this._url = API_URL;

  };

  /**
   * @param {string} path
   * @param {Object} qs
   * @return {Object} body
   * @private
   */  
  _callPublic (path, qs=null) {
    let config = {
      url: `${this._url}/${path}`,
    };
    if(qs) config.qs = qs;

    request.get(config, (err, response, body) => {
      if (err) return console.error('Error:', err);

      console.log(body);
      return body;
    });
  };

  /**
   * @param {string} symbol
   * @return {Object} body
   */
  ticker (symbol) {
    if (!symbol) return this._callPublic(`trading/ticker`);
    return this._callPublic(`trading/ticker/${symbol}`);
  }

  /**
   * @param {string} symbol
   * @return {Object} body
   */
  stats (symbol) {
    if (!symbol) return this._callPublic(`trading/stats`);
    return this._callPublic(`trading/stats/${symbol}`);
  }

  /**
   * @param {string} symbol
   * @return {Object} body
   */
  orderbook (symbol = 'BTC-PLN') {
    return this._callPublic(`trading/orderbook/${symbol}`);
  }

  /**
   * @param {string} symbol
   * @param {Object} qs
   * @return {Object} body
   */
  transactions (symbol = 'BTC-PLN', qs = null) {
    return this._callPublic(`trading/transactions/${symbol}`, qs);
  }


    /**
   * @param {string} symbol
   * @param {number} resolution
   * @return {Object} qs
   */
  candles (symbol = 'BTC-PLN', resolution, qs) {
    return this._callPublic(`trading/transactions/${symbol}`, qs);
  }


  /**
   * @param {string} path
   * @param {Object} body
   * @param {string} type
   * @param {Object} qs
   * @return {Object} body
   * @private
   */
  _callPrivate (path, body = null, type = 'GET', qs = null) {
    if(!this.apiKey || !this.apiSecret){
      console.debug('{ status: "error", message: "This is a private endpoint.  Enter a valid key pair." }');
      return;
    }

    var timestamp = Date.now();
    var config = {
      url: `${this._url}/${path}`,
      method: type,
      timeout: 15000,
      headers: {
        'API-Key': this.apiKey,
        'API-Hash': getHash(this.apiKey, timestamp, this.apiSecret, body),
        'operation-id': uuidv4(),
        'Request-Timestamp': timestamp,
        'Content-Type' : 'application/json'
      }
    };
    if(body) config.body = JSON.stringify(body);
    if(qs) config.qs = JSON.stringify(qs);

    request(config, (err, response, body) => {
        if (err) return console.error('Error:', err);
        console.log(body);
    })
  };

  // Start of trading module

  /**
   * @param {string} symbol
   * @return {Object} body
   */
  getOffers (symbol) {
    if(!symbol) return this._callPrivate(`trading/offer`);
    return this._callPrivate(`trading/offer/${symbol}`);
  }

  /**
   * @param {string} symbol
   * @param {Object} params
   * @return {Object} body
   */
  newOffer (symbol, params) {
    return this._callPrivate(`trading/offer/${symbol}`, params, 'POST');
  };

  /**
   * @param {string} symbol
   * @param {string} offer_id
   * @param {string} offer_id
   * @param {number} price
   * @return {Object} body
   */
  cancelOffer (symbol, offer_id, offer_type, price) {
    return this._callPrivate(`trading/offer/${symbol}/${offer_id}/${offer_type}/${price}`, null, 'DELETE');
  };

  /**
   * @param {string} symbol
   * @return {Object} body
   */
  getConfig (symbol = 'BTC-PLN') {
    return this._callPrivate(`trading/config/${symbol}`);
  };

  /**
   * @param {string} symbol
   * @param {Object} params
   * @return {Object} body
   */
  changeConfig (symbol, params) {
    return this._callPrivate(`trading/config/${symbol}`, params, 'POST');
  };
  // End of trading module

  // Start of deposits and withdrawals

  /**
   * @param {string} walletId
   * @return {Object} body
   */
  getCryptoAddress (walletId) {
    return this._callPrivate(`payments/crypto-address/${walletId}`);
  }

  /**
   * @param {string} walletId
   * @param {Object} params
   * @return {Object} body
   */
  getNewAddress (walletId, params) {
    return this._callPrivate(`payments/crypto-address/${walletId}`, params, 'POST');
  };

  /**
   * @param {string} walletId
   * @return {Object} body
   */
  getHistoricalAddresses (walletId) {
    return this._callPrivate(`payments/crypto-address/all/balance/${walletId}`);
  }

  /**
   * @param {string} walletId
   * @param {Object} params
   * @return {Object} body
   */
  withdrawCrypto (walletId, params) {
    return this._callPrivate(`payments/withdrawal/${walletId}`, params, 'POST');
  }

  /**
   * @param {string} currency
   * @return {Object} body
   */
  getFiatAddress (currency) {
    return this._callPrivate(`payments/deposit/igoria_deposit/${currency}/customs`);
  }

  /**
   * @param {string} walletId
   * @param {string} currency
   * @param {Object} params
   * @return {Object} body
   */
  withdrawFiat (walletId, currency, params) {
    return this._callPrivate(`payments/withdrawal/${walletId}/igoria_withdrawal/${currency}/start`, params, 'POST');
  }
  // End of deposits and withdrawals

  // Start of transactions history

  /**
   * @param {Object} queryParams
   * @return {Object} body
   */
  getTransactionsHistory (queryParams) {
    return this._callPrivate(`trading/history/transactions`, null, 'GET', queryParams);
  }

  /**
   * @param {Object} queryParams
   * @return {Object} body
   */
  getOperationsHistory (queryParams) {
    return this._callPrivate(`balances/BITBAY/history`, null, 'GET', queryParams);
  }
  // End of transactions history

  /**
   * @return {Object} body
   */
  getWallets () {
    return this._callPrivate(`balances/BITBAY/balance`);
  }

  /**
   * @param {Object} params
   * @return {Object} body
   */
  newWallet (params) {
    return this._callPrivate(`balances/BITBAY/balance`, params, 'POST');
  }

  /**
   * @param {string} walletId
   * @param {Object} params
   * @return {Object} body
   */
  changeWalletName (walletId, params) {
    return this._callPrivate(`balances/BITBAY/balance/${walletId}`, params, 'POST');
  };

  /**
   * @param {string} sourceWalletId
   * @param {string} destinationWalletId
   * @param {Object} params
   * @return {Object} body
   */
  internalTransfer (sourceWalletId, destinationWalletId, params) {
    return this._callPrivate(`balances/BITBAY/balance/transfer/${sourceWalletId}/${destinationWalletId}`, params, 'POST');
  };

}

module.exports = REST;