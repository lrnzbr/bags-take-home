/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function AdjustInputs (props) {
  const [revenueQty, setRevenueQty] = useState(100);
  const [minRevenueAmount, setMinRevenueAmount] = useState(50);
  const [maxRevenueAmount, setMaxRevenueAmount] = useState(500);
  const [revenueStartDate, setRevenueStartDate] = useState(new Date('2020-1-1'));
  const [revenueEndDate, setRevenueEndDate] = useState(new Date());

  const [expenseQty, setExpenseQty] = useState(100);
  const [minExpenseAmount, setMinExpenseAmount] = useState(-50);
  const [maxExpenseAmount, setMaxExpenseAmount] = useState(-500);
  const [expensesStartDate, setExpensesStartDate] = useState(new Date('2020-1-1'));
  const [expensesEndDate, setExpensesEndDate] = useState(new Date());

  function handleGenerateTransactions () {
    if (minExpenseAmount < maxExpenseAmount) {
      toast.error('Ensure max expense amount is more negative than min expense amount');
      return;
    }
    if (minExpenseAmount > 0 || maxExpenseAmount > 0 || minRevenueAmount < 0 || maxRevenueAmount < 0) {
      toast.error('Ensure expense amounts are less than zero and revenue amounts are greather than zero.');
      return;
    }

    if (minExpenseAmount > 1000000 || maxExpenseAmount > 10000000 || minRevenueAmount > 1000000 || maxRevenueAmount > 1000000) {
      toast.error('The maximum transaction amount is $1 million.');
      return;
    }

    if (revenueQty > 1000000 || expenseQty > 1000000) {
      toast.error('No more than a million transactions allowed.');
      return;
    }
    if (revenueQty < 0 || expenseQty < 0) {
      toast.error('Only positive values allowed for number of transations.');
      return;
    }
    if (new Date(revenueStartDate) > new Date(revenueEndDate) || new Date(expensesStartDate) > new Date(expensesEndDate)) {
      toast.error('Please make sure end dates are after start dates.');
      return;
    }

    props.regenerateTransations(revenueQty, expenseQty, minRevenueAmount, minExpenseAmount, maxRevenueAmount, maxExpenseAmount, revenueStartDate, expensesStartDate, revenueEndDate, expensesEndDate);
  }

  return (
    <div className='chart-container'>
      <Toaster/>

      <div >
        <h1>Transaction Generator</h1>
        <form >
          <div className = 'left-container'>
            <h2>Incoming Transactions</h2>
            <div className="form-cell">
              <label>
                {' '}
            Total Number of Transactions
                <br />
                <input
                  type="number"
                  value={revenueQty}
                  onChange={(e) => setRevenueQty(e.target.value)}
                />
                <br />
              </label>
            </div>

            <div className="form-cell">
              <label>
                {' '}
            Minimum Revenue Amount:
                <br />
                <input
                  type="number"
                  value={minRevenueAmount}
                  onChange={(e) => setMinRevenueAmount(e.target.value)}
                />
                <br />

              </label>
            </div>

            <div className="form-cell">

              <label>
            Maximum Revenue Amount:
                <br />
                <input
                  type="number"
                  value={maxRevenueAmount}
                  onChange={(e) => setMaxRevenueAmount(e.target.value)}
                />
                <br />

              </label>
            </div>

            <label>
          Start Date:
              <br />
              <input
                type="date"
                value={revenueStartDate}
                onChange={(e) => setRevenueStartDate(e.target.value)}
              />
              <br />
            </label>
            <label>
          End Date :
              <br />
              <input
                type="date"
                value={revenueEndDate}
                onChange={(e) => setRevenueEndDate(e.target.value)}
              />
              <br />
            </label>
          </div>
          <div className = 'right-container'>
            <h2>Outgoing Transactions</h2>
            <div className="form-cell">

              <label>
            Total Number of Transactions:
                <br />
                <input
                  type="number"
                  value={expenseQty}
                  onChange={(e) => setExpenseQty(e.target.value)}
                />
                <br />

              </label>
            </div>

            <div className="form-cell">

              <label>
            Minimum Expense Amount:
                <br />
                <input
                  type="number"
                  value={minExpenseAmount}
                  onChange={(e) => setMinExpenseAmount(e.target.value)}
                />
                <br />

              </label>
            </div>
            <div className="form-cell">

              <label>
            Maximum Expense Amount:
                <br />
                <input
                  type="number"
                  value={maxExpenseAmount}
                  onChange={(e) => setMaxExpenseAmount(e.target.value)}
                />
                <br />

              </label>
            </div>
            <label>
        Start Date:
              <br />
              <input
                type="date"
                value={expensesStartDate}
                onChange={(e) => setExpensesStartDate(e.target.value)}
              />
              <br />
            </label>
            <h3 />
            <label>
          End Date :
              <br />
              <input
                type="date"
                value={expensesEndDate}
                onChange={(e) => setExpensesEndDate(e.target.value)}
              />
              <br />
            </label>
          </div>
        </form>
        <div className='button-container'>
          <button onClick={handleGenerateTransactions}>
        Generate Random Transactions
          </button>
        </div>
      </div>
    </div>

  );
}
