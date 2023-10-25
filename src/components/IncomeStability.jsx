/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  currencyFormat, calculateMean,
  calculateVariance, netDifference,
  calculateSD, aggregateMonthlyExpenses,
  aggregateMonthlyRevenue, calculateMedian
} from '../utilities/Functions';

export default function IncomeStability ({ allTransactions }) {
  const [revenue, setRevenue] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mean, setMean] = useState(0);
  const [median, setMedian] = useState(0);
  const [variance, setVariance] = useState(0);
  const [standardDev, setStandardDev] = useState(0);

  useEffect(() => {
    async function prepareRevenueData () {
      setIsLoading(true);
      const aggregate = await aggregateMonthlyRevenue(allTransactions);
      setRevenue(aggregate);
      setIsLoading(false);
    }
    prepareRevenueData();
  }, [allTransactions]);

  useEffect(() => {
    async function prepareExpensesData () {
      setIsLoading(true);
      const aggregate = await aggregateMonthlyExpenses(allTransactions);
      setExpenses(aggregate);
      setIsLoading(false);
    }
    prepareExpensesData();
  }, [allTransactions]);

  useEffect(() => {
    async function setMetrics () {
      const netVals = netDifference(
        revenue.flatMap((item) => item.value),
        expenses.flatMap((item) => item.value)
      );
      setMean(calculateMean(netVals));
      setMedian(calculateMedian(netVals));
      setStandardDev(calculateSD(netVals));
      setVariance(calculateVariance(netVals));
    }
    setMetrics();
  }, [expenses, revenue]);

  if (isLoading) {
    return (<h1>Loading..</h1>);
  }

  return (
    <div className="chart-container">
      <h1>How steady is my cash flow? </h1>
      <h2>Average Monthly Profit Margin</h2>
      {mean < 0 ? <p className = "negative-value"><b>{currencyFormat(mean)}</b></p> : <p className = "positive-value" ><b>{currencyFormat(mean)}</b></p> }

      <h2>Variance of Profit / Loss</h2>
      <p><b>{variance.toFixed(2)}</b></p>

      <h2>Standard Deviation of Profit / Loss</h2>
      <p><b>±{currencyFormat(standardDev)}</b></p>

      <h2>Median Profit / Loss</h2>
      {median < 0 ? <p className = "negative-value"><b>{currencyFormat(median)}</b></p> : <p className = "positive-value" ><b>{currencyFormat(median)}</b></p> }

      <p><i>What does this mean?</i></p>
      <p>
        A business in rapid growth or decline may have a higher variance.
        Variance tells you the degree of spread in your businesses performance.
        A larger the variance signals less predictability in your business profits.
      </p>
      <p>
        Assuming a steady market and no major changes to your business,
        and based solely upon previous performance, you should expect your monthly profit margin
        to be between:
      </p>
      <p>
        <b>{currencyFormat(mean - standardDev)}</b>
        {' '}
        {' '}
        and
        {' '}
        {' '}
        <b>{currencyFormat(mean + standardDev)}</b>
      </p>
      <p> approximately ~70% of the time. </p>
      <p> On a rough month, expect a range between</p>
      <p>
        <b>
          {' '}
          {currencyFormat(mean - 2 * standardDev)}
          {' '}
        </b>
        {' '}
        and
        {' '}
        <b>
          {' '}
          {currencyFormat(mean - standardDev)}
          {' '}
        </b>
      </p>
      <p> And on a great month expect a range between</p>
      <p>
        <b>{currencyFormat(mean + standardDev)}</b>
        {' '}
        and
        {' '}
        <b>{currencyFormat(mean + 2 * standardDev)}</b>
      </p>
      <p> either of these occurring around ~15% of the time.  </p>

    </div>
  );
}
