const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/sequelize');
const TransactionTypes = require('../constants/types');
const TransactionService = require('../services/transaction');

class Transaction extends Model {
  static associate(models) {
    this.belongsTo(models.Budget, {
      foreignKey: 'budgetId',
      targetKey: 'id',
    });

    this.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      targetKey: 'id',
    });
  }
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: Object.values(TransactionTypes),
      defaultValue: TransactionTypes.EXPENSE,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'transaction',
    underscored: true,
    hooks: {
      afterCreate: async (transaction) => {
        await TransactionService.create(transaction);
      },
      afterUpdate: async (transaction) => {
        await TransactionService.update(transaction);
      },
      afterDestroy: async (transaction) => {
        await TransactionService.delete(transaction);
      },
    },
  }
);

module.exports = Transaction;
