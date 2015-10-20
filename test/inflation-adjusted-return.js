require('babel/register');

var test = require('tape'),
    adjReturn = require('../src/inflation-adjusted-return');

test('calculate inflation adjusted return', function(t) {
  t.plan(1);

  var calc1 = adjReturn({
    investmentReturn: 0.08,
    inflationRate: 0.03,
  });

  t.equal(calc1, 4.85, 'correctly calculates the inflation-adjusted return');

});
