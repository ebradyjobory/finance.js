//Finance.js
//For more information, visit http://financejs.org
//Copyright 2014 - 2015 Essam Al Joubori, MIT license

// Instantiate a Finance class
var Finance = function() {};

// Present Value (PV)
Finance.prototype.PV = function (rate, cf1) {
  var rate = rate/100, pv;
  pv = cf1 / (1 + rate);
  return Math.round(pv * 100) / 100;
};

// Future Value (FV)
Finance.prototype.FV = function (rate, cf0, numOfPeriod) {
  var rate = rate/100, fv;
  fv = cf0 * Math.pow((1 + rate), numOfPeriod);
  return Math.round(fv * 100) / 100;
};

// Net Present Value (NPV)
Finance.prototype.NPV = function (rate) {
  var rate = rate/100, npv = arguments[1];
  for (var i = 2; i < arguments.length; i++) {
    npv +=(arguments[i] / Math.pow((1 + rate), i - 1));
  }
  return Math.round(npv * 100) / 100;
};

// Internal Rate of Return (IRR)
Finance.prototype.IRR = function(cfs) { 
  var bestGuess, currentNPV;
  var checkNPV = function(rate, arguments){
    var npv = arguments[0];
    // base case
    for (var i = 1; i < arguments.length; i++) {
      npv +=(arguments[i] / Math.pow((1 + rate/100), i));
    }
    currentNPV = Math.round(npv * 100) / 100;
    if (currentNPV <= 0) {
      bestGuess = rate;
      return;
    } 
    checkNPV(rate + 0.01, arguments);
  }; 
  checkNPV(0.01, arguments);
  return Math.round(bestGuess * 100) / 100;
};

// Payback Period (PP)
Finance.prototype.PP = function(numOfPeriods, cfs) {
  // for even cash flows
  if (numOfPeriods === 0) {
    return Math.abs(arguments[1]) / arguments[2];
  }
  // for uneven cash flows
  var cumulativeCashFlow = arguments[1];
  var yearsCounter = 1;  
  for (i = 2; i < arguments.length; i++) {
    cumulativeCashFlow += arguments[i];
    if (cumulativeCashFlow > 0) {
      yearsCounter += (cumulativeCashFlow - arguments[i]) / arguments[i];
      return yearsCounter;
    } else {
      yearsCounter++;
    }
  }
};

// Return on Investment (ROI)  
Finance.prototype.ROI = function(cf0, earnings) {
  var roi = (earnings - Math.abs(cf0)) / Math.abs(cf0) * 100;
  return Math.round(roi * 100) / 100;
};

// Amortization
Finance.prototype.AM = function (principal, rate, period, yearOrMonth) {
  var ratePerPeriod = rate / 12 / 100;
  // for inputs in years
  if (!yearOrMonth) {
    var numerator = ratePerPeriod * Math.pow((1 + ratePerPeriod), period * 12);
    var denominator = Math.pow((1 + ratePerPeriod), period * 12) - 1;

    var am = principal * (numerator / denominator);
    return Math.round(am * 100) / 100;

  // for inputs in months
  } else if (yearOrMonth === 1) {
    var numerator = ratePerPeriod * Math.pow((1 + ratePerPeriod), period);
    var denominator = Math.pow((1 + ratePerPeriod), period) - 1;

    var am = principal * (numerator / denominator);
    return Math.round(am * 100) / 100;
  } else {
    console.log('not defined');
  }
};

// Profitability Index (PI)
Finance.prototype.PI = function(rate, cfs){
  var totalOfPVs = 0, PI;
  for (var i = 2; i < arguments.length; i++) {
    var discountFactor;
    // calculate discount factor
    discountFactor = 1 / Math.pow((1 + rate/100), (i - 1)); 
    totalOfPVs += arguments[i] * discountFactor;
  }
  PI = totalOfPVs/Math.abs(arguments[1]);
  return Math.round(PI * 100) / 100;
};

// Discount Factor (DF)
Finance.prototype.DF = function(rate, numOfPeriods) {
  var dfs = [], discountFactor;
  for (var i = 1; i < numOfPeriods; i++) {
    discountFactor = 1 / Math.pow((1 + rate/100), (i - 1));
    roundedDiscountFactor = Math.ceil(discountFactor * 1000)/1000;
    dfs.push(roundedDiscountFactor);
  }
  return dfs;
};

// Compound Interest (CI)
Finance.prototype.CI = function(rate, numOfCompoundings, principal, numOfPeriods) {
  var CI = principal * Math.pow((1 + ((rate/100)/ numOfCompoundings)), numOfCompoundings * numOfPeriods);
  return Math.round(CI * 100) / 100;
};

// Compound Annual Growth Rate (CAGR)
Finance.prototype.CAGR = function(beginningValue, endingValue, numOfPeriods) {
  var CAGR = Math.pow((endingValue / beginningValue), 1 / numOfPeriods) - 1;
  return Math.round(CAGR * 10000) / 100;
};

// Leverage Ratio (LR)
Finance.prototype.LR = function(totalLiabilities, totalDebts, totalIncome) {
  return (totalLiabilities  + totalDebts) / totalIncome;
};

// Rule of 72
Finance.prototype.R72 = function(rate) {
  return 72 / rate;
};

// Weighted Average Cost of Capital (WACC)
Finance.prototype.WACC = function(marketValueOfEquity, marketValueOfDebt, costOfEquity, costOfDebt, taxRate) {
  E = marketValueOfEquity;
  D = marketValueOfDebt;
  V =  marketValueOfEquity + marketValueOfDebt;
  Re = costOfEquity;
  Rd = costOfDebt;
  T = taxRate;

  var WACC = ((E / V) * Re/100) + (((D / V) * Rd/100) * (1 - T/100));
  return Math.round(WACC * 1000) / 10;
};

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Finance;
  }
}
