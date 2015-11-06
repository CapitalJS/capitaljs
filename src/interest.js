var enforcePositive = require('./utils/enforce/number/positive');


/**
 * Calculates simple or compound interest.
 * @param {object} Principal, interest rate (express as a decimal, e.g. 5% would be 0.05), years, compound (true or false), numberOfCompounds is the number of times it is compounded per year (12 would be monthly, 4 quarterly, 1 yearly)
 * @returns {object} Amount of interest paid and total amount paid (principal + interest).
 */
function interest(opts) {
  let {principal, rate, years, compounding = true, numberOfCompounds = 1 } = opts,
      result = {};
  delete opts.compounding;
  delete opts.numberOfCompounds;

  enforcePositive(opts);
  if (!principal || !rate || !years) {
    throw new Error('Principal, rate and years are required and must be non-negative.');
  }

  if (compounding) {
// Compound interest => Future Value = P(1 + r/n)^nt
    result.total = principal * Math.pow((1 + (rate/numberOfCompounds)), numberOfCompounds * years);
    result.total = Math.round(result.total * 100) / 100 // round to two decimal places
  } else {
  // Simple interest => Future Value = P(1 + rt)
    result.total = principal * (1 + (rate * years));
  }
  result.interest = result.total - principal;

  return result;
}

module.exports = interest;
