var Finance = function() {};

// Present Value (PV)
// An individual wishes to determine how much money she would need to put into her money market account to have $100 one year today if she is earning 5% interest on her account, simple interest.
Finance.prototype.PV = function (rate, cf1) {
  var rate = rate/100;
  pv = cf1 / (1 + rate);
  return Math.round(pv * 100) / 100;
};

// Future Value (FV)
// An individual would like to determine their ending balance after one year on an account that earns .5% per month and is compounded monthly. The original balance on the account is $1000. For this example, the original balance, which can also be referred to as initial cash flow or present value, would be $1000, r would be .005(.5%), and n would be 12 (months).
Finance.prototype.FV = function (rate, cf0, numOfPeriod) {
  var rate = rate/100;
  var fv = cf0 * Math.pow((1 + rate), numOfPeriod);
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
  var bestGuess;
  var checkNPV = function(rate, arguments){
    var currentNPV;
    // base case
    // TODO: to make the IRR function take more than 4 arguments
    currentNPV = Finance.prototype.NPV(rate, arguments[0], arguments[1], arguments[2], arguments[3]);
    console.log(currentNPV);
    if (currentNPV <= 0) {
      bestGuess = rate;
      return;
    } 
    checkNPV(rate+= 0.01, arguments);
  }; 
  checkNPV(0.01, arguments);
  return Math.round(bestGuess * 100) / 100;
};

// Payback Period (PP) = Initial Investment / Annual Cash Inflows
Finance.prototype.PP = function(numOfPeriods, cfs) {
  // for even cash flows
  if (numOfPeriods === 0) {
    return Math.abs(arguments[1]) / arguments[2];
  }
  // for uneven cash flows
  //var cashFlow = arguments[1];
  var CumulativeCashFlow = arguments[1];
  var yearsCounter = 1;  
  for (i = 2; i < arguments.length; i++) {
    CumulativeCashFlow += arguments[i];
    if (CumulativeCashFlow > 0) {
      yearsCounter += (CumulativeCashFlow - arguments[i]) / arguments[i];
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





