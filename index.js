'use strict'

const BBA = require('./lib/rest');


const api = new BBA();

//Get ticker from BTC-EUR market
api.ticker('BTC-EUR');

// Get orderbook from LSK-PLN market
//api.orderbook('LSK-PLN');

// Get last 10 transactions on BTC-USD market from last 3 minutes
//api.transactions('BTC-USD', { limit: 10, fromTime: 1531407461 } );

// Get 30 minutes candles from last 4 hours
//api.candles('BTC-PLN', 1800, { fromTime: 1544158620, toTime: 1544173061 } );

module.exports = BBA;