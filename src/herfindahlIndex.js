/**
 * Calculates Herfindahl-Hirschman Index, a measure of market concentration and competition, used by U.S. governments for antitrust enforcement.
 * @param {array} marketShare (expressed as percentage value for each firm)
 * @returns {number} Herfindahl-Hirschman Index (HHI), a number between 0 and 10,000
 */

function herfindahlIndex(marketShare) {
  var result = 0;

  if (!marketShare || !Array.isArray(marketShare)) {
    throw new Error('Market share array is required and must consist of numbers.');
  }

  for (var i = 0; i < marketShare.length; i++) {
    var share = marketShare[i];

    if (typeof share === 'undefined' || isNaN(parseFloat(share))) {
      throw new TypeError('Value must be a number.');
    }

    result += share*share;
  }

  return result;
}

module.exports = herfindahlIndex;
