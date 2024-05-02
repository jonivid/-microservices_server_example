const express = require("express");
const axios = require("axios");
const logger = require("../tools/logger"); // Adjust path as needed
const router = express.Router();

// Route to register a new user
router.post("/register", async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.user_service_url}/users/register`,
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
      `${process.env.user_service_url}/users/login`,
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

module.exports = router;
