require('babel/register');

var test = require('tape'),
    interest = require('../src/interest');

test('interest calculation', function(t) {

    t.plan(11);

    var calc1 = interest({
      principal: 10000,
      rate: .05,
      years: 10,
      compounding: false
    });

    t.equal(calc1.interest, 5000, 'correctly calculates simple interest');
    t.equal(calc1.total, 15000, 'correctly calculates simple total amount paid');

    var calc2 = interest({
      principal: 123456789,
      rate: .123456789,
      years: 123456789,
      compounding: false
    });

    t.equal(calc2.interest, 1881676371789154.8, 'correctly calculates simple interest');
    t.equal(calc2.total, 1881676495245943.8, 'correctly calculates simple total amount paid');

    var calc3 = interest({
      principal: 10000,
      rate: .05,
      years: 10
    });

    t.equal(calc3.interest, 6487.212707001283, 'correctly calculates continuously compounding interest');
    t.equal(calc3.total, 16487.212707001283, 'correctly calculates continuously compounding total amount paid');

    var calc4 = interest({
      principal: 12345,
      rate: .12345,
      years: 123
    });

    t.equal(calc4.interest, 48525542579.29045, 'correctly calculates continuously compounding interest');
    t.equal(calc4.total, 48525554924.29045, 'correctly calculates continuously compounding total amount paid');

    t.throws(function() {
      interest({
        principal: -10000,
        rate: .05,
        years: 10
      });
    }, 'throws with negative arg');

    t.throws(function() {
      interest({
        principal: 'party town',
        rate: .05,
        years: 10
      });
    }, 'throws with non-number arg');

    t.throws(function() {
      interest({
        principal: 10000,
        rate: .05
      });
    }, 'throws with missing arg');

});
