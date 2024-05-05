const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Permission = sequelize.define("Permission", {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

module.exports =  Permission;
