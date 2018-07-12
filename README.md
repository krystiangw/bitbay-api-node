# bitbay-api-node

[![Build Status](https://travis-ci.org/BitBayAPI/bitbay-api-node.svg?branch=master)](https://travis-ci.org/BitBayAPI/bitbay-api-node)
See full description at https://docs.bitbay.net/v3.2.0/reference

## Installation

```bash
  npm i bitbay-api-node
```

## Usage

The BBA constructor receive public and private key using to authentication. 
```js
const BBA = require('bitbay-api-node');

const api = new BBA('22345f6f-1b1d-1234-a973-a10b1bdba1a1', '78539fe0-e9b0-4e4e-8c86-70b36aa93d4f');
```

You can also execute constructor without parameters and feel free to get public endpoints. 
```js
const BBA = require('bitbay-api-node');

const api = new BBA();
api.ticker();
```

## Public endpoints

```js
const BBA = require('bitbay-api-node');

const api = new BBA();

// Get ticker from BTC-EUR market
api.ticker('BTC-EUR');

// Get orderbook from LSK-PLN market
api.orderbook('LSK-PLN');

// Get last 10 transactions on BTC-USD market from last 3 minutes
api.transactions('BTC-USD', { limit: 10, fromTime: 1531407461 } );

// Get 30 minutes candles from last 4 hours
api.candles('BTC-PLN', 1800, { fromTime: 1544158620, toTime: 1544173061 } );
```

## Private endpoints
### Trading

```js
const BBA = require('bitbay-api-node');

const api = new BBA('22345f6f-1b1d-1234-a973-a10b1bdba1a1', '78539fe0-e9b0-4e4e-8c86-70b36aa93d4f');

// We want to buy 1 Bitcoin for 4000$ on BTC-USD market and offer will be hidden
api.newOffer('BTC-USD', { amount: 1, rate: 1, offerType: 'buy', mode: 'limit', hidden: true } );

// Let's get active offers from every market
api.getOffers();

// Remove an offer
api.cancelOffer('BTC-USD', '82ca35da-6eeb-4f30-91bb-165fdcf4d8b2', 'buy', 4000);

// Get our trading fees on BTC-PLN market (default)
api.getConfig();

// Change default wallets to trade on BTC-USD
api.changeConfig('BTC-USD', { first: '455b3f25-8d3a-409f-9fe6-8cc40f1ce533', second: '455b3f25-8d3a-509f-9fe6-8cc40f1ce542' } );
```

### Deposit and withdrawal
```js
// Get our address to deposit cryptocurrency on specified wallet
api.getCryptoAddress('455b3f25-8d3a-409f-9fe6-8cc40f1ce533');

// Generate new cryptocurrency address on specified wallet
api.getNewAddress('455b3f25-8d3a-409f-9fe6-8cc40f1ce533', { currency: 'PLN' } );

// Get all historical addresses from specified wallet
api.getHistoricalAddresses('455b3f25-8d3a-409f-9fe6-8cc40f1ce533');

// Let's send some Bitcoins
api.withdrawCrypto('455b3f25-8d3a-409f-9fe6-8cc40f1ce533', { address: '3Qck3sNnAe5YVLe9WDzMp3aK2cgsU7F5Wv', amount: 0.5, comment: 'test' } );

// Get address to deposit USD
api.getFiatAddress('USD');

// Time for withdraw our USD
api.withdrawFiat('455b3f25-8d3a-409f-9fe6-8cc40f1ce655', 'USD', { bank_account_number: 'PL82154012872216000073790002', address: 'Ul. Puławska 111A/109, 02-707 Warszawa', name: 'Igoria Trade S.A.', title: 'VVVe94d7e43536fVVV', swift: 'EBOSPLPWXXX' } );
```
### History
```js
// Get transactions history for buy transactions from BTC-PLN where rate is from 23000 to 25000
api.getTransactionsHistory( { markets: ['BTC-PLN'], rateFrom:23000, rateTo: 25000, userAction: 'buy', nextPageCursor: 'start' } );

// Get 20 last historical operations on XMR wallets and sort descending by time
api.getOperationsHistory( { "balanceCurrencies":["XMR"], "limit":"20", "sort":[{"order":"DESC","by":"time"}], "nextPageCursor":"start"});
```

### Manage wallets
```js
// Get list of all wallets
api.getWallets();

// Create a new wallet for Bitcoin
api.newWallet( { currency: 'BTC', type: 'crypto', name: 'trading' } );

// I think that was a bad name, let's change it
api.changeWalletName('455b3f25-8d3a-409f-9fe6-8cc40f1ce533', { name: 'arbitration' } );

// Send some cryptocurrency over our wallets
api.internalTransfer('455b3f25-8d3a-409f-9fe6-8cc40f1ce533', '455b3f25-8d3a-409f-9fe6-8cc40f1ce534', { currency: 'BTC', funds: 0.4 } );
```
