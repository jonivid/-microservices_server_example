const { Sequelize } = require("sequelize");

// Creating a new Sequelize instance with database connection details
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql", // This specifies which database you are using
    // logging: console.log, // Enables logging of SQL queries (optional)
    logging: false, // Set logging to false to turn off SQL logging

    pool: {
      // Database connection pool settings
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

module.exports = sequelize;
