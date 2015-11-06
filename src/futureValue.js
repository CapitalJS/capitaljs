var interest = require('./interest');

/**
 * Calculates the future value of an asset in the future that is equivalent in value to a specified sum today
 * @param {object} rate, principal, periods, compoundings (optional)
 * @returns {number} future value
 */
function futureValue(opts) {
  var calc1 = interest(opts);
  // {object} Amount of interest paid and total amount paid (principal + interest).
  return calc1.total;
}

module.exports = futureValue;
