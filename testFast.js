var Finance = require('./finance.js')

var finance = new Finance();

for (var i = 0; i < 50000; i++) {
  finance.IRR(-500000, 200000, 300000, 200000)
}

console.log(finance.IRR(-500000, 200000, 300000, 200000))
