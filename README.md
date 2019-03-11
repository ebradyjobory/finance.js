[![Build Status](https://travis-ci.org/VanTudor/accurate-finance.js.svg?branch=master)](https://travis-ci.org/VanTudor/accurate-finance.js)

Finance.js
==========

<div class="wrappper">

 <h2 id="intro">Introduction</h2>

 <p>accurate-finance.js makes it easy to incorporate common financial calculations into your application. It is a fork of ebradyjobory's <a href="https://github.com/ebradyjobory/finance.js">finance.js</a> with every function rewritten to use <a href="https://github.com/MikeMcl/decimal.js/">Decimal.js</a>.</p>

Note: XIRR doesn't work yet.
 <p>This project is <a href="https://github.com/VanTudor/accurate-finance.js">hosted on GitHub</a>. You can report bugs and discuss features on the <a href="https://github.com/VanTudor/accurate-finance.js/issues">GitHub issues page</a>. Finance.js is available for use under the <a href="https://github.com/VanTudor/accurate-finance.js/blob/master/LICENSE.md">MIT software license</a>.

 <h2 id="start">Getting Started</h2>

 <!-- <pre><code>npm install accurate-financejs --save</code></pre> -->

 <!-- <p><strong>or</strong></p> -->

 <ul>
   <li>Download or fork the repository from GitHub.</li>
   <li>Extract the file accurate-finance.js from the project and include it in your application on the client side.</li>
 </ul>

 <h2 id="example-usage">Example Usage</h2>

 	var Finance = require('financejs');
 	var finance = new Finance();
 	// To calculate Amortization
 	finance.AM(20000, 7.5, 5, 0);
 	// => 400.76

 ### Typescript

	import { Finance } from 'financejs'
	let finance = new Finance();
	// To calculate Amortization
	finance.AM(20000, 7.5, 5, 0);
	// => 400.76


 <h2 id="tests">Tests</h2>

 <pre><code>npm test</code></pre>


<h2 id="tests">Available Methods</h2>

 <h3 id="Amortization">Amortization<br>

 <code class="highlight">finance.AM(principal, rate, total number of payments, [type]);</code></h3>

 <p>Amortization is the paying off of debt with a fixed repayment schedule in regular installments over a period of time.<sup><a href="http://www.investopedia.com/terms/a/amortization.asp" target="_blank">1</a></sup></p>

 <p>For total number of payments which are entered as years, <code>[type]</code> takes a <code>0</code>, whereas for months <code>[type]</code> takes a <code>1</code>.</p>

 <pre><code>#Total Number of Payments Type = Years
 // e.g., If principal is $20,000, rate is 7.5%, total number of payments is 5, and payment type is 0 (years), monthly payment is $400.76.

 finance.AM(20000, 7.5, 5, 0);
 => 400.76

 #Total Number of Payments Type = Months
 // e.g.,If principal is $20,000, rate is 7.5%, total number of payments is 60, and payment type is 1 (months), monthly payment is $400.76.

 finance.AM(20000, 7.5, 60, 1);
 => 400.76</code></pre>

 <h3 id="CAGR">Compound Annual Growth Rate (CAGR)<br>

 <code class="highlight">finance.CAGR(beginning value, ending value, number of periods);</code></h3>

 <p>Compound Annual Growth Rate (CAGR) is the year-over-year growth rate of an investment over a specified period of time.<sup><a href="http://www.investopedia.com/terms/c/cagr.asp" target="_blank">2</a></sup></p>

 <pre><code>// e.g., If the beginning value is $10,000, the ending value is $19,500, and the number of periods is 3, the CAGR is 24.93%.

 finance.CAGR(10000, 19500, 3);
 => 24.93</code></pre>

 <h3 id="CI">Compound Interest (CI)<br>

 <code class="highlight">finance.CI(rate, compoundings per period, principal, number of periods);</code></h3>

 <p>Compound Interest is the interest calculated on the initial principal and also on the accumulated interest of previous periods of a deposit or loan.<sup><a href="http://www.investopedia.com/terms/c/compoundinterest.asp" target="_blank">3</a></sup></p>

 <pre><code>// e.g., If rate is 4.3%, the compoundings per period is 4, the principal is $1,500, and the number of periods is 6, the compound interest is $1,938.84.

 finance.CI(4.3, 4, 1500, 6 );
 => 1938.84</code></pre>

 <h3 id="DF">Discount Factor (DF)<br>

 <code class="highlight">finance.DF(rate, number of periods);</code></h3>

 <p>The Discount Factor (DF) is the factor by which a future cash flow must be multiplied in order to obtain the present value.<sup><a href="http://en.wikipedia.org/wiki/Discounting#Discount_factor" target="_blank">4</a></sup></p>

 <pre><code>// e.g., If rate is 10% and the number of periods is 6, the result is an array of discount factors: [1, 0.91, 0.827, 0.752, 0.684].

 finance.DF(10, 6);
 => [1, 0.91, 0.827, 0.752, 0.684]</code></pre>

 <h3 id="FV">Future Value (FV)<br>

 <code class="highlight">finance.FV(rate, cash flow, number of periods);</code></h3>

 <p>Future Value (FV) is the value of an asset or cash at a specified date in the future that is equivalent in value to a specified sum today<sup><a href="http://www.investopedia.com/terms/f/futurevalue.asp" target="_blank">5</a></sup></p>

 <pre><code>// e.g., If rate is 0.5%, cash flow is $1,000, and the number of periods is 12, the FV is $1,061.68.

 finance.FV(0.5, 1000, 12);
 => 1061.68</code></pre>

 <h3 id="IRR">Internal Rate of Return (IRR)<br>

 <code class="highlight">finance.IRR(initial investment, [cash flows]);</code></h3>

 <p>Internal Rate of Return (IRR) is the discount rate often used in capital budgeting that makes the net present value of all cash flows from a particular project equal to zero.<sup><a href="http://www.investopedia.com/terms/i/irr.asp" target="_blank">6</a></sup></p>

 <pre><code>// e.g., If initial investment is -$500,000 and the cash flows are $200,000, $300,000, and $200,000, IRR is 18.82%.

 finance.IRR(-500000, 200000, 300000, 200000);
 => 18.82</code></pre>

<h3 id="XIRR">XIRR<br>

 <code class="highlight">finance.XIRR([cash flows], [dates], guess);</code></h3>

 <p>XIRR is used to determine the Internal Rate of Return when the cash flows are at Irregular intervals.<sup><a href="http://www.financialwisdomforum.org/gummy-stuff/xirr.htm" target="_blank">15</a></sup></p>

 <pre><code>// e.g., If the cash flows are -$1,000 on 1st Nov 2015, -$100 on 01 Jul 2016 and $1,200 on 19 Jul 2016, the XIRR is 14.11%.

 finance.XIRR([-1000, -100, 1200],[new Date(2015, 11, 1 ), new Date(2016, 7, 1 ), new Date(2016, 7, 19 )],0 );
 => 14.11</code></pre>

 <h3 id="LR">Leverage Ratio (LR)<br>

 <code class="highlight">finance.LR(total liabilities, total debts, total income);</code></h3>

 <p>Leverage Ratio (LR) is used to calculate the financial leverage of a company or individual to get an idea of the methods of financing or to measure ability to meet financial obligations.<sup><a href="http://www.investopedia.com/terms/l/leverageratio.asp" target="_blank">7</a></sup></p>

 <pre><code>// e.g., If total liabilities are $25, total debts are $10, and total income is $20, the leverage ratio is 1.75.

 finance.LR(25, 10, 20);
 => 1.75</code></pre>

 <h3 id="NPV">Net Present Value (NPV)<br>

 <code class="highlight">finance.NPV(rate, initial investment, [cash flows]);</code></h3>

 <p>Net Present Value (NPV) compares the money received in the future to an amount of money received today, while accounting for time and interest [through the discount rate]. It's based on the principal of time value of money (TVM), which explains how time affects monetary value.<sup><a href="http://www.investopedia.com/articles/fundamental-analysis/09/net-present-value.asp" target="_blank">8</a></sup></p>

 <p><code>[cash flows]</code> takes any number of projected cash flows.</p>

 <pre><code>// e.g., If discount rate is 10%, initial investment is -$1,000, cash flow in year 1 is $200,000, year 2 is $300,000, and year 3 is $200,000, the NPV is $80,015.03.

 finance.NPV(10, -500000, 200000, 300000, 200000);
 => 80015.03</code></pre>

 <h3 id="PP">Payback Period (PP)<br>

 <code class="highlight">finance.PP(number of periods, [cash flows]);</code></h3>

 <p>Payback Period (PP) is the length of time required to recover the cost of an investment.<sup><a href="http://www.investopedia.com/terms/p/paybackperiod.asp" target="_blank">9</a></sup></p>

 <p><code>number of periods</code> takes a <code>0</code> value for even cash flows;<br>for uneven cash flows, <code>number of periods</code> takes any number of projected periods.</p>

 <p><code>[cash flows]</code> takes any number of projected cash flows.</p>

 <pre><code>#Even Cash Flows
 // e.g., Because even cash flows have the same inflow during each period, we set 'number of periods' to '0.' If initial investment is -$105 and the annual cash flow is $25, the payback period is 4.2 years.

 finance.PP(0, -105, 25);
 => 4.2

 #Uneven Cash Flows
 // e.g., If number of periods is 5, initial investment is -$50, and the cash flows are $10, $13, $16, $19, and $22 for each year, the payback period is 3.42 years.

 finance.PP(5, -50, 10, 13, 16, 19, 22);
 => 3.42</code></pre>

 <h3 id="PV">Present Value (PV)<br>

 <code class="highlight">finance.PV(rate, cash flow, number of periods);</code></h3>

 <p>Present Value (PV) is the current worth of a future sum of money or stream of cash flows given a specified rate of return.<sup><a href="http://www.investopedia.com/terms/p/presentvalue.asp" target="_blank">10</a></sup></p>

<p><code>number of periods</code> is optional and defaults to <code>1</code>.</p>

 <pre><code>// e.g., If rate is 5% and cash flow is $100, the PV is $95.24.

 finance.PV(5, 100);
 => 95.24

// e.g., If rate is 5%, cash flow is $100, and number of periods is 5, the PV is $78.35.

 finance.PV(5, 100);
 => 95.24</code></pre>


 <h3 id="PI">Profitability Index (PI)<br>

 <code class="highlight">finance.PI(rate, initial investment, [cash flows]);</code></h3>

 <p>Profitability Index (PI) is an index that attempts to identify the relationship between the costs and benefits of a proposed project through the use of a ratio calculated.<sup><a href="http://www.investopedia.com/terms/p/profitability.asp" target="_blank">11</a></sup></p>

 <p><code>[cash flows]</code> takes any number of projected cash flows.</p>

 <pre><code>// e.g., If rate is 10%, initial investment is -$40,000, cash flows are $18,000, $12,000, $10,000, $9,000, and $6,000, PI is 1.09.

 finance.PI(10, -40000, 18000, 12000, 10000, 9000, 6000);
 => 1.09</code></pre>

 <h3 id="ROI">Return on Investment (ROI)<br>

 <code class="highlight">finance.ROI(initial investment, earnings);</code></h3>

 <p>Return on Investment (ROI) is a simple calculation that tells you the bottom line return of any investment.<sup><a href="http://www.investopedia.com/articles/basics/10/guide-to-calculating-roi.asp" target="_blank">12</a></sup></p>

 <pre><code>// e.g., If initial investment is -$55,000 and the earnings are $60,000, the return on investment is 9.09%.

 finance.ROI(-55000, 60000);
 => 9.09</code></pre>

 <h3 id="R72">Rule of 72 (R72)<br>

 <code class="highlight">finance.R72(rate);</code></h3>

 <p>Rule of 72 (R72) is a rule stating that in order to find the number of years required to double your money at a given interest rate, you divide the compound return into 72.<sup><a href="http://www.investopedia.com/terms/r/ruleof72.asp" target="_blank">13</a></sup></p>

 <pre><code>// e.g., If annual rate is 10%, rule of 72 is 7.2 years.

 finance.R72(10);
 => 7.2</code></pre>

 <h3 id="WACC">Weighted Average Cost of Capital (WACC)<br>

 <code class="highlight">finance.WACC(market value of equity, market value of debt, cost of equity, cost of debt, tax rate);</code></h3>

 <p>Weighted Average Cost of Capital (WACC) is the rate that a company is expected to pay on average to all its security holders to finance its assets.<sup><a href="http://en.wikipedia.org/wiki/Weighted_average_cost_of_capital" target="_blank">14</a></sup></p>

 <pre><code>// e.g., If market value of equity is $600,000, market value of debt is $400,000, cost of equity is 6%, cost of debt is 5%, and tax rate is 35%, WACC is 4.9%.

 finance.WACC(600000, 400000, 6, 5, 35);
 => 4.9</code></pre>

 <h3 id="PMT">Loan Payment Per Period (PMT)<br>

 <code class="highlight">finance.PMT(fractional interest rate, number of payments, principal);</code></h3>

  <p>Payment for a loan based on constant payments and a constant interest rate</p>

 <pre><code>
   finance.PMT(0.02,36,-1000000);
 => 39232.8526</code></pre>

 <h3 id="IAR">Inflation-adjusted Return<br>

 <code class="highlight">finance.IAR(investment Return, inflation Rate);</code></h3>

  <p>Measure the return taking into account the time period's inflation rate</p>

 <pre><code>
   finance.IAR(0.08, 0.03)
 => 4.85</code></pre>

### Contributing

Contributions are welcome to aid in the expansion of the library. In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality, and please lint and test your code.

### To Do

- Expand library with more financial calculations
- Include edge cases in testing, if any


### Contributing

Contributions are welcome to aid in the expansion of the library. In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality, and please lint and test your code.

### To Do

- Expand library with more financial calculations
- Include edge cases in testing, if any
