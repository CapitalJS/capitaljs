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

## Current formulae

### Amortization

Calculate the monthly payment of an amortizing loan (like a mortgage) and how the loan has amortized after a specified period of time.

#### Options

Option | Format | Details
------ | ------ | -------
`amount` | number | Total amount of the loan
`rate` | number | Annual interest rate of the loan
`totalTerm` | number | Total length of the loan, in months
`amortizeTerm` | number | Point in time after the start of the loan you’d like to check the amortization, in months

#### Returns

Property | Format | Details
-------- | ------ | -------
`balance` | number | Total amount of principal left to be paid after the number of months specified in `amortizeTerm`
`balanceRound` | string | `balance` rounded to the nearest cent
`interest` | number | Total amount of interest paid on the loan after the number of months specified in `amortizeTerm`
`interestRound` | string | `interest` rounded to the nearest cent
`payment` | number | Monthly payment
`paymentRound` | string | `payment` rounded to the nearest cent
`principal` | number | Total amount of principal paid on the loan after the number of months specified in `amortizeTerm`
`principalRound` | string | `principal` rounded to the nearest cent

#### Example

```js
var amortization = require('capitaljs/amortization');

// What’s the amortization like after 5 years for a 30-year, $180,000 mortgage
// with a 4.25% interest rate?
amortization( {
  amount: 180000,
  rate: 4.25,
  totalTerm: 360,
  amortizeTerm: 60
} );

/*
{
  balance: 163453.85387151438,
  balanceRound: "163453.85",
  interest: 36583.362108097754,
  interestRound: "36583.36",
  payment: 885.4918039430557,
  paymentRound: "885.49",
  principal: 16546.146128485594,
  principalRound: "16546.15"
}
*/
```

### Cash flow

Calculate how much money is left after subtracting expenses from income.

#### Options

Option | Format | Details
------ | ------ | -------
`income` | positive number or array | Total income or an array with all sources of income
`expenses` | positive number or array | Total expenses or an array with all expenses

#### Returns

Property | Format | Details
-------- | ------ | -------
`cash` | number | Total cash left over after subtracting expenses from income
`expenses` | number | Total expenses
`income` | number | Total income

#### Examples

```js
var cashFlow = require('capitaljs/cashFlow');

// How much money is left over given $50,000 of expenses and a $100,000 income?
cashFlow( {
  income: 100000,
  expenses: 50000
} );

/*
{
  cash: 50000,
  expenses: 50000,
  income: 100000
}
*/

// How much money is left over given a bunch of different income sources and
// a bunch of different expenses?
cashFlow( {
  income: [300, 14000, 189],
  expenses: [90, 681, 15980, 670]
} );

/*
{
  cash: -2932,
  expenses: 17421,
  income: 14489
}
*/
```

### Compound annual growth rate

Calculate a compounded annual rate of return on an investment.

#### Options

Option | Format | Details
------ | ------ | -------
`startValue` | number | Starting value of the investment
`endValue` | number | Ending value of the investment
`years` | number | Length of the investment, in years

#### Returns

Property | Format | Details
-------- | ------ | -------
`percent` | number | Compound annual growth rate of the investment, as an unrounded percent
`raw` | number | Raw compound annual growth rate of the investment
`rounded` | number | Raw compound annual growth rate of the investment, rounded to the nearest thousandth

#### Example

```js
var compoundAnnualGrowthRate = require('capitaljs/compoundAnnualGrowthRate');

// What’s the compound annual growth rate of an investment that started at
// $50,000 and grew to $100,000 in 10 years?
compoundAnnualGrowthRate( {
  startValue: 50000,
  endValue: 100000,
  years: 10
} );

/*
{
  percent: 7.199999999999999,
  raw: 0.07177346253629313,
  rounded: 0.072
}
*/
```

### Inflation-adjusted return

Calculate the return on an investment, accounting for inflation over the lifetime of the investment.

#### Options

Option | Format | Details
------ | ------ | -------
`investmentReturn` | number | Investment’s lifetime return, as a decimal (so “8%” is ".06")
`inflationRate` | number | Inflation rate over the lifetime of the investment, as a decimal (so “3%” is “.03”)

#### Returns

A single number, the inflation-adjusted return, as a percent rounded to the nearest hundredth

#### Example

```js
var inflationAdjustedReturn = require('capitaljs/inflationAdjustedReturn');

// Adjusting for a 3% inflation rate, what’s the return for an investment that
// grew by 8%?
inflationAdjustedReturn( {
  investmentReturn: .08,
  inflationRate: .03
} );

// 4.85
```

### Interest accrued

Calculate how much interest has been earned on an initial investment after a period of time.

#### Options

Option | Format | Details
------ | ------ | -------
`principal` | number | Initial amount invested
`rate` | number | Periodic interest rate, as a percent
`periods` | number | Years since the investment was started
`compoundings` | number | How often the interest rate is compounded per year (12 would be monthly, 4 is quarterly, 1 is yearly)

#### Returns

Property | Format | Details
-------- | ------ | -------
`interest` | number | Total interest earned on the investment
`total` | number | Total current value of the investment, rounded to the nearest cent

#### Examples

```js
var interest = require('capitaljs/interest');

// What’s a $10,000 investment with a 6% interest rate that compounds yearly
// worth after 10 years
interest( {
  principal: 10000,
  rate: 6,
  periods: 10,
  compoundings: 1
} );

/*
{
  interest: 7908.48,
  total: 17908.48
}
*/

// What’s a $10,000 investment with a 6% interest rate that compounds monthly
// worth after 10 years
interest( {
  principal: 10000,
  rate: 6,
  periods: 10,
  compoundings: 12
} );

/*
{
  interest: 8193.970000000001,
  total: 18193.97
}
*/
```

### Return on investment

Calculate the return on an investment.

#### Options

Option | Format | Details
------ | ------ | -------
`earnings` | number | Final value of the investment
`initialInvestment` | number | Initial value of the investment

#### Returns

Property | Format | Details
-------- | ------ | -------
`percent` | number | Return on investment, as an unrounded percent
`raw` | number | Raw return on investment
`rounded` | number | Raw return on investment, rounded to the nearest ten thousandth

#### Example

```js
var returnOnInvestment = require('capitaljs/returnOnInvestment');

// What’s the return on a $70,000 investment that grew to $89,700?
returnOnInvestment( {
  earnings: 89700,
  initialInvestment: 70000
} );

/*
{
  percent: 28.139999999999997,
  raw: 0.2814285714285714,
  rounded: 0.2814
}
*/
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
