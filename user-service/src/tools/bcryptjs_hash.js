const bcrypt = require("bcryptjs");
const logger = require("../tools/logger");

const hashPassword = async (password) => {
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password.toString(), salt);
    logger.debug("Password hashed successfully");
    return hashedPassword;
  } catch (error) {
    logger.error("Error hashing password:", error);
  }
};

module.exports = { hashPassword };
