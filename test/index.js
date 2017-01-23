//Finance.js
//For more information, visit http://financejs.org.
//Created by Essam Al Joubori
//Copyright 2014 - 2015 Essam Al Joubori, MIT license

var should = require('chai').should(),
    Finance = require('../finance');

var cal = new Finance();

describe('FinanceJS', function() {

  it('should compute PV', function() {
    // 1st argument is rate; the 2nd argument is the cash flow
    cal.PV(5, 100).should.equal(95.24);
  });

  it('should compute PV with num of periods', function() {
    // 1st argument is rate; the 2nd argument is the cash flow
    cal.PV(5, 100, 5).should.equal(78.35);
  });

  it('should compute FV', function() {
    cal.FV(0.5, 1000, 12).should.equal(1061.68);
  });

  it('should compute NPV', function() {
    cal.NPV(10, -500000, 200000, 300000, 200000).should.equal(80015.03);
  });

  it('should compute IRR', function() {
    var irr = cal.IRR(-500000, 200000, 300000, 200000);
    (irr).should.be.within(18, 19); // should be ~18.82
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
    cal.AM(20000, 7.5, 5, 0).should.equal(400.76);
  });

  it('should compute AM (Amortization) for inputs in months', function() {
    // 1 if inputs are in months
    cal.AM(20000, 7.5, 60, 1).should.equal(400.76);
  });

  it('should compute AM (Amortization) for inputs in years when payment is at the beginning of the month', function() {
    // 1 if inputs are in months
    cal.AM(20000, 7.5, 5, 0, 1).should.equal(398.27);
  });

  it('should compute AM (Amortization) for inputs in months when payment is at the beginning of the month', function() {
    // 1 if inputs are in months
    cal.AM(20000, 7.5, 60, 1, 1).should.equal(398.27);
  });

  it('should compute PI', function() {
    // rate, initial investment, and cash flows
    cal.PI(10, -40000, 18000, 12000, 10000, 9000, 6000).should.equal(1.09);
  });

  it('should compute DF', function() {
    // rate and number of periods
    cal.DF(10, 6).should.eql([ 1, 0.91, 0.827, 0.752, 0.684]);
  });

  it('should compute CI', function() {
    // rate, compoundings per period, principal , and number of periods
    cal.CI(4.3, 4, 1500, 6 ).should.equal(1938.84);
  });

  it('should compute CAGR', function() {
    // begining value, Ending value, and number of periods
    cal.CAGR(10000, 19500, 3 ).should.equal(24.93);
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
    // fractional rate, number of payments, loan principal
    Number(cal.PMT(0.02,36,-1000000).toFixed(4)).should.equal(39232.8526)
  });
    //investment return, inflation rate
  it('should compute IAR', function() {
    cal.IAR(0.08, 0.03).should.equal(4.854368932038833);
  });

  it('should compute XIRR', function() {
    cal.XIRR([-1000, -100, 1200],[new Date(2015, 11, 1 ), new Date(2016, 7, 1 ), new Date(2016, 7, 19 )],0 ).should.equal(14.11);
  });
});
