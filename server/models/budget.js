const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/sequelize');

class Budget extends Model {
  static associate(models) {
    this.hasMany(models.Transaction, {
      foreignKey: 'budgetId',
      sourceKey: 'id',
    });
  }
}

Budget.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estimatedBudget: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    income: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    expense: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    balance: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'budget',
    underscored: true,
  }
);

module.exports = Budget;
