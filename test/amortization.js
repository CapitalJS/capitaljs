require('babel/register');

var test = require('tape'),
    amortization = require('../src/amortization');

test('calculate amortization', function(t) {
  t.plan(6);

  var calc1 = amortization({
    amount: 180000,
    rate: 4.25,
    totalTerm: 360,
    amortizeTerm: 60
  });

  t.equal(calc1.interest, 36583.362108097754, 'correctly calculates interest');
  t.equal(calc1.interestRound, '36583.36', 'correctly calculates rounded interest');
  t.equal(calc1.principal, 16546.146128485594, 'correctly calculates principal');
  t.equal(calc1.principalRound, '16546.15', 'correctly calculates rounded principal');
  t.equal(calc1.payment, 885.4918039430557, 'correctly caulcualtes the rounded payment');
  t.equal(calc1.paymentRound, '885.49', 'correctly caulcualtes the rounded payment');
});
