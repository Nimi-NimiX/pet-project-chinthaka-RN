const Transaction = require('../models/transaction');

const transaction = {
  async save(transaction) {
    try {
      return await transaction.save();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async findByPk(id) {
    try {
      const data = await Transaction.findByPk(id);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async update(id, transaction) {
    try {
      const transactionToUpdate = await this.findByPk(id);
      Object.assign(transactionToUpdate, transaction);
      await this.save(transactionToUpdate);
      return transactionToUpdate;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async create(transaction) {
    try {
      const newTransaction = new Transaction(transaction);
      await this.save(newTransaction);
      return newTransaction;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async delete(id) {
    try {
      const transactionToDelete = await this.findByPk(id);
      if (transactionToDelete) {
        await transactionToDelete.destroy();
        return transactionToDelete;
      }
      return null;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = transaction;
