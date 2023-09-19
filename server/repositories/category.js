const Category = require('../models/category');

const category = {
  async getAll() {
    try {
      return await Category.findAll();
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = category;
