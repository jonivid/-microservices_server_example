require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/userRoutes");



const app = express();

app.use(express.json());
app.use("/users", userRoutes);

const PORT = process.env.USER_SERVICE_PORT || 3002;
app.listen(PORT, () => console.log(`User service running on port ${PORT}`));

module.exports = app;
