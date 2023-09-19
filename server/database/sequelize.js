const Sequalize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequalize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

/**
 * remove the logging of sequelize
 */
sequelize.options.logging = false;

module.exports = sequelize;
