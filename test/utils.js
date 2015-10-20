require('babel/register');

var test = require('tape'),
    utils = require('../src/utils');

test('enforce non negative numbers', function(t) {
  t.plan(2);

  t.throws(function() {
    utils.enforceNonNegative({
      principal: -10000,
      rate: 0.05
    });
  }, 'throws with negative number');

  t.doesNotThrow(function() {
    utils.enforceNonNegative({
      principal: 10000,
      rate: 0.05
    });
  }, 'does not throws with positive numbers');
});

test('sum array values', function(t) {
  t.plan(1);

  t.equal(utils.sumArray([1, 2, 3]), 6, 'correctly sum an array');
});
