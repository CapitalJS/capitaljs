require('babel/register');

var test = require('tape'),
    cashflow = require('../src/cashflow');

test('calculate the cash flow', function(t) {
  t.plan(2);

  var calc1 = cashflow({
    income: 5000,
    expenses: 2500,
  });

  var calc2= cashflow({
    income: [1000, 2000, 1500, 500],
    expenses: [500, 1500, 500],
  });

  t.equal(calc1.cash, 2500, 'correctly calculates simple cashflow');
  t.equal(calc2.cash, 2500, 'correctly calculates cashflow when passed an array');

});
