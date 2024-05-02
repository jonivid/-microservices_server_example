const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize"); // Adjust the path as needed to import your Sequelize instance

const Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true
  });


module.exports = Role;
