const { User, Role, UserRole } = require("../models/index"); // Sequelize model
const logger = require("../tools/logger");

const createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    logger.error(`Error creating user in DAL: ${error.message}`);
    throw error;
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    logger.error(`Database error in findUserByEmail: ${error.message}`);
    throw error;
  }
};

module.exports = {
  createUser,
  findUserByEmail,
};
