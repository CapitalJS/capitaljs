(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.capital = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var enforceNumber = require('./utils/enforce/number');
function compoundAnnualGrowthRate(opts) {
  var $__0 = opts,
      startValue = $__0.startValue,
      endValue = $__0.endValue,
      years = $__0.years,
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

//# sourceURL=/Users/contolinic/Sites/capitaljs/capitaljs/src/compound-annual-growth-rate.js
},{"./utils/enforce/number":4}],2:[function(require,module,exports){
"use strict";
module.exports = {
  'interest': require('./interest'),
  'compound-annual-growth-rate': require('./compound-annual-growth-rate')
};

//# sourceURL=/Users/contolinic/Sites/capitaljs/capitaljs/src/index.js
},{"./compound-annual-growth-rate":1,"./interest":3}],3:[function(require,module,exports){
"use strict";
var enforcePositive = require('./utils/enforce/number/positive');
function interest(opts) {
  var $__1;
  var $__0 = opts,
      principal = $__0.principal,
      rate = $__0.rate,
      years = $__0.years,
      compounding = ($__1 = $__0.compounding) === void 0 ? true : $__1,
      result = {};
  delete opts.compounding;
  enforcePositive(opts);
  if (!principal || !rate || !years) {
    throw new Error('Principal, rate and years are required and must be non-negative.');
  }
  if (compounding) {
    result.interest = principal * Math.pow(Math.E, rate * years) - principal;
  } else {
    result.interest = principal * rate * years;
  }
  result.total = principal + result.interest;
  return result;
}
module.exports = interest;

//# sourceURL=/Users/contolinic/Sites/capitaljs/capitaljs/src/interest.js
},{"./utils/enforce/number/positive":5}],4:[function(require,module,exports){
"use strict";
function enforceNumber(opts) {
  for (var key in opts) {
    if (opts.hasOwnProperty(key)) {
      if (typeof opts[key] === 'undefined' || isNaN(parseFloat(opts[key]))) {
        throw new Error(key + ' must be a number.');
      }
    }
  }
}
;
module.exports = enforceNumber;

//# sourceURL=/Users/contolinic/Sites/capitaljs/capitaljs/src/utils/enforce/number/index.js
},{}],5:[function(require,module,exports){
"use strict";
var processOpts = require('../../processOpts');
function check(key, val) {
  if (typeof val === 'undefined' || isNaN(parseFloat(val)) || val < 0) {
    throw new Error(key + ' must be a non-negative value.');
  }
}
function enforceNonNegativeNumber(opts) {
  processOpts(opts, check);
}
;
module.exports = enforceNonNegativeNumber;

//# sourceURL=/Users/contolinic/Sites/capitaljs/capitaljs/src/utils/enforce/number/positive.js
},{"../../processOpts":6}],6:[function(require,module,exports){
"use strict";
function processOpts(opts, cb) {
  if (opts === Object(opts) && Object.prototype.toString.call(opts) !== '[object Array]') {
    for (var key in opts) {
      if (opts.hasOwnProperty(key)) {
        cb(key, opts[key]);
      }
    }
  } else if (opts instanceof Array) {
    for (var i = 0; i < opts.length; i++) {
      cb('All params', opts[i]);
    }
  } else {
    cb('All params', opts);
  }
}
;
module.exports = processOpts;

//# sourceURL=/Users/contolinic/Sites/capitaljs/capitaljs/src/utils/processOpts.js
},{}]},{},[2])(2)
});