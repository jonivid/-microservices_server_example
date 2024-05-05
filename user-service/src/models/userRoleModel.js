const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const UserRole = sequelize.define(
  "UserRole",
  {},
  {
    tableName: "user_roles", // Explicitly specifying the table name
  },
);

module.exports = UserRole;
