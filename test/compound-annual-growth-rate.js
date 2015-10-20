require('babel/register');

var test = require('tape'),
    cagr = require('../src/compound-annual-growth-rate');

test('CAGR calculation', function(t) {

    t.plan(5);

    var calc1 = cagr({
      startValue: 10000,
      endValue: 15000,
      years: 5
    });

    t.equal(calc1.raw, .08447177119769855, 'correctly calculates raw CAGR');
    t.equal(calc1.rounded, .084, 'correctly calculates rounded CAGR');
    t.equal(calc1.percent, 8.4, 'correctly calculates rounded CAGR');

    t.throws(function() {
      cagr({
        startValue: 'foo',
        endValue: 15000,
        years: 5
      });
    }, 'throws with non-number arg');

    t.throws(function() {
      cagr({
        startValue: 10000,
        endValue: 15000
      });
    }, 'throws with missing arg');

});
