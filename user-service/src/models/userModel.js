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
    twoFactorSecret: {
      type: DataTypes.STRING,
      allowNull: true, // It's okay to be NULL initially until 2FA is set up
      defaultValue: null, // Explicitly setting default as null for clarity
    },
    twoFactorEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Explicitly setting default as false
    },
  },
  {
    // Other model options go here
    tableName: "users",
    timestamps: true, // Enables createdAt and updatedAt timestamps
  },
);

module.exports = User;
