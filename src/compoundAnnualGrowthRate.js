var enforceNumber = require('./utils/enforce/number');

/**
 * Calculates simple interest.
 * @param {object} Principal, interest rate (express as a decimal, e.g. 5% would be 0.05) and years.
 * @returns {object} Amount of interest paid and total amount paid (principal + interest).
 */
function compoundAnnualGrowthRate(opts) {
  let {startValue, endValue, years} = opts,
      result = {};

  enforceNumber(opts);
  if (!startValue || !endValue || !years) {
    throw new Error('Start value, end value and years are required and must be numbers.');
  }

  result.raw = Math.pow(endValue / startValue, 1 / years) - 1;
  result.rounded = Math.round(result.raw * 1000) / 1000;
  result.percent = result.rounded * 100;

  return result;
}

module.exports = compoundAnnualGrowthRate;
