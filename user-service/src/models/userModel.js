const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize"); // Adjust the path as needed to import your Sequelize instance

const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    // Other model options go here
    tableName: "users",
    timestamps: true, // Enables createdAt and updatedAt timestamps
  },
);

module.exports = User;
