var amortize = require('amortize'),
    enforcePositive = require('./utils/enforce/number/positive'),
    sumArray = require('./utils/sumArray');

/**
 * Calculates the interest paid, principal paid, remaining balance,
 * and monthly payment of a loan. Uses cfpb's amortize module
 * @param {object} amount, rate, totalTerm, amortizeTerm
 * @returns {object} interest, principal, balance, payment,
 * interestRound, principalRound, balanceRound, paymentRound
 */
function amortization(opts) {
  let {amount, rate, totalTerm, amortizeTerm = true} = opts,
      result = {};

  enforcePositive(opts);
  if (!amount || !rate || !totalTerm || !amortizeTerm) {
    throw new Error('Amount, rate, totalTerm, and amortizeTerm are required and must be non-negative.');
  }

  result = amortize(opts);
  return result;
}

module.exports = amortization;
