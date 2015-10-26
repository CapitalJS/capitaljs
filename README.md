# Capital.js [![Build Status](https://secure.travis-ci.org/CapitalJS/capitaljs.png?branch=master)](https://travis-ci.org/CapitalJS/capitaljs)

## Installation

In a browser:

```
<script src="capital.js"></script>
```

Using npm:

```
$ npm install capitaljs
```

## Usage

In a browser:

```
var rate = capitaljs.compoundAnnualGrowthRate({...});
```

In an AMD loader:

```
require(['capitaljs'], function(capitaljs) {...});
```

In Node:

```
var capitaljs = require('capitaljs');
var rate = capitaljs.compoundAnnualGrowthRate({...});
```

Or if you just want a single formula (to reduce your browser bundle's filesize):

```
var cagr = require('capitaljs/compoundAnnualGrowthRate');
var rate = cagr({...});
```

## Current formulae:

Better docs and examples coming soon.

```
var amortization = require('capitaljs/amortization');

amortization({
  amount: 180000,
  rate: 4.25,
  totalTerm: 360,
  amortizeTerm: 60
});
```

```
var cash = require('capitaljs/cashFlow');

cash({
  income: 100000,
  expenses: 50000
});
```

```
var cagr = require('capitaljs/compoundAnnualGrowthRate');

cagr({
  startValue: 100000,
  endValue: 50000,
  years: 10
});
```

```
var iar = require('capitaljs/inflationAdjustedReturn');

iar({
  investmentReturn: .08,
  inflationRate: .03
});
```

```
var interest = require('capitaljs/interest');

interest({
  principal: 100000,
  rate: .06,
  years: 10,
  compounding: true
});
```

```
var roi = require('capitaljs/returnOnInvestment');

roi({
  earnings: 5000,
  initialInvestment: 100000
});
```

## Contributing

Please read the [Contributing guidelines](CONTRIBUTING.md).

### Running Tests

```
$ npm test
```

## License

The project is in the public domain within the United States, and
copyright and related rights in the work worldwide are waived through
the [CC0 1.0 Universal public domain dedication](http://creativecommons.org/publicdomain/zero/1.0/).

All contributions to this project will be released under the CC0
dedication. By submitting a pull request, you are agreeing to comply
with this waiver of copyright interest.

Software source code previously released under an open source license and then modified by CFPB staff is considered a "joint work" (see 17 USC § 101); it is partially copyrighted, partially public domain, and as a whole is protected by the copyrights of the non-government authors and must be released according to the terms of the original open-source license.

For further details, please see: http://www.consumerfinance.gov/developers/sourcecodepolicy/
