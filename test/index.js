//Finance.js
//For more information, visit http://financejs.org.
//Created by Essam Al Joubori
//Copyright 2014 - 2015 Essam Al Joubori, MIT license

var should = require('chai').should(),
  Finance = require('../accurate-finance');

var cal = new Finance();

describe('FinanceJS', function() {

  it('should compute PV', function() {
    // 1st argument is rate; the 2nd argument is the cash flow
    cal.PV(5, 100).should.equal(95.23809523809524);
  });

  it('should compute PV with num of periods', function() {
    // 1st argument is rate; the 2nd argument is the cash flow
    cal.PV(5, 100, 5).should.equal(78.3526166468459);
  });

  it('should compute FV', function() {
    cal.FV(0.5, 1000, 12).should.equal(1061.6778118644995);
  });

  it('should compute NPV', function() {
    cal.NPV(10, -500000, 200000, 300000, 200000).should.equal(80015.02629601803);
  });

  it('should compute IRR', function() {
    var data = {
      depth : 10000,
      cashFlow : [-6, 297, 307]
    };
    var irr = cal.IRR(data);
    // should be ~4951.29
    (irr).should.be.within(4951, 4952);
  });

  it('should compute PP for even cash flows', function() {
    cal.PP(0, -105, 25).should.equal(4.2);
  });

  it('should compute PP for uneven cash flows', function() {
    var pp = cal.PP(5, -50, 10, 13, 16, 19, 22);
    (pp).should.be.within(3.3, 3.6);
  });

  it('should compute ROI', function() {
    cal.ROI(-55000, 60000).should.equal(9.09);
  });

  it('should compute AM (Amortization) for inputs in years', function() {
    // 0 if inputs are in years
    cal.AM(20000, 7.5, 5, 0).should.equal(400.75897191247526);
  });

  it('should compute AM (Amortization) for inputs in months', function() {
    // 1 if inputs are in months
    cal.AM(20000, 7.5, 60, 1).should.equal(400.75897191247526);
  });

  it('should compute AM (Amortization) for inputs in years when payment is at the beginning of the month', function() {
    // 1 if inputs are in months
    cal.AM(20000, 7.5, 5, 0, 1).should.equal(398.2697857515282);
  });

  it('should compute AM (Amortization) for inputs in months when payment is at the beginning of the month', function() {
    // 1 if inputs are in months
    cal.AM(20000, 7.5, 60, 1, 1).should.equal(398.2697857515282);
  });

  it('should compute PI', function() {
    // rate, initial investment, and cash flows
    cal.PI(10, -40000, 18000, 12000, 10000, 9000, 6000).should.equal(1.0916697195298384);
  });

  it('should compute DF', function() {
    // rate and number of periods
    cal.DF(10, 6).should.eql([1, 0.9090909090909091, 0.8264462809917356, 0.7513148009015778, 0.6830134553650707]);
  });

  it('should compute CI', function() {
    // rate, compoundings per period, principal , and number of periods
    cal.CI(4.3, 4, 1500, 6 ).should.equal(1938.8368221341036);
  });

  it('should compute CAGR', function() {
    // begining value, Ending value, and number of periods
    cal.CAGR(10000, 19500, 3 ).should.equal(24.93329774613909);
  });

  it('should compute LR', function() {
    // total liabilities, total debts, and total income. Result is a ratio
    cal.LR(25, 10, 20 ).should.equal(1.75);
  });

  it('should compute CC', function() {
    // balance, monthly payment, daily interest rate
    cal.LR(25, 10, 20).should.equal(1.75);
  });

  it('should compute R72', function() {
    // interest rate
    cal.R72(10).should.equal(7.2);
  });

  it('should compute WACC', function() {
    // market value of equity, market value of debt, cost of equity, cost of debt, tax rate
    cal.WACC(600000, 400000, 6, 5, 35).should.equal(4.9);
  });

  it('should compute PMT', function() {
    // rate, number of payments, loan principal
    Number(cal.PMT(2,36,-1000000).toFixed(2)).should.equal(39232.85)
  });
  //investment return, inflation rate
  it('should compute IAR', function() {
    cal.IAR(0.08, 0.03).should.equal(4.854368932038835);
  });

  // it('should compute XIRR', function() {
  //   cal.XIRR([-1000, -100, 1200],[new Date(2015, 11, 1 ), new Date(2016, 7, 1 ), new Date(2016, 7, 19 )],0 ).should.equal(14.107778714844969);
  // });
  it('should compute CAPM', function() {
    cal.CAPM(2, 2, 10).should.equal(0.18);
  });
  it('should compute stockPV', function() {
    cal.stockPV(5, 15, 10).should.equal(105);
  });
});
