require('babel/register');

var test = require('tape'),
    cashflow = require('../src/cashflow');

test('calculate the cash flow', function(t) {
  t.plan(6);

  var calc1 = cashflow({
    income: 5000,
    expenses: 2500,
  });

  var calc2 = cashflow({
    income: [1000, 2000, 1500, 500],
    expenses: [500, 1500, 500],
  });

  var calc3 = cashflow({
    income: [1000, 2000, 1500, 500, 1000, 250, 750],
    expenses: 1,
  });

  var calc4 = cashflow({
    income: 1,
    expenses: [1000, 2000, 1500, 500, 1000, 250, 750],
  });

  t.equal(calc1.cash, 2500, 'correctly calculates simple cashflow');
  t.equal(calc2.cash, 2500, 'correctly calculates cashflow when passed an array');
  t.equal(calc3.income, 7000, 'correctly calculates total income');
  t.equal(calc4.expenses, 7000, 'correctly calculates total income');


  t.throws(function() {
    cashflow({
      income: -10000,
      expenses: 10000,
    });
  }, 'throws with negative arg');

  t.throws(function() {
    cashflow({
      income: 'ax for the frozen sea within us',
      expenses: 1000,
    });
  }, 'throws with non-number arg');

});
