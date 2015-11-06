var enforcePositive = require('./utils/enforce/number/positive');

/**
 * Calculates simple or compound interest.
 * @param {object} Principal, interest rate (express as an integery, e.g. 5% would be 5), periods is the number of periods, compoundings is the number of times it is compounded per period (12 would be monthly, 4 quarterly, 1 yearly)
 * @returns {object} Amount of interest paid and total amount paid (principal + interest).
 */
function interest(opts) {
  let {principal, rate, periods, compoundings} = opts,
      result = {};
  delete opts.compounding;
  delete opts.compoundingsPerPeriod;

  enforcePositive(opts);
  if (!principal || !rate || !periods) {
    throw new Error('Principal, rate and number of periods are required and must be non-negative.');
  }

  if (compoundings) {
    // Compound interest => Future Value = P(1 + r/n)^nt
    result.total = Math.pow((1 + ((rate/100)/ compoundings)), compoundings * periods) * principal;
    result.total = Math.round(result.total * 100) / 100 // round to two decimal places
  } else {
    // Simple interest => Future Value = P(1 + rt)
    result.total = principal * (1 + ((rate/100) * periods));
  }
  result.interest = result.total - principal;

  return result;
}

module.exports = interest;
