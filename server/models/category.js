const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/sequelize');
const CategoryTypes = require('../constants/types');

class Category extends Model {
  static associate(models) {
    this.hasMany(models.Transaction, {
      foreignKey: 'categoryId',
      sourceKey: 'id',
    });
  }
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryType: {
      type: DataTypes.ENUM,
      values: Object.values(CategoryTypes),
      defaultValue: CategoryTypes.EXPENSE,
    },
  },
  {
    sequelize,
    tableName: 'category',
    underscored: true,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Category;
