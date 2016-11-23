

/**
 * @class Finance
 */
export class Finance {
    /**
     * Present Value (PV)
     * The current worth of a future sum of money or stream of cash flows given a specified rate of return
     * @param rate
     * @param cashFlow
     */
    public PV(rate: number, cashFlow: number): number;

    /**
     * Future Value (FV)
     * The value of an asset or cash at a specified date in the future that is equivalent in value to a specified sum today
     * @param rate
     * @param cashFlow
     * @param numOfPeriod
     */
    public FV(rate: number, cashFlow: number, numOfPeriod: number): number;

    /**
     * Net Present Value (NPV)
     * Compares the money received in the future to an amount of money received today, while accounting for time and interest [through the discount rate].
     * It's based on the principal of time value of money (TVM), which explains how time affects monetary value
     * @param rate
     * @param initialInvestment
     * @param cashFlows
     */
    public NPV(rate: number, initialInvestment: number, ...cashFlows: number[]): number;

    /**
     * Internal Rate of Return (IRR)
     * The discount rate often used in capital budgeting that makes the net present value of all cash flows from a particular project equal to zero
     * @param cfs
     * @param cashFlows
     */
    public IRR(cfs: number, ...cashFlows: number[]): number;

    /**
     * Payback Period (PP)
     * The length of time required to recover the cost of an investment
     * @param numOfPeriods
     * @param cashFlows
     */
    public PP(numOfPeriods: number, ...cashFlows: number[]): number;

    /**
     * Return on Investment (ROI)
     * A simple calculation that tells you the bottom line return of any investment
     * @param initialInvestment
     * @param earnings
     */
    public ROI(initialInvestment: number, earnings: number): number;

    /**
     * Amortization (AM)
     * The paying off of debt with a fixed repayment schedule in regular installments over a period of time
     * @param principal
     * @param rate
     * @param period
     * @param yearOrMonth
     * @param payAtBeginning
     */
    public AM(principal: number, rate: number, period: number, yearOrMonth: number, payAtBeginning?: boolean): number;

    /**
     * Profitability Index (PI)
     * An index that attempts to identify the relationship between the costs and benefits of a proposed project through the use of a ratio calculated
     * @param rate
     * @param initialInvestment
     * @param cashFlows
     */
    public PI(rate: number, initialInvestment: number, ...cashFlows: number[]): number;

    /**
     * Discount Factor (DF)
     * The factor by which a future cash flow must be multiplied in order to obtain the present value
     * @param rate
     * @param numOfPeriods
     */
    public DF(rate: number, numOfPeriods: number): number;

    /**
     * Compound Interest (CI)
     * The interest calculated on the initial principal and also on the accumulated interest of previous periods of a deposit or loan
     * @param rate
     * @param numOfCompoundings
     * @param principal
     * @param numOfPeriods
     */
    public CI(rate: number, numOfCompoundings: number, principal: number, numOfPeriods: number): number;

    /**
     * Compound Annual Growth Rate (CAGR)
     * The year-over-year growth rate of an investment over a specified period of time
     * @param beginningValue
     * @param endingValue
     * @param numOfPeriods
     */
    public CAGR(beginningValue: number, endingValue: number, numOfPeriods: number): number;

    /**
     * Leverage Ratio (LR)
     * Used to calculate the financial leverage of a company or individual to get an idea of the methods of financing or to measure ability to meet financial obligations
     * @param totalLiabilities
     * @param totalDebts
     * @param totalIncome
     */
    public LR(totalLiabilities: number, totalDebts: number, totalIncome: number): number;

    /**
     * Rule of 72 (R72)
     * A rule stating that in order to find the number of years required to double your money at a given interest rate, you divide the compound return into 72
     * @param rate
     */
    public R72(rate: number): number;

    /**
     * Weighted Average Cost of Capital (WACC)
     * The rate that a company is expected to pay on average to all its security holders to finance its assets
     * @param marketValueOfEquity
     * @param marketValueOfDebt
     * @param costOfEquity
     * @param costOfDebt
     * @param taxRate
     */
    public WACC(marketValueOfEquity: number, marketValueOfDebt: number, costOfEquity: number, costOfDebt: number, taxRate: number): number;

    /**
     * Loan Payment Per Period (PMT)
     * Payment for a loan based on constant payments and a constant interest rate
     * @param fractionalRate
     * @param numOfPayments
     * @param principal
     */
    public PMT(fractionalRate: number, numOfPayments: number, principal: number): number;

    /**
     * Inflation-adjusted Return (IAR)
     * Measure the return taking into account the time period's inflation rate
     * @param investmentReturn
     * @param inflationRate
     */
    public IAR(investmentReturn: number, inflationRate: number): number;

    /**
     * Seeks the zero point of the function fn(x), accurate to within x \pm 0.01. fn(x) must be decreasing with x.
     * @param fn
     */
    private seekZero(fn: (input: number) => number): number;
}






