var assert = chai.assert;
var expect = chai.expect;

var cal = new Finance();

describe('FinanceJS', function() {

  it('should compute PV', function() {
    // 1st argument is rate; the 2nd argument is the cash flow
    assert.equal(cal.PV(5, 100), 95.24);
  });

  it('should compute FV', function() {
    assert.equal(cal.FV(0.5, 1000, 12), 1061.68);
  });

  it('should compute NPV', function() {
    assert.equal(cal.NPV(10, -500000, 200000, 300000, 200000), 80015.03);
  });

  xit('should compute IRR', function() {
    var irr = cal.IRR(-500000, 200000, 300000, 200000);
    expect(irr).to.be.within(18, 19); // should be 18.82
  });
  
  it('should compute PP for even cash flows', function() {
    assert.equal(cal.PP(0, -105, 25), 4.2);
  });

  it('should compute PP for uneven cash flows', function() {
    var pp = cal.PP(5, -50, 10, 13, 16, 19, 22);
    expect(pp).to.be.within(3.3, 3.6);
  });

  it('should compute ROI', function() {
    assert.equal(cal.ROI(-55000, 60000), 9.09);
  });

  it('should compute AM (Amortization) for inputs in years', function() {
    // 0 if inputs are in years
    assert.equal(cal.AM(20000, 7.5, 5, 0), 400.76);
  });

  it('should compute AM (Amortization) for inputs in months', function() {
    // 1 if inputs are in months
    assert.equal(cal.AM(20000, 7.5, 60, 1), 400.76);
  });

  it('should compute PI', function() {
    // rate, initial investment, and cash flows
    assert.equal(cal.PI(10, -40000, 18000, 12000, 10000, 9000, 6000), 1.09);
  });

  xit('should compute DF', function() {
    // rate and number of periods
    assert.equal(cal.DF(10, 6), [ 1, 0.91, 0.827, 0.752, 0.684]);
  });

  it('should compute CI', function() {
    // rate, compoundings per period, principle , and number of periods
    assert.equal(cal.CI(4.3, 4, 1500, 6 ), 1938.84);
  });

});
