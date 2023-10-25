import React, { useEffect, useState } from 'react';
import './App.css';
import RevenueChart from './components/RevenueChart';
import { generateSampleTransactions } from './utilities/Functions';
import IncomeStability from './components/IncomeStability';
import AdjustInputs from './components/AdjustInputs';

function App () {
  const [allTransactions, setAllTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function makeFakeTransactions () {
      // Make 1000 Fake Transactions
      setIsLoading(true);
      const txns = await generateSampleTransactions(500, 500, 10.0, -100.00, 400.00, -400.00, new Date('2020-01-01'), new Date('2020-01-01'), new Date(), new Date());
      setAllTransactions(txns);
      setIsLoading(false);
    }
    makeFakeTransactions();
  }, []);

  async function regenerateTransactions (numberOfRevenueTransactions, numberOfExpenseTransactions, minRevenueTxnAmt, minExpensesTxnAmt, maxRevenueTxnAmt, maxExpensesTxnAmt, revenueStartDate, expensesStartDate, revenueEndDate, expensesEndDate) {
    setIsLoading(true);
    const txns = await generateSampleTransactions(numberOfRevenueTransactions, numberOfExpenseTransactions, minRevenueTxnAmt, minExpensesTxnAmt, maxRevenueTxnAmt, maxExpensesTxnAmt, new Date(revenueStartDate), new Date(expensesStartDate), new Date(revenueEndDate), new Date(expensesEndDate));
    setAllTransactions(txns);
    setIsLoading(false);
  }

  if (isLoading === true) {
    return (<h1>Loading..</h1>);
  }
  return (
    <div className="App">
      <div className="header">
        <h1>Fresh Threads Textiles</h1>
        <h2>Business Health Dashboard</h2>
      </div>
      <RevenueChart allTransactions={allTransactions} />
      <IncomeStability allTransactions={allTransactions} />
      <AdjustInputs regenerateTransations = {regenerateTransactions}/>

    </div>
  );
}

export default App;
