require('babel/register');

var test = require('tape'),
    herfindahlIndex = require('../src/herfindahlIndex');

test('calculate Herfindahl Index', function(t) {
  t.plan(5);

  var calc1 = herfindahlIndex([30, 60]);

  t.equal(calc1, 4500, 'correctly calculates Herfindahl-Hirschman Index of 2 firms with 30% and 60% market share');

  var calc2 = herfindahlIndex([30, 30, 20, 20]);

  t.equal(calc2, 2600, 'correctly calculates Herfindahl-Hirschman Index of 4 firms with 30%, 30%, 20%, 20% market share');

  var calc3 = herfindahlIndex([100]);

  t.equal(calc3, 10000, 'correctly calculates Herfindahl-Hirschman Index of a monopoly');

  t.throws(function() {
      herfindahlIndex('not a number');
    }, 'throws with non-number arg');

    t.throws(function() {
      herfindahlIndex();
    }, 'throws with missing arg');

});
