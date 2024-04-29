require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("./tools/logger");

const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message}`);
  res.status(err.status || 500).send(err.message);
});

// Use user routes
app.use("/users", userRoutes);

const PORT = process.env.GATEWAY_PORT || 3001;
app.listen(PORT, () => {
  logger.info(`Gateway running on port ${PORT}`);
});
module.exports = app;
