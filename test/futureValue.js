require('babel/register');

var test = require('tape'),
    futureValue = require('../src/futureValue');

test('calculate futureValue', function(t) {
  t.plan(1);

  var calc1 = futureValue({
    compound: false,
    rate: 10,
    startValue: 1000,
    years: 5
  });

  t.equal(calc1, 1500, 'correctly calculates future value with simple interest');

  var calc2 = futureValue({
    compound: false,
    rate: 10,
    startValue: 1000,
    years: 6
  });

  t.equal(calc2, 1600, 'correctly calculates future value with simple interest');

});
