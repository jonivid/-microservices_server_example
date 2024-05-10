const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const TwoFAToken = sequelize.define(
  "TwoFAToken",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "TwoFATokens",
  },
);

// Define association with the User model
TwoFAToken.associate = function (models) {
  TwoFAToken.belongsTo(models.User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

module.exports = TwoFAToken;
