require('babel/register');

var test = require('tape'),
    sumArray = require('../src/utils/sumArray');

test('sum array values', function(t) {
  t.plan(1);

  t.equal(sumArray([1, 2, 3]), 6, 'correctly sum an array');
});
