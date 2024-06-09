// Import user model or service if you're separating business logic from controller
// const UserModel = require('../models/userModel');
const logger = require("../tools/logger"); // Ensure the logger is properly imported
const userService = require("../service/userService");

const register = async (req, res, next) => {
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
    if (result.is2fa) {
      res.json(result);
    } else {
      res.json({
        is2fa: result.is2fa,
        userId: result.userId,
        token: result.token,
      });
    }
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    res.status(401).json({ message: error.message });
  }
};

const setup_2fa = async (req, res) => {
  try {
    const response = await userService.setup_2fa(req.body);
    logger.info(`2fa setup request for userId: ${req.body.email} completed`);
    res.status(201).json({
      qrCode: response,
    });
  } catch (error) {
    logger.error(
      `2fa setup request for userId: ${req.body.email} - ${error.message}`,
    );

    res.status(400).json({ error: error.message });
  }
};

const verify2fa = async (req, res) => {
  try {
    const { userId, token } = req.body;
    const result = await userService.verify2FACode(userId, token);
    res.status(201).json({
      result,
    });
  } catch (error) {
    logger.error(
      `Login failed for userId: ${req.body.email} - ${error.message}`,
    );

    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  setup_2fa,
  verify2fa,
};
