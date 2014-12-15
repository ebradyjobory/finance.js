var assert = chai.assert;

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


});
