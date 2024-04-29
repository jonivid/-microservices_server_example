require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const sequelize = require("./config/sequelize");
const User = require("./models/userModel");

sequelize
  .sync({ alter: true }) // Use { force: true } to drop tables first, which is not recommended in production
  .then(() => {
    console.log("Database and tables created!");
  });

const app = express();

app.use(express.json());
app.use("/users", userRoutes);

const PORT = process.env.USER_SERVICE_PORT || 3002;
app.listen(PORT, () => console.log(`User service running on port ${PORT}`));

module.exports = app;
