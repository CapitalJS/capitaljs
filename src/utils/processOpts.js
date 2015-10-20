function processOpts(opts, cb) {
  // If it's an object
  if (opts === Object(opts) && Object.prototype.toString.call(opts) !== '[object Array]') {
    for (var key in opts) {
      if (opts.hasOwnProperty(key)) {
        cb(key, opts[key]);
      }
    }
  // If it's an array
  } else if (opts instanceof Array) {
    for (var i = 0; i < opts.length; i++) {
      cb('All params', opts[i]);
    }
  // If it's something else
  } else {
    cb('All params', opts);
  }
};

module.exports = processOpts;
