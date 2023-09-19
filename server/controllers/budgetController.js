const BudgetRepo = require('../repositories/budget');

const budgetController = {
  getBudget: async (req, res) => {
    try {
      const { id } = req.params;
      const { month, year } = req.body;

      /**
       * Find budget by id and include all transactions and their categories
       */
      const data = await BudgetRepo.getById(id);

      /**
       * If budget is not found, create a new budget with the given id and return it
       * with estimatedBudget = 0
       */
      if (!data) {
        const created = await BudgetRepo.create({
          id,
          month,
          year,
          estimatedBudget: 0,
        });

        return res.status(200).json({
          budget: created,
        });
      }

      return res.status(200).json({ budget: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  setBudget: async (req, res) => {
    try {
      const { id } = req.params;
      const { estimatedBudget } = req.body;

      const updated = await BudgetRepo.updateById(id, estimatedBudget);

      return res.status(200).json({ budget: updated });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = budgetController;
