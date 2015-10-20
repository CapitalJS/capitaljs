var processOpts = require('../../processOpts');

/**
 * Throw an error if a string or number below 0 is passed.
 * @param {object}
 * @returns {object}
 */
function check(key, val) {
  if (typeof val === 'undefined' || isNaN(parseFloat(val)) || val < 0) {
    throw new Error(key + ' must be a non-negative value.');
  }
}

function enforceNonNegativeNumber(opts) {
  processOpts(opts, check);
};

module.exports = enforceNonNegativeNumber;
