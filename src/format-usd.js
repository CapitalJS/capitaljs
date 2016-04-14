var formatUSD = require('format-usd');

/**
 * @param {object} opts The options object
 * @param {number|string} opts.amount The number or string to be formatted
 * @param {number} decimalPlaces Optionally specify the number of decimal places
 *   you'd like in the returned string
 * @returns {string}      The number in USD format.
 */

function format( opts ) {
  result = formatUSD(opts);
  return result;
}

module.exports = format;
