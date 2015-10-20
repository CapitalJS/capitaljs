/**
 * Throw an error if value is not a number
 * @param {object}
 * @returns {object}
 */
function enforceNumber(opts) {
  for (var key in opts) {
    if (opts.hasOwnProperty(key)) {
      if (typeof opts[key] === 'undefined' || isNaN(parseFloat(opts[key]))) {
        throw new Error(key + ' must be a number.');
      }
    }
  }
};

module.exports = enforceNumber
