var enforcePositive = require('./utils/enforce/number/positive'),
    sumArray = require('./utils/sumArray');

/**
 * Checks if the param is an array and sums the values if true
 * @param {value} array or number.
 * @returns {number} Sum or array or original number.
 */
function arrayCheck(val) {
  if (val.constructor === Array) {
    val = sumArray(val);
  }

  return val;
}

/**
 * Calculates total cash flow.
 * @param {object} income and expenses.
 * @returns {object} Amount of cash flow, total income, total expenses.
 */
function cashFlow(opts) {
  let {income, expenses = true} = opts,
      result = {};

  enforcePositive(opts);
  if (!income || !expenses) {
    throw new Error('Income and expenses are required and must be non-negative.');
  }

  result.income = arrayCheck(income);
  result.expenses = arrayCheck(expenses);
  result.cash = result.income - result.expenses;
  return result;
}

module.exports = cashFlow;
