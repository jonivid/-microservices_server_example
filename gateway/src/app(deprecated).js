require("dotenv").config();
const express = require("express");
const cors = require("cors");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const logger = require("../tools/logger");
const db = require("../tools/mysql_connector");
const app = express();
const PORT = 3000;
const packageDefinition = protoLoader.loadSync(
  "../user-service/tools/user.proto",
  {},
);
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

// Connect to the gRPC server on the correct port
const client = new userProto.UserService(
  "localhost:3001",
  grpc.credentials.createInsecure(),
);

app.use(cors());
app.use(express.json());

app.post("/user", (req, res) => {
  const { name, email, password } = req.body;

  client.CreateUser({ name, email, password }, (error, user) => {
    if (!error) {
      res.json(user);
    } else {
      console.error(`Error creating user: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  });
});

app.listen(process.env.GATEWAY_PORT, () =>
  logger.info(`The GATEWAY server is running port ${process.env.GATEWAY_PORT}`),
);
