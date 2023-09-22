import React, { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import * as constants from '../constants';

function useStore() {
  const [budget, setBudget] = useState({});
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const budgetId = `${month}${year}`;
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // recalculate the budget when transactions change
  useEffect(() => {
    const budgetCopy = { ...budget };
    const transactionsCopy = [...transactions];

    let totalIncome = 0;
    let totalExpense = 0;

    for (let transaction of transactionsCopy) {
      if (transaction.type === constants.types.INCOME) {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }
    }

    budgetCopy.income = totalIncome;
    budgetCopy.expense = totalExpense;
    budgetCopy.balance = totalIncome - totalExpense;

    setBudget(budgetCopy);
  }, [transactions]);

  function addTransaction(newTransaction) {
    const transactionsCopy = [...transactions];
    transactionsCopy.push(newTransaction);
    setTransactions(transactionsCopy);
  }

  function deleteTransaction(id) {
    const transactionsCopy = [...transactions];
    const transactionIndex = transactionsCopy.findIndex(
      (transaction) => transaction.id === id
    );
    transactionsCopy.splice(transactionIndex, 1);
    setTransactions(transactionsCopy);
  }

  function updateTransaction(updatedTransaction) {
    const transactionsCopy = [...transactions];
    const transactionIndex = transactionsCopy.findIndex(
      (transaction) => transaction.id === updatedTransaction.id
    );
    transactionsCopy[transactionIndex].amount = Number(
      updatedTransaction.amount
    );
    transactionsCopy[transactionIndex].remarks = updatedTransaction.remarks;
    transactionsCopy[transactionIndex].categoryId = Number(
      updatedTransaction.categoryId
    );

    setTransactions(transactionsCopy);
  }

  return {
    month,
    setMonth,
    year,
    setYear,
    budgetId,
    budget,
    setBudget,
    categories,
    setCategories,
    transactions,
    setTransactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
  };
}

export default createContainer(useStore);
