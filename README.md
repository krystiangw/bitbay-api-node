# bitbay-api-node

See full description at https://docs.bitbay.net/v3.2.0/reference

## Installation

```bash
  npm i bitfinex-api-node
```

## Usage

```js
const BFX = require('bitfinex-api-node')

const bfx = new BFX({
  apiKey: '...',
  apiSecret: '...',

  ws: {
    autoReconnect: true,
    seqAudit: true,
    packetWDDelay: 10 * 1000
  }
})
```
