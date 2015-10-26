var enforceNumber = require('./utils/enforce/number');

/**
 * Calculates return on investment.
 * @param {object} earnings, initial investment
 * @returns {object} rate of return raw, rounded, and percentage
 */
function returnOnInvestment(opts) {
  let {earnings, initialInvestment} = opts,
      result = {};

  enforceNumber(opts);
  if (!earnings || !initialInvestment) {
    throw new Error('Earnings and initial investment are required and must be numbers.');
  }

  result.raw = (earnings - initialInvestment) / initialInvestment;
  result.rounded = Math.round(result.raw * 10000) / 10000;
  result.percent = result.rounded * 100;

  return result;
}

module.exports = returnOnInvestment;
