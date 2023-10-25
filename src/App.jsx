import React, { useEffect, useState } from 'react';
import './App.css';
import RevenueChart from './components/RevenueChart';
import { generateSampleTransactions } from './Models/Functions';
import IncomeStability from './components/IncomeStability';

function App() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function makeFakeTransactions() {
      // Make 1000 Fake Transactions
      setIsLoading(true);
      const txns = await generateSampleTransactions(1000, 450);
      setAllTransactions(txns);
      setIsLoading(false);
    }
    makeFakeTransactions();
  }, []);

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

    </div>
  );
}

export default App;
