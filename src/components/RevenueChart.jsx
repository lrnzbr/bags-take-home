import React, { useEffect, useState, useRef } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import {
  aggregateMonthlyRevenue, aggregateMonthlyExpenses, getMonthYearName, netDifference,
} from '../Models/Functions';

ChartJS.register(zoomPlugin);

export default function RevenueChart({ allTransactions }) {
  const [revenue, setRevenue] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chartRef = useRef(null);

  const handleResetZoom = () => {
    if (chartRef && chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  useEffect(() => {
    async function prepareRevenueData() {
      setIsLoading(true);
      const aggregate = await aggregateMonthlyRevenue(allTransactions);
      setRevenue(aggregate);
      setIsLoading(false);
    }
    prepareRevenueData();
  }, [allTransactions]);

  useEffect(() => {
    async function prepareExpensesData() {
      setIsLoading(true);
      const aggregate = await aggregateMonthlyExpenses(allTransactions);
      setExpenses(aggregate);
      setIsLoading(false);
    }
    prepareExpensesData();
  }, [allTransactions]);

  if (isLoading) {
    return (<h1>Loading..</h1>);
  }

  return (
    <div className="chart-container">
      <h1>Revenue vs. Expenses </h1>
      <button className="reset-button" onClick={handleResetZoom}>Reset Zoom</button>
      <Chart
        ref={chartRef}
        className="chart-inner-container"
        data={{
          labels: revenue.flatMap((item) => getMonthYearName(item.date)),
          datasets: [
            {
              type: 'line',
              label: 'Income',
              data: revenue.flatMap((item) => item.value),
              fill: false,
              borderWidth: 2,
              backgroundColor: 'green',
              borderColor: 'green',
              responsive: true,
            },
            {
              type: 'line',
              label: 'Expenses',
              data: expenses.flatMap((item) => item.value),
              fill: false,
              borderWidth: 2,
              backgroundColor: 'red',
              borderColor: 'red',
              responsive: true,
            },
            {
              type: 'bar',
              label: 'Net Profit/Loss',
              // y-axis data plotting values
              data: netDifference(
                revenue.flatMap((item) => item.value),
                expenses.flatMap((item) => item.value),
              ),
              fill: false,
              borderWidth: 2,
              backgroundColor: 'blue',
              borderColor: 'blue',
              responsive: true,
            },
          ],
        }}
        options={{
          plugins: {
            zoom: {
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'x',
              },
            },
          },
        }}
      />

    </div>
  );
}
