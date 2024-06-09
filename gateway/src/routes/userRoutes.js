const express = require("express");
const axios = require("axios");
const logger = require("../tools/logger"); // Adjust path as needed
const router = express.Router();
const { authMiddleware, auth2FAMiddleware } = require("../middleware/auth");

// Route to register a new user
router.post("/register", async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.USER_SERVICE_URL}/users/register`,
      req.body,
    );
    logger.info(
      `Register success: User ${req.body.username} registered successfully.`,
    );
    res.status(response.status).send(response.data);
  } catch (error) {
    logger.error(
      `Register failed: ${error.message} with payload ${JSON.stringify(
        req.body,
      )}`,
    );
    res
      .status(error.response ? error.response.status : 500)
      .send(error.message);
  }
});

// Route to login
router.post("/login", async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.USER_SERVICE_URL}/users/login`,
      req.body,
    );
    logger.info(
      `Login success: User ${req.body.username} logged in successfully.`,
    );
    res.status(response.status).send(response.data);
  } catch (error) {
    logger.error(
      `Login failed: ${error.message} with payload ${JSON.stringify(req.body)}`,
    );
    res
      .status(error.response ? error.response.status : 500)
      .send(error.message);
  }
});

router.post("/setup_2fa", auth2FAMiddleware, async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.USER_SERVICE_URL}/users/setup_2fa`,
      req.body,
    );
    logger.info(`2FA setup have completed successfully`);
    res.status(response.status).send(response.data);
  } catch (error) {
    logger.error(
      `2FA setup failed: ${error.message} with payload ${JSON.stringify(
        req.body,
      )}`,
    );
    if (error.response) {
      // Forward the user service's response body if it exists
      res.status(error.response.status).send(error.response.data);
    } else {
      // General error message for other types of errors
      res
        .status(500)
        .send({ error: "Internal Server Error", message: error.message });
    }
  }
});
router.post("/verify_2fa", auth2FAMiddleware, async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.USER_SERVICE_URL}/users/verify_2fa`,
      req.body,
    );
    logger.info(
      `Login success: User ${req.body.username} logged in successfully.`,
    );
    res.status(response.status).send(response.data);
  } catch (error) {
    logger.error(
      `Login failed: ${error.message} with payload ${JSON.stringify(req.body)}`,
    );
    if (error.response) {
      // Forward the user service's response body if it exists
      res.status(error.response.status).send(error.response.data);
    } else {
      // General error message for other types of errors
      res
        .status(500)
        .send({ error: "Internal Server Error", message: error.message });
    }
  }
});

module.exports = router;
