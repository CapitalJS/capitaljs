require('babel/register');

var test = require('tape'),
    herfindahlIndex = require('../src/herfindahlIndex');

test('calculate Herfindahl Index', function(t) {
  t.plan(8);

  var calc1 = herfindahlIndex([30, 60]);

  t.equal(calc1, 4500, 'correctly calculates Herfindahl-Hirschman Index of 2 firms with 30% and 60% market share');

  var calc2 = herfindahlIndex([30, 30, 20, 20]);

  t.equal(calc2, 2600, 'correctly calculates Herfindahl-Hirschman Index of 4 firms with 30%, 30%, 20%, 20% market share');

  var calc3 = herfindahlIndex([100]);

  t.equal(calc3, 10000, 'correctly calculates Herfindahl-Hirschman Index of a monopoly');

  t.throws(function() {
    herfindahlIndex([1, 'not a number']);
  },
  /Value must be a number\./,
  'throws with non-number array items');

  t.throws(function() {
      herfindahlIndex();
  },
    /Market share array is required and must consist of numbers\./,
  'throws with missing arg');

  t.throws(function() {
      herfindahlIndex('cats');
  },
  'throws with string arg');

  t.throws(function() {
      herfindahlIndex(100);
  },
  /Market share array is required and must consist of numbers\./,
  'throws with non-array number arg');

  var pancakes = {};

  t.throws(function() {
    herfindahlIndex(pancakes);
  },
  /Market share array is required and must consist of numbers\./,
  'throws with object arg');

});
