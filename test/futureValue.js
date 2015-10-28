require('babel/register');

var test = require('tape'),
    futureValue = require('../src/futureValue');

test('calculate futureValue', function(t) {
  t.plan(3);


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

  var calc3 = futureValue({
    compounding: true,
    rate: 0.10,
    principal: 1000,
    years: 5
  });

  // Original Investment x ((1+interest rate)^number of years);
  // 1000 * ((1+0.10)^5)
  t.equal(calc3, 1610.51, 'correctly calculates future value with compound interest');

});
