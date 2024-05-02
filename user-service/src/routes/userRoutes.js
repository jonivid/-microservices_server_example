const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const logger = require("../tools/logger");



// Route to create a new user
router.post(
  "/register",
  (req, res, next) => {
    logger.info(`Received register request with email: ${req.body.email}`);
    next();
  },
  userController.register,
);
router.post(
  "/login",
  (req, res, next) => {
    logger.info(`Received login request with email: ${req.body.email}`);
    next();
  },
  userController.login,
);


module.exports = router;
