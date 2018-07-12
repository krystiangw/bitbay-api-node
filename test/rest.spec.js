const test = require('blue-tape');
const Rest = require('../lib/rest')();

test('missing argument', t => {
  return t.shouldFail(Rest.ticker('all'), Error);
});

