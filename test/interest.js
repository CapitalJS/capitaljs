require('babel/register');

var test = require('tape'),
    interest = require('../src/interest');

test('interest calculation', function(t) {

    t.plan(11);

    var calc1 = interest({
      principal: 10000,
      rate: 5,
      periods: 10
    });

    t.equal(calc1.interest, 5000, 'correctly calculates simple interest');
    t.equal(calc1.total, 15000, 'correctly calculates simple total amount paid');

    var calc2 = interest({
      principal: 123456789,
      rate: 12.3456789,
      periods: 123456789
    });

    t.equal(calc2.interest, 1881676371789154.8, 'correctly calculates simple interest');
    t.equal(calc2.total, 1881676495245943.8, 'correctly calculates simple total amount paid');

    var calc3 = interest({
      principal: 10000,
      rate: 5,
      periods: 10,
      compoundings: 12
    });

    t.equal(calc3.interest, 6470.09, 'correctly calculates compounding interest');
    t.equal(calc3.total, 16470.09, 'correctly calculates compounding total amount paid');

    var calc4 = interest({
      principal: 12345,
      rate: 12.345,
      periods: 123,
      compoundings: 12
    });

    t.equal(calc4.interest, 44903572488.03, 'correctly calculates compounding interest');
    t.equal(calc4.total, 44903584833.03, 'correctly calculates compounding total amount paid');

    t.throws(function() {
      interest({
        principal: -10000,
        rate: 5,
        periods: 10
      });
    }, 'throws with negative arg');

    t.throws(function() {
      interest({
        principal: 'party town',
        rate: 5,
        periods: 10
      });
    }, 'throws with non-number arg');

    t.throws(function() {
      interest({
        principal: 10000,
        rate: 5
      });
    }, 'throws with missing arg');

});
