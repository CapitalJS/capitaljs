require('babel/register');

var test = require('tape'),
    futureValue = require('../src/futureValue');

test('calculate futureValue', function(t) {
  t.plan(2);

  // $1000 invested for 5 years with simple annual interest of 10% would have a future value of $1,500.00.

  var calc1 = futureValue({
    compounding: false,
    rate: 0.10,
    principal: 1000,
    years: 5
  });

  t.equal(calc1, 1500, 'correctly calculates future Value with simple interest');

  var calc2 = futureValue({
    compounding: false,
    rate: 0.10,
    principal: 1000,
    years: 6
  });

  t.equal(calc2, 1600, 'correctly calculates future Value with simple interest');

});
