const sequelize = require("../config/sequelize");

const RolePermission = sequelize.define(
  "RolePermission",
  {},
  {
    tableName: "role_permissions", // Explicitly specifying the table name
  },
);

module.exports = RolePermission;
