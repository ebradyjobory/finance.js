// Finance.js
// For more information, visit http://financejs.org
// Copyright 2014 - 2015 Essam Al Joubori, MIT license

// Instantiate a Finance class
const Finance = function Finance() {};

// Present Value (PV)
Finance.prototype.PV = function PV(rate, cf1, numOfPeriod) {
  const newNumOfPeriod = typeof numOfPeriod !== 'undefined' ? numOfPeriod : 1;
  const newRate = rate / 100;
  const pv = cf1 / ((1 + newRate) ** newNumOfPeriod);
  return Math.round(pv * 100) / 100;
};

// Future Value (FV)
Finance.prototype.FV = function FV(rate, cf0, numOfPeriod) {
  const newRate = rate / 100;
  const fv = cf0 * ((1 + newRate) ** numOfPeriod);
  return Math.round(fv * 100) / 100;
};

// Net Present Value (NPV)
Finance.prototype.NPV = function NPV(...args) {
  const rate = args[0] / 100;
  let npv = args[1];
  for (let i = 2; i < args.length; i += 1) {
    npv += (args[i] / ((1 + rate) ** (i - 1)));
  }
  return Math.round(npv * 100) / 100;
};

/**
  seekZero seeks the zero point of the function fn(x),
  accurate to within x \pm 0.01. fn(x) must be decreasing with x.
* */

function seekZero(fn) {
  let x = 1;
  while (fn(x) > 0) {
    x += 1;
  }
  while (fn(x) < 0) {
    x -= 0.01;
  }
  return x + 0.01;
}

// Internal Rate of Return (IRR)
Finance.prototype.IRR = function IRR(...cfs) {
  const args = cfs;
  let numberOfTries = 1;
  // Cash flow values must contain at least one positive value and one negative value
  let positive; let
    negative;
  Array.prototype.slice.call(args).forEach((value) => {
    if (value > 0) positive = true;
    if (value < 0) negative = true;
  });
  if (!positive || !negative) throw new Error('IRR requires at least one positive value and one negative value');
  function npv(rate) {
    numberOfTries += 1;
    if (numberOfTries > 1000) {
      throw new Error('IRR can\'t find a result');
    }
    const rrate = (1 + rate / 100);
    let newNpv = args[0];
    for (let i = 1; i < args.length; i += 1) {
      newNpv += (args[i] / (rrate ** i));
    }
    return newNpv;
  }
  return Math.round(seekZero(npv) * 100) / 100;
};

// Payback Period (PP)
Finance.prototype.PP = function PP(...args) {
  // for even cash flows
  if (args[0] === 0) {
    return Math.abs(args[1]) / args[2];
  }
  // for uneven cash flows
  let cumulativeCashFlow = args[1];
  let yearsCounter = 1;
  for (let i = 2; i < args.length; i += 1) {
    cumulativeCashFlow += args[i];
    if (cumulativeCashFlow > 0) {
      yearsCounter += (cumulativeCashFlow - args[i]) / args[i];
      return yearsCounter;
    }
    yearsCounter += 1;
  }
  return yearsCounter;
};

// Return on Investment (ROI)
Finance.prototype.ROI = function ROI(cf0, earnings) {
  const roi = (earnings - Math.abs(cf0)) / Math.abs(cf0) * 100;
  return Math.round(roi * 100) / 100;
};

// Amortization
function buildNumerator(numInterestAccruals, payAtBeginning, ratePerPeriod) {
  let newNumInterestAccruals = numInterestAccruals;
  if (payAtBeginning) {
    /**
      if payments are made in the beginning of the period,
      then interest shouldn't be calculated for first period
    * */
    newNumInterestAccruals -= 1;
  }
  return (ratePerPeriod * ((1 + ratePerPeriod) ** newNumInterestAccruals));
}

Finance.prototype.AM = function AM(principal, rate, period, yearOrMonth, payAtBeginning) {
  let numerator; let denominator;
  const ratePerPeriod = rate / 12 / 100;

  // for inputs in years
  if (!yearOrMonth) {
    numerator = buildNumerator(period * 12, payAtBeginning, ratePerPeriod);
    denominator = (((1 + ratePerPeriod) ** (period * 12)) - 1);

  // for inputs in months
  } else if (yearOrMonth === 1) {
    numerator = buildNumerator(period, payAtBeginning, ratePerPeriod);
    denominator = (((1 + ratePerPeriod) ** period) - 1);
  } else {
    throw new Error('not defined');
  }
  const am = principal * (numerator / denominator);
  return Math.round(am * 100) / 100;
};

// Profitability Index (PI)
Finance.prototype.PI = function PI(...args) {
  let totalOfPVs = 0;
  for (let i = 2; i < args.length; i += 1) {
    // calculate discount factor
    const discountFactor = 1 / ((1 + args[0] / 100) ** (i - 1));
    totalOfPVs += args[i] * discountFactor;
  }
  const newPI = totalOfPVs / Math.abs(args[1]);
  return Math.round(newPI * 100) / 100;
};

// Discount Factor (DF)
Finance.prototype.DF = function DF(rate, numOfPeriods) {
  const dfs = []; let
    discountFactor;
  for (let i = 1; i < numOfPeriods; i += 1) {
    discountFactor = 1 / ((1 + rate / 100) ** (i - 1));
    const roundedDiscountFactor = Math.ceil(discountFactor * 1000) / 1000;
    dfs.push(roundedDiscountFactor);
  }
  return dfs;
};

// Compound Interest (CI)
Finance.prototype.CI = function CI(rate, numOfCompoundings, principal, numOfPeriods) {
  const calc = ((1 + ((rate / 100) / numOfCompoundings)) ** (numOfCompoundings * numOfPeriods));
  const newCI = principal * calc;
  return Math.round(newCI * 100) / 100;
};

// Compound Annual Growth Rate (CAGR)
Finance.prototype.CAGR = function CAGR(beginningValue, endingValue, numOfPeriods) {
  const newCAGR = ((endingValue / beginningValue) ** (1 / numOfPeriods)) - 1;
  return Math.round(newCAGR * 10000) / 100;
};

// Leverage Ratio (LR)
Finance.prototype.LR = function LR(totalLiabilities, totalDebts, totalIncome) {
  return (totalLiabilities + totalDebts) / totalIncome;
};

// Rule of 72
Finance.prototype.R72 = function R72(rate) {
  return 72 / rate;
};

// Weighted Average Cost of Capital (WACC)
Finance.prototype.WACC = function WACC(mktValOfEqui, mktValOfDebt, ke, kd, tRate) {
  const E = mktValOfEqui;
  const D = mktValOfDebt;
  const V = mktValOfEqui + mktValOfDebt;
  const Re = ke;
  const Rd = kd;
  const T = tRate;

  const newWACC = ((E / V) * Re / 100) + (((D / V) * Rd / 100) * (1 - T / 100));
  return Math.round(newWACC * 1000) / 10;
};

// PMT calculates the payment for a loan based on constant payments and a constant interest rate
Finance.prototype.PMT = function PMT(fractionalRate, numOfPayments, principal) {
  return -principal * fractionalRate / (1 - ((1 + fractionalRate) ** -numOfPayments));
};

// IAR calculates the Inflation-adjusted return
Finance.prototype.IAR = function IAR(investmentReturn, inflationRate) {
  return 100 * (((1 + investmentReturn) / (1 + inflationRate)) - 1);
};

// Returns duration in years between two dates
function durYear(first, last) {
  return (Math.abs(last.getTime() - first.getTime()) / (1000 * 3600 * 24 * 365));
}

// Returns Sum of f(x)/f'(x)
function sumEq(cfs, durs, guess) {
  let sumFx = 0;
  let sumFdx = 0;
  for (let i = 0; i < cfs.length; i += 1) {
    sumFx += cfs[i] / ((1 + guess) ** durs[i]);
  }
  for (let i = 0; i < cfs.length; i += 1) {
    sumFdx += (-cfs[i] * durs[i]) * ((1 + guess) ** (-1 - durs[i]));
  }
  return sumFx / sumFdx;
}

// XIRR - IRR for irregular intervals
Finance.prototype.XIRR = function XIRR(cfs, dts, guess) {
  if (cfs.length !== dts.length) throw new Error('Number of cash flows and dates should match');

  let positive; let
    negative;
  Array.prototype.slice.call(cfs).forEach((value) => {
    if (value > 0) positive = true;
    if (value < 0) negative = true;
  });

  if (!positive || !negative) throw new Error('XIRR requires at least one positive value and one negative value');


  let newGuess = guess || 0;

  let limit = 100; // loop limit
  let guessLast;
  const durs = [];

  durs.push(0);

  // Create Array of durations from First date
  for (let i = 1; i < dts.length; i += 1) {
    durs.push(durYear(dts[0], dts[i]));
  }

  do {
    guessLast = newGuess;
    newGuess = guessLast - sumEq(cfs, durs, guessLast);
    limit -= 1;
  } while (guessLast.toFixed(5) !== newGuess.toFixed(5) && limit > 0);

  const xirr = guessLast.toFixed(5) !== newGuess.toFixed(5) ? null : newGuess * 100;

  return Math.round(xirr * 100) / 100;
};

// CAPM calculates expected return of an asset.
Finance.prototype.CAPM = function CAPM(rf, beta, emr) {
  const ans = rf / 100 + beta * (emr / 100 - rf / 100);
  return ans;
};

// Returns the Value of stock with dividend growing at a constant growth rate to perpetuity.
Finance.prototype.stockPV = function stockPV(g, ke, D0) {
  const valueOfStock = (D0 * (1 + g / 100)) / ((ke / 100) - (g / 100));
  return Math.round(valueOfStock);
};

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Finance;
    module.exports.Finance = Finance;
  }
}
