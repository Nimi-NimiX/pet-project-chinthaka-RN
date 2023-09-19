const Budget = require('../models/budget');

const budgetRepository = {
  // save a budget
  save: async (budget) => {
    try {
      await budget.save();
    } catch (error) {
      console.log(error);
    }
  },

  // Get a budget by id
  getById: async (id) => {
    try {
      const budget = await Budget.findByPk(id, {
        include: [{ all: true, nested: true }],
      });
      return budget;
    } catch (error) {}
  },

  // Create a new budget
  create: async (budget) => {
    try {
      const newBudget = new Budget(budget);
      await newBudget.save();
      return newBudget;
    } catch (error) {
      console.log(error);
    }
  },

  // Update a budget by id
  updateById: async (id, estimatedBudget) => {
    try {
      const budget = await Budget.findByPk(id);
      budget.estimatedBudget = estimatedBudget;
      await budget.save();
      return budget;
    } catch (error) {
      console.log(error);
    }
  },

  // Delete a budget by id
  deleteById: async (id) => {
    try {
      const budget = await Budget.findByPk(id);
      await budget.destroy();
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = budgetRepository;
