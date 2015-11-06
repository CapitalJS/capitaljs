var enforceNumber = require('./utils/enforce/number');

/**
 * Calculates Herfindahl-Hirschman Index, a measure of market concentration and competition, used by U.S. governments for antitrust enforcement.
 * @param {array} marketShare (expressed as percentage value for each firm)
 * @returns {number} Herfindahl-Hirschman Index (HHI), a number between 0 and 10,000
 */

function herfindahlIndex(marketShare) {
  var result = 0;

  enforceNumber(marketShare);
  if (!marketShare) {
    throw new Error('Market share array is required and must consist of numbers.');
  }

  for (var i = 0; i < marketShare.length; i++) {
    result += marketShare[i]*marketShare[i];
  }

  return result;
}

module.exports = herfindahlIndex;
