var assert = chai.assert;

describe('FinanceJS', function() {

  it('should compute NPV', function() {
    assert.equal($$NPV(10, -500000, 200000, 300000, 200000), 80015.03);
  });

});
