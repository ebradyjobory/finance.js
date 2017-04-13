//Finance.js
//For more information, visit http://financejs.org
//Copyright 2014 - 2015 Essam Al Joubori, MIT license

// Instantiate a Finance class
var Finance = function() {};

// Present Value (PV)
Finance.prototype.PV = function (rate, cf1, numOfPeriod) {
  numOfPeriod = typeof numOfPeriod !== 'undefined' ? numOfPeriod : 1;
  var rate = rate/100, pv;
  pv = cf1 / Math.pow((1 + rate),numOfPeriod);
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

// seekZero seeks the zero point of the function fn(x), accurate to within x \pm 0.01. fn(x) must be decreasing with x.
function seekZero(fn) {
  var x = 1;
  while (fn(x) > 0) {
    x += 1;
  }
  while (fn(x) < 0) {
    x -= 0.01
  }
  return x + 0.01;
}

// Internal Rate of Return (IRR)
Finance.prototype.IRR = function(cfs) {
  var args = arguments;
  var numberOfTries = 1;
  // Cash flow values must contain at least one positive value and one negative value
  var positive, negative;
  Array.prototype.slice.call(args).forEach(function (value) {
    if (value > 0) positive = true;
    if (value < 0) negative = true;
  })
  if (!positive || !negative) throw new Error('IRR requires at least one positive value and one negative value');
  function npv(rate) {
    numberOfTries++;
    if (numberOfTries > 1000) {
      throw new Error('IRR can\'t find a result');
    }
    var rrate = (1 + rate/100);
    var npv = args[0];
    for (var i = 1; i < args.length; i++) {
      npv += (args[i] / Math.pow(rrate, i));
    }
    return npv;
  }
  return Math.round(seekZero(npv) * 100) / 100;
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
Finance.prototype.AM = function (principal, rate, period, yearOrMonth, payAtBeginning) {
  var numerator, denominator, am;
  var ratePerPeriod = rate / 12 / 100;

  // for inputs in years
  if (!yearOrMonth) {
    numerator = buildNumerator(period * 12);
    denominator = Math.pow((1 + ratePerPeriod), period * 12) - 1;

  // for inputs in months
  } else if (yearOrMonth === 1) {
    numerator = buildNumerator(period)
    denominator = Math.pow((1 + ratePerPeriod), period) - 1;

  } else {
    console.log('not defined');
  }
  am = principal * (numerator / denominator);
  return Math.round(am * 100) / 100;

  function buildNumerator(numInterestAccruals){
    if( payAtBeginning ){
      //if payments are made in the beginning of the period, then interest shouldn't be calculated for first period
      numInterestAccruals -= 1;
    }
    return ratePerPeriod * Math.pow((1 + ratePerPeriod), numInterestAccruals);
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

// Current Ratio (CR)
Finance.prototype.CR = function(totalAssets,totalLiabilities){
	return totalAssets/totalLiabilities;
};

// Quick Ratio (QR)
Finance.prototype.QR = function(totalAssets,inventory,totalLiabilities) {
	return (totalAssets - inventory) / totalLiabilities;
};

// Working Capital Turnover Ratio (WCTR)
Finance.prototype.WCTR = function(totalAssets,totalLiabilities,sales){
	return (totalAssets-totalLiabilities)/sales;
};

// Rule of 72
Finance.prototype.R72 = function(rate) {
  return 72 / rate;
};

//YTM - Yield to maturity
Finance.prototype.YTM = function(rate, parValue, marketPrice, durYear) {
  var ytm = (rate + (parValue-marketPrice)/durYear)/((parValue + marketPrice) / 2);
  return Math.round(ytm * 100) / 100;
};

//FCNR Quaterly Income Deposite
Finance.prototype.FCNRQ = function(principal, rate ) {
  var sum = rate/400;
  var amount = (principal * rate)/((1 + s) + 1);
  return Math.round(amount * 100) / 100;
};

//FCNR Monthly income Deposite
Finance.prototype.FCNRM = function(principal, rate ) {
  var sum = rate/400;
  var exp = Math.pow(1 + sum, 6);
  var amount = (principal * rate * sum) / (exp -1);
  return Math.round(amount * 100) / 100;
};

// GII Gratuity in India
Finance.prototype.GII = function(basicPay, dearnessAllowance, durYear ){
  var gii = ((basicPay + dearnessAllowance ) * 15 * durYear) / 26;
  return Math.round(gii * 100) / 100;
};

// VAT Value Added TAX
Finance.prototype.TAX = function(originalCost, vatRate){
  var tax = originalCost * vatRate / 100;
  return Math.round(tax * 100) / 100;
};

//RPD Reinvestment Plan Deposit
Finance.prototype.RPD = function(principal, rate, durYear){
  var exp = Math.pow(1 + rate , durYear )
  var amount = principal * exp ;
  return Math.round(amount * 100) / 100;
};

//ATR Acid Test Ratio
Finance.prototype.ATR = function(cash, accountreceivable, shorttrminv, liabilites ){
  var atr =(cash + accountreceivable + shorttrminv) / liabilites;
  return Math.round(atr * 100) / 100;
};

//APY Annual Percentage Yield
Finance.prototype.APY = function(rate , durComp){
  var exp = rate / durComp;
  var apy = Math.pow(1 + exp , durComp) - 1 ;
  return Math.round(apy * 100) / 100;
};

// RV Residual Value
Finance.prototype.RV = function (fixedAssetCost, sRate , lifeSpan){
  var rv = (fixedAssetCost - sRate) / lifeSpan;
  return Math.round(rv * 100) / 100;
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

// PMT calculates the payment for a loan based on constant payments and a constant interest rate
Finance.prototype.PMT = function(fractionalRate, numOfPayments, principal) {
  return -principal * fractionalRate/(1-Math.pow(1+fractionalRate,-numOfPayments))
};

// IAR calculates the Inflation-adjusted return
Finance.prototype.IAR = function(investmentReturn, inflationRate){
  return 100 * (((1 + investmentReturn) / (1 + inflationRate)) - 1);
}

// XIRR - IRR for irregular intervals
Finance.prototype.XIRR = function(cfs, dts, guess) {
if (cfs.length != dts.length) throw new Error('Number of cash flows and dates should match');

  var positive, negative;
  Array.prototype.slice.call(cfs).forEach(function (value) {
    if (value > 0) positive = true;
    if (value < 0) negative = true;
  });

  if (!positive || !negative) throw new Error('XIRR requires at least one positive value and one negative value');
  

  guess = !!guess ? guess : 0;

  var limit = 100; //loop limit
  var guess_last;
  var durs = [];

  durs.push(0);

  //Create Array of durations from First date
  for(var i = 1; i < dts.length; i++) {
    durs.push(durYear(dts[0], dts[i]));
  }
  
  do {
    guess_last = guess;
    guess = guess_last - sumEq(cfs, durs, guess_last);
    limit--;
    
  }while(guess_last.toFixed(5) != guess.toFixed(5) && limit > 0);

  var xirr = guess_last.toFixed(5) != guess.toFixed(5) ? null : guess*100;

  return Math.round(xirr * 100) / 100;
};

//Returns Sum of f(x)/f'(x)
function sumEq(cfs, durs, guess) {
  var sum_fx = 0;
  var sum_fdx = 0;
  for (var i = 0; i < cfs.length; i++) {
    sum_fx = sum_fx + (cfs[i] / Math.pow(1 + guess, durs[i]));
  }
  for ( i = 0; i < cfs.length; i++) {
    sum_fdx = sum_fdx + (-cfs[i] * durs[i] * Math.pow(1 + guess, -1 - durs[i]));
  }
  return sum_fx / sum_fdx;
}

//Returns duration in years between two dates
function durYear(first, last) {
  return (Math.abs(last.getTime() - first.getTime()) / (1000 * 3600 * 24 * 365));
}

// SLN function calculates the straight line depreciation of an asset for one period
Finance.prototype.SLN = function(cost,salvage,life){
 var sln=(cost-salvage)/life;
  return Math.round(sln * 100) / 100;
}

// SYD function calculates the sum-of-years' digits depreciation for a specified period in the lifetime of an asset.
Finance.prototype.SYD = function(cost, salvage, life, period){
  cost = parseFloat(cost);
  salvage = parseFloat(salvage);
  life = parseFloat(life);
  period = parseInt(period);
  var x = ((cost - salvage)*(life - period + 1))*2;
  syd = x / (life * (life+1));
  return Math.round(syd * 100) / 100; 
}

// DDB function calculates the depreciation of an asset, using the Double Declining Balance Method
Finance.prototype.DDB = function(cost, salvage, life, period,factor=2){
  var depreciation = Math.min(cost*(factor/life),cost-salvage)
    return Math.round(depreciation * 100) / 100;
}

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
      module.exports = Finance;
      module.exports.Finance = Finance;
  }
}
