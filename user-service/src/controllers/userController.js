// Import user model or service if you're separating business logic from controller
// const UserModel = require('../models/userModel');
const logger = require("../tools/logger"); // Ensure the logger is properly imported
const userService = require("../service/userService");

const register = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    logger.info(`User registration successful for email: ${req.body.email}`);

    res
      .status(201)
      .json({ message: "User registered successfully", userId: user.id });
  } catch (error) {
    logger.error(
      `Registration failed for email: ${req.body.email} - ${error.message}`,
    );

    res.status(500).json({ message: error.message });
  }
};
const login = async (req, res) => {
  try {
    const result = await userService.loginUser(req.body);
    logger.info(`Login successful for user: ${req.body.email}`);

    res.json({ token: result.token });
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
};
