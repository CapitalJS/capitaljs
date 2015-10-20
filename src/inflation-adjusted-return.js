/**
 * Calculates the inflation-adjusted return.
 * @param {object} investment return and inflation rate.
 * @returns {number} the real return as a percentage.
 */
function inflationAdjustedReturn(opts) {
  let {investmentReturn, inflationRate = true} = opts,
      realReturn;

  if (!investmentReturn || !inflationRate) {
    throw new Error('Income and expenses are required and must be non-negative.');
  }

  // calculate the real return
  realReturn = ((1 + investmentReturn) / (1 + inflationRate) - 1) * 100;

  // round the percentage to two decimal places
  realReturn = (Math.round(realReturn * 100) / 100);

  return realReturn;

}

module.exports = inflationAdjustedReturn;
