require("dotenv").config();
const express = require("express");
const cors = require("cors");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const logger = require("./tools/logger");
const db = require("./tools/mysql_connectotr");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.listen(process.env.GATEWAY_PORT, () =>
  logger.info(`The server is running port ${process.env.GATEWAY_PORT}`),
);
