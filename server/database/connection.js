const sequelize = require('./sequelize');
const fs = require('fs');

/**
 * read all models from models folder
 * and create a model object with all models
 * and associate them if associate function exists in model
 */
const models = {};

fs.readdirSync('models').forEach((file) => {
  const model = require(`../models/${file}`);
  models[model.name] = model;
});

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

const connect = async () => {
  /**
   * authenticate database connection
   * and sync all models
   */
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .then(() => {
      sequelize.sync();
      console.log('All models were synchronized successfully.');
    })
    .catch((error) => {
      console.error('Unable to connect to the database:', error);
    });
};

module.exports = connect;
