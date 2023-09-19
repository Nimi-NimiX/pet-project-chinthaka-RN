const Budget = require('../repositories/budget');
const TransactionTypes = require('../constants/types');

// these hooks will calculate expenses, income, and balance
const TransactionService = {
  create: async (transaction) => {
    let budget = await Budget.getById(transaction.budgetId);

    if (transaction.type === TransactionTypes.INCOME) {
      budget.income = budget.income + transaction.amount;
    } else if (transaction.type === TransactionTypes.EXPENSE) {
      budget.expense = budget.expense + transaction.amount;
    }

    budget.balance = budget.income - budget.expense;
    await Budget.save(budget);
  },

  update: async (transaction) => {
    let budget = await Budget.getById(transaction.budgetId);
    const valueDiff =
      transaction._previousDataValues.amount - transaction.amount;

    if (transaction.type === TransactionTypes.INCOME) {
      budget.income = budget.income - valueDiff;
    } else if (transaction.type === TransactionTypes.EXPENSE) {
      budget.expense = budget.expense - valueDiff;
    }

    budget.balance = budget.income - budget.expense;
    await Budget.save(budget);
  },

  delete: async (transaction) => {
    let budget = await Budget.getById(transaction.budgetId);

    if (transaction.type === TransactionTypes.INCOME) {
      budget.income = budget.income - transaction.amount;
    } else if (transaction.type === TransactionTypes.EXPENSE) {
      budget.expense = budget.expense - transaction.amount;
    }

    budget.balance = budget.income - budget.expense;
    await Budget.save(budget);
  },
};

module.exports = TransactionService;
