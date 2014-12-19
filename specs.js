var assert = chai.assert;
var expect = chai.expect;

var cal = new Finance();

describe('FinanceJS', function() {

  it('should compute PV', function() {
    assert.equal(cal.PV(5, 100), 95.24);
  });

  it('should compute FV', function() {
    assert.equal(cal.FV(0.5, 1000, 12), 1061.68);
  });

  it('should compute NPV', function() {
    assert.equal(cal.NPV(10, -500000, 200000, 300000, 200000), 80015.03);
  });

  it('should compute IRR', function() {
    var irr = cal.IRR(-123400, 36200, 54800, 48100);
    expect(irr).to.be.within(5.90, 6.00); // should be 5.96
  });
  
  it('should compute PP for even cash flows', function() {
    assert.equal(cal.PP(0, 105, 25), 4.2);
  });

  it('should compute PP for uneven cash flows', function() {
    var pp = cal.PP(5, -50, 10, 13, 16, 19, 22);
    expect(pp).to.be.within(3.3, 3.6);
  });

  it('should compute ROI', function() {
    assert.equal(cal.ROI(55000, 60000), 9.09);
  });

  it('should compute MP (Monthly Payment / Amortization) for inputs in years', function() {
    // 0 if inputs are in years
    assert.equal(cal.MP(20000, 7.5, 5, 0), 400.76);
  });

  it('should compute MP (Monthly Payment / Amortization) for inputs in months', function() {
    // 1 if inputs are in months
    assert.equal(cal.MP(20000, 7.5, 60, 1), 400.76);
  });



});
