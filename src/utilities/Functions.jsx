import { Merchant, Transaction } from '../models/Model';

const sampleMerchants = [
  new Merchant(100, 'Trader Joe\'s'),
  new Merchant(101, 'Walmart'),
  new Merchant(102, 'Office Max'),
  new Merchant(103, 'Home Depot'),
  new Merchant(104, 'Kinkos')
];

function randomDate (start, end, startHour, endHour) {
  const date = new Date(+start + Math.random() * (end - start));
  const hour = startHour + Math.random() * (endHour - startHour);
  date.setHours(hour);
  return date;
}

async function generateTransactions (numberOfTransactions, minTxnAmt, maxTxnAmt, startDate, endDate) {
  const output = [];
  for (let i = 0; i < numberOfTransactions; i += 1) {
    const expenseAmount = parseFloat((Math.random() * (maxTxnAmt - minTxnAmt) + minTxnAmt).toFixed(2));
    const merchant = sampleMerchants[Math.floor(Math.random() * sampleMerchants.length)];
    const txnTimestamp = randomDate(startDate, endDate, 0, 23);
    const newTransaction = new Transaction(i + 200, merchant, expenseAmount, txnTimestamp);
    output.push(newTransaction);
  }

  return output;
}

export async function generateSampleTransactions (numberOfRevenueTransactions, numberOfExpenseTransactions, minRevenueTxnAmt, minExpensesTxnAmt, maxRevenueTxnAmt, maxExpensesTxnAmt, revenueStartDate, expensesStartDate, revenueEndDate, expensesEndDate) {
  const incomeTransactions = await generateTransactions(numberOfRevenueTransactions, minRevenueTxnAmt, maxRevenueTxnAmt, revenueStartDate, revenueEndDate);
  const expenseTransactions = await generateTransactions(numberOfExpenseTransactions, minExpensesTxnAmt, maxExpensesTxnAmt, expensesStartDate, expensesEndDate);
  return incomeTransactions.concat(expenseTransactions)
    .sort((item1, item2) => item1.timestamp - item2.timestamp);
}

export async function aggregateMonthlyRevenue (transactions) {
  const outputDict = {};
  for (const i in transactions) {
    const txn = transactions[i];
    if (txn.price > 0.00) {
      const month = txn.timestamp.getMonth();
      const year = txn.timestamp.getYear() + 1900;
      const key = `${month}-${year}`;
      if (key in outputDict) {
        outputDict[key].push(txn);
      } else {
        outputDict[key] = [txn];
      }
    }
  }

  const outputArray = [];
  for (const i in outputDict) {
    const month = outputDict[i];
    const startingTotal = 0;
    const total = month.reduce((accumulator, currentValue) => accumulator +
     currentValue.price, startingTotal);

    const dataPoint = {
      date: month[0].timestamp,
      value: total
    };
    outputArray.push(dataPoint);
  }
  console.log('Aggregates: ', outputArray);
  return outputArray.sort((item1, item2) => item1.timestamp - item2.timestamp);
}

export async function aggregateMonthlyExpenses (transactions) {
  const outputDict = {};
  for (const i in transactions) {
    const txn = transactions[i];
    if (txn.price < 0.00) {
      const month = txn.timestamp.getMonth();
      const year = txn.timestamp.getYear() + 1900;
      const key = `${month}-${year}`;
      if (key in outputDict) {
        outputDict[key].push(txn);
      } else {
        outputDict[key] = [txn];
      }
    }
  }

  const outputArray = [];
  for (const i in outputDict) {
    const month = outputDict[i];
    const startingTotal = 0;
    const total = month.reduce((accumulator, currentValue) => accumulator +
     currentValue.price, startingTotal);

    const dataPoint = {
      date: month[0].timestamp,
      value: total
    };
    outputArray.push(dataPoint);
  }

  return outputArray.sort((item1, item2) => item1.timestamp - item2.timestamp);
}

export function getMonthYearName (timestamp) {
  const formatter = new Intl.DateTimeFormat('en', { month: 'short' });
  const month = formatter.format(timestamp);
  const year = timestamp.getFullYear();
  return `${month} ${year}`;
}

export const netDifference = (arr1, arr2) => {
  const res = [];
  for (let i = 0; i < arr1.length; i += 1) {
    const el = (arr1[i] || 0) + (arr2[i] || 0);
    res[i] = el;
  }
  return res;
};

// Calculate the average of all the numbers
export const calculateMean = (values) => {
  const mean = (values.reduce((sum, current) => sum + current, 0)) / values.length;
  return mean;
};

// Calculate variance
export const calculateVariance = (values) => {
  const average = calculateMean(values);
  const squareDiffs = values.map((value) => {
    const diff = value - average;
    return diff * diff;
  });
  const variance = calculateMean(squareDiffs);
  return variance;
};

// Calculate stand deviation
export const calculateSD = (values) => {
  const variance = calculateVariance(values);
  return Math.sqrt(variance);
};

export function calculateMedian (values) {
  if (values.length === 0) {
    return 0;
  }

  values = [...values].sort((a, b) => a - b);

  const half = Math.floor(values.length / 2);

  return (values.length % 2
    ? values[half]
    : (values[half - 1] + values[half]) / 2
  );
}

export function currencyFormat (num) {
  if (num == null) {
    return '$0.00';
  }
  return `$${num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} USD`;
}
