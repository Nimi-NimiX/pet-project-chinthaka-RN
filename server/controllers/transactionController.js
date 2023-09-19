const Budget = require('../repositories/budget');
const Transaction = require('../repositories/transaction');
const TransactionTypes = require('../constants/types');

const transactionController = {
  getTransactions: async (req, res) => {
    try {
      const { budgetId } = req.body;

      const data = await Transaction.findAllByBudgetId(budgetId);

      return res.status(200).json({ transactions: data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  addTransaction: async (req, res) => {
    try {
      const { budgetId, amount, remarks, type, categoryId, date } = req.body;

      const budget = await Budget.getById(budgetId);

      /**
       * If budget is not found, create a new budget with the given id
       * This is to make sure that the budget exists before adding a transaction
       */
      if (!budget) {
        const year = budgetId.substring(budgetId.length - 4);
        const month = budgetId.substring(0, budgetId.length - 4);

        await Budget.create({ id: budgetId, year, month, estimatedBudget: 0 });
      }

      const data = await Transaction.create({
        budgetId,
        amount,
        remarks,
        type: type === 'I' ? TransactionTypes.INCOME : TransactionTypes.EXPENSE,
        categoryId,
        date,
      });

      return res.status(201).json({ transaction: data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  updateTransaction: async (req, res) => {
    try {
      const { id } = req.params;
      const { amount, remarks, categoryId } = req.body;

      const data = await Transaction.update(id, {
        amount,
        remarks,
        categoryId,
      });

      return res.status(200).json({ transaction: data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  deleteTransaction: async (req, res) => {
    try {
      const { id } = req.params;

      const data = await Transaction.delete(id);

      if (!data) {
        return res.status(404).json({ message: 'Transaction not found' });
      }

      return res.status(200).json({ transaction: data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = transactionController;
