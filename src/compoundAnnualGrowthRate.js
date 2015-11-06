var enforceNumber = require('./utils/enforce/number');

/**
 * Calculates the mean annual growth rate of an investment over a specified period of time.
 * @param {object} Start value, end value, years.
 * @returns {object} Rate of growth (raw, rounded, and percent values)
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
