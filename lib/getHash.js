'use strict'

const crypto = require('crypto');

function getHash (apiKey, timestamp, apiSecret, data=null)  {
    const hmac = crypto.createHmac('sha512', apiSecret);

    if(data)
      hmac.update(apiKey + timestamp + JSON.stringify(data));
    else
      hmac.update(apiKey + timestamp);

    return hmac.digest('hex');
  };

module.exports = getHash;