//Finance.js
//For more information, visit http://financejs.org
//Copyright 2014 - 2015 Essam Al Joubori, MIT license

// Instantiate a Finance class
var Decimal = require('decimal.js');
var Finance = function() {};

// Present Value (PV)
Finance.prototype.PV = function (rate, cf1, numOfPeriod) {
  numOfPeriod = typeof numOfPeriod !== 'undefined' ? numOfPeriod : 1;
  var decimizedRate = new Decimal(rate).dividedBy(100);
  var powerBase = new Decimal(decimizedRate.add(1));
  var decimizedPv = new Decimal(cf1).dividedBy(powerBase.toPower(numOfPeriod));
  return Number(decimizedPv);
};

// Future Value (FV)
Finance.prototype.FV = function (rate, cf0, numOfPeriod) {
  var decimizedRate = new Decimal(rate).dividedBy(100);
  var powerBase = new Decimal(decimizedRate.add(1));
  var decimizedFv = new Decimal(cf0).times(powerBase.toPower(numOfPeriod));
  return Number(decimizedFv);
};

// Net Present Value (NPV)
Finance.prototype.NPV = function (rate) {
  var decimizedRate = new Decimal(rate).dividedBy(100);
  var decimizedNpv = new Decimal(arguments[1]);
  var powerBase = new Decimal(decimizedRate.add(1));

  for (var i = 2; i < arguments.length; i++) {
    var newDecimizedArg = new Decimal(arguments[i]);
    decimizedNpv = decimizedNpv.add(newDecimizedArg.dividedBy(powerBase.toPower(i - 1)));
  }
  return Number(decimizedNpv);
};

// seekZero seeks the zero point of the function fn(x), accurate to within x \pm 0.01. fn(x) must be decreasing with x.
function seekZero(fn) {
  var x = new Decimal(1);
  while (fn(x) > 0) {
    x = x.add(1);
  }
  while (fn(x) < 0) {
    x = x.minus(new Decimal(0.01));
  }
  return Number(x.add(new Decimal(0.01)));
}

// Internal Rate of Return (IRR)
Finance.prototype.IRR = function(cfs) {
  var depth = cfs.depth;
  var args = cfs.cashFlow;
  var numberOfTries = 1;
  // Cash flow values must contain at least one positive value and one negative value
  var positive, negative;
  Array.prototype.slice.call(args).forEach(function (value) {
    if (value > 0) positive = true;
    if (value < 0) negative = true;
  })
  if (!positive || !negative) throw new Error('IRR requires at least one positive value and one negative value');
  function npvFunc(rate) {
    numberOfTries++;
    if (numberOfTries > depth) {
      throw new Error('IRR can\'t find a result');
    }
    var decimizedRrate = new Decimal(new Decimal(1).add(new Decimal(rate).dividedBy(100)));
    var decimizedNpv = new Decimal(args[0]);
    for (var i = 1; i < args.length; i++) {
      var power = new Decimal(decimizedRrate).toPower(i);
      var decimizedArg = new Decimal(args[i]);
      decimizedNpv = decimizedNpv.add(decimizedArg.dividedBy(power));
    }
    return Number(decimizedNpv);
  }
  return seekZero(npvFunc);
};

// Payback Period (PP)
Finance.prototype.PP = function(numOfPeriods, cfs) {
  // for even cash flows
  if (numOfPeriods === 0) {
    var decimizedArg1 = new Decimal(arguments[1]);
    var decimizedArg2 = new Decimal(arguments[2]);
    return Number(decimizedArg1.dividedBy(decimizedArg2).abs());
  }
  // for uneven cash flows
  var decimizedCumulativeCashFlow = new Decimal(arguments[1]);
  var yearsCounter = new Decimal(1);
  for (i = 2; i < arguments.length; i++) {
    decimizedCumulativeCashFlow = decimizedCumulativeCashFlow.add(arguments[i]);
    if (Number(decimizedCumulativeCashFlow) > 0) {
      var top = new Decimal(decimizedCumulativeCashFlow.minus(new Decimal(arguments[i])));
      yearsCounter = yearsCounter.add(top.dividedBy(new Decimal(arguments[i])));
      return Number(yearsCounter);
    } else {
      yearsCounter = yearsCounter.add(1);
    }
  }
};

// Return on Investment (ROI)
Finance.prototype.ROI = function(cf0, earnings) {
  var roi = (earnings - Math.abs(cf0)) / Math.abs(cf0) * 100;
  return Math.round(roi * 100) / 100;
};

// Amortization
Finance.prototype.AM = function (principal, rate, period, yearOrMonth, payAtBeginning) {
  var numerator;
  var decimizedDenominator;
  var am = new Decimal(principal);
  var ratePerPeriod = new Decimal(rate).dividedBy(12).dividedBy(100);

  // for inputs in years
  var base = new Decimal(1).add(ratePerPeriod);
  var power = new Decimal(period);
  if (!yearOrMonth) {
    numerator = new Decimal(buildNumerator(Number(new Decimal(period).times(12))));
    power = power.times(12);
    decimizedDenominator = base.toPower(power).minus(1);

    // for inputs in months
  } else if (yearOrMonth === 1) {
    numerator = new Decimal(buildNumerator(Number(new Decimal(period))));
    decimizedDenominator = base.toPower(power).minus(1);
  } else {
    console.log('not defined');
  }
 return  Number(am.times(numerator.dividedBy(decimizedDenominator)));

  function buildNumerator(numInterestAccruals) {
    if (payAtBeginning) {
      //if payments are made in the beginning of the period, then interest shouldn't be calculated for first period
      numInterestAccruals -= 1;
    }
    var base = new Decimal(1).add(ratePerPeriod);
    return Number(base.toPower(numInterestAccruals).times(ratePerPeriod));
  }
};

// Profitability Index (PI)
Finance.prototype.PI = function(rate, cfs) {
  var totalOfPVs = new Decimal(0);
  for (var i = 2; i < arguments.length; i++) {
    var discountFactor = new Decimal(1);
    // calculate discount factor
    var base = new Decimal(1).add(new Decimal(rate).dividedBy(100));
    discountFactor = discountFactor.dividedBy(base.toPower((i - 1)));
    totalOfPVs = totalOfPVs.add(new Decimal(arguments[i]).times(discountFactor));
  }
  return Number(totalOfPVs.dividedBy(Math.abs(arguments[1])));
};

// Discount Factor (DF)
Finance.prototype.DF = function(rate, numOfPeriods) {
  var dfs = [];
  for (var i = 1; i < numOfPeriods; i++) {
    var base = new Decimal(1).add(new Decimal(rate).dividedBy(100));
    var power = new Decimal(i).minus(1);
    var decimizedDiscountFactor = new Decimal(1).dividedBy(base.toPower(power));
    dfs.push(Number(decimizedDiscountFactor));
  }
  return dfs;
};

// Compound Interest (CI)
Finance.prototype.CI = function(rate, numOfCompoundings, principal, numOfPeriods) {
  var base = new Decimal(1).add(new Decimal(rate).dividedBy(100).dividedBy(numOfCompoundings));
  var power = new Decimal(numOfCompoundings).times(numOfPeriods);
  return Number(new Decimal(principal).times(base.toPower(power)));
};

// Compound Annual Growth Rate (CAGR)
Finance.prototype.CAGR = function(beginningValue, endingValue, numOfPeriods) {
  var base = new Decimal(endingValue).dividedBy(beginningValue);
  var power = new Decimal(1).dividedBy(numOfPeriods);
  return Number(base.toPower(power).minus(1).times(100));
};

// Leverage Ratio (LR)
Finance.prototype.LR = function(totalLiabilities, totalDebts, totalIncome) {
  return Number(new Decimal(totalLiabilities).add(totalDebts).dividedBy(totalIncome));
};

// Rule of 72
Finance.prototype.R72 = function(rate) {
  return Number(new Decimal(72).dividedBy(rate));
};

// Weighted Average Cost of Capital (WACC)
Finance.prototype.WACC = function(marketValueOfEquity, marketValueOfDebt, costOfEquity, costOfDebt, taxRate) {
  var E = new Decimal(marketValueOfEquity);
  var D = new Decimal(marketValueOfDebt);
  var V =  new Decimal(marketValueOfEquity).add(marketValueOfDebt);
  var Re = new Decimal(costOfEquity);
  var Rd = new Decimal(costOfDebt);
  var T = new Decimal(taxRate);

  // ((E / V) * Re/100) + (((D / V) * Rd/100) * (1 - T/100));
  return Number(E.dividedBy(V).times(Re.dividedBy(100)).add(D.dividedBy(V).times(Rd.dividedBy(100)).times(new Decimal(1).minus(T.dividedBy(100)))).times(100));
};

/**
 * Loan Payment calculation.
 * @param rate Rate of interest, 100-based (15% = 15), per period
 * @param principal Loan amount
 * @param numOfPayments
 * @see http://www.financeformulas.net/Loan_Payment_Formula.html
 */
Finance.prototype.PMT = function (rate, numOfPayments, principal) {
  var rate = new Decimal(rate).dividedBy(100);

  var base = new Decimal(1).add(rate);
  var power = new Decimal(-numOfPayments);
  var left = new Decimal(1).minus(base.toPower(power));

  return Number(new Decimal(-principal).times(rate).dividedBy(left));
};

// IAR calculates the Inflation-adjusted return
Finance.prototype.IAR = function(investmentReturn, inflationRate){
  var base = new Decimal(100);
  var right = new Decimal(1).add(inflationRate);
  var left = new Decimal(1).add(investmentReturn);

  return Number(base.times(left.dividedBy(right).minus(1)));
}

// // XIRR - IRR for irregular intervals
// Finance.prototype.XIRR = function(cfs, dts, guess) {
//   if (cfs.length != dts.length) throw new Error('Number of cash flows and dates should match');

//   var positive, negative;
//   Array.prototype.slice.call(cfs).forEach(function (value) {
//     if (value > 0) positive = true;
//     if (value < 0) negative = true;
//   });

//   if (!positive || !negative) throw new Error('XIRR requires at least one positive value and one negative value');


//   guess = !!guess ? guess : 0;

//   var limit = 100; //loop limit
//   var guess_last;
//   var durs = [];

//   durs.push(0);

//   //Create Array of durations from First date
//   for(var i = 1; i < dts.length; i++) {
//     durs.push(durYear(dts[0], dts[i]));
//   }

//   var decimizedGuess = new Decimal(guess);
//   do {
//     guess_last = new Decimal(decimizedGuess);
//     decimizedGuess = guess_last.minus(sumEq(cfs, durs, Number(guess_last)));
//     limit--;

//   }while(guess_last != decimizedGuess && limit > 0);

//   var xirr = !guess_last === decimizedGuess ? null : decimizedGuess.times(100);

//   return Number(xirr);
// }

//CAPM calculates expected return of an asset.
Finance.prototype.CAPM = function (rf, beta, emr, err) {
  return Number(new Decimal(rf).dividedBy(100).add(new Decimal(beta).times(new Decimal(emr).dividedBy(100).minus(new Decimal(rf).dividedBy(100)))));
}

//Returns the Value of stock with dividend growing at a 
//constant growth rate to perpetuity.
Finance.prototype.stockPV = function (g, ke, D0) {
  var decimizedGDividedBy100 = new Decimal(g).dividedBy(100);
  var decimizedKe = new Decimal(ke);
  return Number(new Decimal(D0).times(new Decimal(1).add(decimizedGDividedBy100)).dividedBy(decimizedKe.dividedBy(100).minus(decimizedGDividedBy100)));
}

//Returns Sum of f(x)/f'(x)
function sumEq(cfs, durs, guess) {

  var sum_fx = new Decimal(0);
  var sum_fdx = new Decimal(0);
  for (var i = 0; i < cfs.length; i++) {
    var base = new Decimal(1).add(guess);
    sum_fx = sum_fx.add(new Decimal(cfs[i]).dividedBy(base.toPower(durs[i])));
  }
  for ( i = 0; i < cfs.length; i++) {
    var base = new Decimal(1).add(guess);
    var power = new Decimal(-1).minus(durs[i]);
    sum_fdx = sum_fdx.add(new Decimal(-cfs[i]).times(durs[i]).times(base.toPower(power)));
  }
  return Number(sum_fx.dividedBy(sum_fdx));
}

//Returns duration in years between two dates
function durYear(first, last) {
  return (Math.abs(last.getTime() - first.getTime()) / (1000 * 3600 * 24 * 365));
}

if (typeof exports !== 'undefined' && typeof module !== 'undefined' && module.exports) {
  module.exports = Finance;
  module.exports.Finance = Finance;
}
