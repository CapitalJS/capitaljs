require('babel/register');

var test = require('tape'),
    roi = require('../src/returnOnInvestment');

test('ROI calculation', function(t) {

    t.plan(5);

    var calc1 = roi({
      earnings: 3212,
      initialInvestment: 2045
    });

    t.equal(calc1.raw, 0.5706601466992665, 'correctly calculates raw ROI');
    t.equal(calc1.rounded, 0.5707, 'correctly calculates rounded ROI');
    t.equal(calc1.percent, 57.07, 'correctly calculates rounded ROI as percentage');

    t.throws(function() {
      roi({
        earnings: 'it smells like cookies',
        initialInvestment: 2045
      });
    },
    'throws with non-number arg');

    t.throws(function() {
      roi({
        initialInvestment: 2045
      });
    }, 'throws with missing arg');

});
