# bitbay-api-node

See full description at https://docs.bitbay.net/v3.2.0/reference

## Installation

```bash
  npm i bitbay-api-node
```

## Usage

The BBA constructor receive public and private key using to authentication. 
```js
const BBA = require('bitbay-api-node')

var api = new BBA('22345f6f-1b1d-1234-a973-a10b1bdba1a1', '78539fe0-e9b0-4e4e-8c86-70b36aa93d4f');
```

You can also execute constructor without parameters and feel free to get public endpoints. 
```js
const BBA = require('bitbay-api-node')

var api = new BBA();
api.ticker();
```

## Public endpoints

```js
const BBA = require('bitbay-api-node')

var api = new BBA();

// Get ticker from BTC-EUR market
api.ticker('BTC-EUR');

// Get orderbook from LSK-PLN market
api.orderbook('LSK-PLN');

// Get last 10 transactions on BTC-USD market from last 3 minutes
api.transactions('BTC-USD', { limit: 10, fromTime: 1531407461 } );

// Get 30 minutes candles from last 4 hours
api.candles(1800, { fromTime: 1544158620, toTime: 1544173061 } );
```
