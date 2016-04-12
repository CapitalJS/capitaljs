(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.capitaljs = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * amortization table calculations
 * ===============================
 * calculates the monthly payment
 * calculates remaining loan balance
 * calculates sum of interest payments
 * calculates sum of principal payments
 * @param {number} amount
 * @param {number} rate
 * @param {number} totalTerm
 * @param {number} amortizeTerm
 * @returns {object}
 */
var amortizationCalc = function(amount, rate, totalTerm, amortizeTerm) {
  var periodInt,
      monthlyPayment,
      summedInterest = 0,
      summedPrincipal = 0,
      monthlyIntPaid,
      monthlyPrincPaid,
      summedAmortize = {};

  // Calculate monthly interest rate and monthly payment
  periodInt = (rate / 12) / 100;
  monthlyPayment = amount * (periodInt / (1 - Math.pow(1 + periodInt, -(totalTerm))));
  // If zero or NaN is returned (i.e. if the rate is 0) calculate the payment without interest
  monthlyPayment = monthlyPayment || amount / totalTerm;

  // Calculate the interest, principal, and remaining balance for each period
  var i = 0;
  while( i < amortizeTerm) {
    monthlyIntPaid = amount * periodInt;
    monthlyPrincPaid = monthlyPayment - monthlyIntPaid;
    summedInterest = summedInterest + monthlyIntPaid;
    summedPrincipal = summedPrincipal + monthlyPrincPaid;
    amount = amount - monthlyPrincPaid;
    i += 1;
  }

  summedAmortize.interest = summedInterest;
  summedAmortize.principal = summedPrincipal;
  summedAmortize.balance = amount;
  summedAmortize.payment = monthlyPayment;

  return summedAmortize;

};

/**
 * Throw an error if a string or number below 0 is passed
 * @param {object}
 * @returns {object}
 */
var errorCheck = function(opts) {
  for (var key in opts) {
    if (opts.hasOwnProperty(key)) {
      if (typeof opts[key] === 'undefined' || isNaN(parseFloat(opts[key])) || opts[key] < 0) {
        throw new Error('Loan ' + key + ' must be a non-negative value.');
      }
    }
  }
};

/**
 * Round values to two decimal places
 * @param {object}
 * @returns {object}
 */
var roundNum = function(numObj) {
  var tmp = {};
  for (var property in numObj) {
    tmp[property] = numObj[property];
    tmp[property + 'Round'] = (Math.round(numObj[property] * 100) / 100).toFixed(2);
  }
  return tmp;
};

/**
 * Pass values and return output
 * @param {object} amount, rate, totalTerm, amortizeTerm
 * @example amortize({amount: 180000, rate: 4.25, totalTerm: 360, amortizeTerm: 60})
 * @returns {object}
 */
var amortize = function(opts) {
  errorCheck(opts);
  var amortized = amortizationCalc(opts.amount, opts.rate, opts.totalTerm, opts.amortizeTerm);
  return roundNum(amortized);
};

module.exports = amortize;
},{}],2:[function(require,module,exports){
'use strict';

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
    var amount = opts.amount;
    var rate = opts.rate;
    var totalTerm = opts.totalTerm;
    var _opts$amortizeTerm = opts.amortizeTerm;
    var amortizeTerm = _opts$amortizeTerm === undefined ? true : _opts$amortizeTerm;
    var result = {};

    enforcePositive(opts);
    if (!amount || !rate || !totalTerm || !amortizeTerm) {
        throw new Error('Amount, rate, totalTerm, and amortizeTerm are required and must be non-negative.');
    }

    result = amortize(opts);
    return result;
}

module.exports = amortization;

},{"./utils/enforce/number/positive":10,"./utils/sumArray":12,"amortize":1}],3:[function(require,module,exports){
'use strict';

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
  var income = opts.income;
  var _opts$expenses = opts.expenses;
  var expenses = _opts$expenses === undefined ? true : _opts$expenses;
  var result = {};

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

},{"./utils/enforce/number/positive":10,"./utils/sumArray":12}],4:[function(require,module,exports){
'use strict';

var enforceNumber = require('./utils/enforce/number');

/**
 * Calculates the mean annual growth rate of an investment over a specified period of time.
 * @param {object} Start value, end value, years.
 * @returns {object} Rate of growth (raw, rounded, and percent values)
 */
function compoundAnnualGrowthRate(opts) {
  var startValue = opts.startValue;
  var endValue = opts.endValue;
  var years = opts.years;
  var result = {};

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

},{"./utils/enforce/number":9}],5:[function(require,module,exports){
'use strict';

module.exports = {
  'interest': require('./interest'),
  'cashFlow': require('./cashFlow'),
  'compoundAnnualGrowthRate': require('./compoundAnnualGrowthRate'),
  'inflationAdjustedReturn': require('./inflationAdjustedReturn'),
  'amortization': require('./amortization'),
  'returnOnInvestment': require('./returnOnInvestment')
};

},{"./amortization":2,"./cashFlow":3,"./compoundAnnualGrowthRate":4,"./inflationAdjustedReturn":6,"./interest":7,"./returnOnInvestment":8}],6:[function(require,module,exports){
'use strict';

/**
 * Calculates the inflation-adjusted return.
 * @param {object} investment return and inflation rate.
 * @returns {number} the real return as a percentage.
 */
function inflationAdjustedReturn(opts) {
  var investmentReturn = opts.investmentReturn;
  var _opts$inflationRate = opts.inflationRate;
  var inflationRate = _opts$inflationRate === undefined ? true : _opts$inflationRate;
  var realReturn = void 0;

  if (!investmentReturn || !inflationRate) {
    throw new Error('Income and expenses are required and must be non-negative.');
  }

  // calculate the real return
  realReturn = ((1 + investmentReturn) / (1 + inflationRate) - 1) * 100;

  // round the percentage to two decimal places
  realReturn = Math.round(realReturn * 100) / 100;

  return realReturn;
}

module.exports = inflationAdjustedReturn;

},{}],7:[function(require,module,exports){
'use strict';

var enforcePositive = require('./utils/enforce/number/positive');

/**
 * Calculates simple or compound interest.
 * @param {object} Principal, interest rate (express as an integery, e.g. 5% would be 5), periods is the number of periods, compoundings is the number of times it is compounded per period (12 would be monthly, 4 quarterly, 1 yearly)
 * @returns {object} Amount of interest paid and total amount paid (principal + interest).
 */
function interest(opts) {
  var principal = opts.principal;
  var rate = opts.rate;
  var periods = opts.periods;
  var compoundings = opts.compoundings;
  var result = {};
  delete opts.compounding;
  delete opts.compoundingsPerPeriod;

  enforcePositive(opts);
  if (!principal || !rate || !periods) {
    throw new Error('Principal, rate and number of periods are required and must be non-negative.');
  }

  if (compoundings) {
    // Compound interest => Future Value = P(1 + r/n)^nt
    result.total = Math.pow(1 + rate / 100 / compoundings, compoundings * periods) * principal;
    result.total = Math.round(result.total * 100) / 100; // round to two decimal places
  } else {
      // Simple interest => Future Value = P(1 + rt)
      result.total = principal * (1 + rate / 100 * periods);
    }
  result.interest = result.total - principal;

  return result;
}

module.exports = interest;

},{"./utils/enforce/number/positive":10}],8:[function(require,module,exports){
'use strict';

var enforceNumber = require('./utils/enforce/number');

/**
 * Calculates return on investment.
 * @param {object} earnings, initial investment
 * @returns {object} rate of return raw, rounded, and percentage
 */
function returnOnInvestment(opts) {
  var earnings = opts.earnings;
  var initialInvestment = opts.initialInvestment;
  var result = {};

  enforceNumber(opts);
  if (!earnings || !initialInvestment) {
    throw new Error('Earnings and initial investment are required and must be numbers.');
  }

  result.raw = (earnings - initialInvestment) / initialInvestment;
  result.rounded = Math.round(result.raw * 10000) / 10000;
  result.percent = result.rounded * 100;

  return result;
}

module.exports = returnOnInvestment;

},{"./utils/enforce/number":9}],9:[function(require,module,exports){
'use strict';

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

module.exports = enforceNumber;

},{}],10:[function(require,module,exports){
'use strict';

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

},{"../../processOpts":11}],11:[function(require,module,exports){
'use strict';

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

},{}],12:[function(require,module,exports){
"use strict";

function sumArray(arr) {
  var total = 0;
  for (var i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}

module.exports = sumArray;

},{}]},{},[5])(5)
});