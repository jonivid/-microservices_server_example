const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const uuidv4 = require("uuid").v4;
require("dotenv").config();

// Load the gRPC service definition from the proto file
const packageDefinition = protoLoader.loadSync("./tools/user.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

// In-memory "database" for users
const users = {};

// Implements the CreateUser method
function createUser(call, callback) {
  const userId = uuidv4();
  const user = { id: userId, ...call.request };
  users[userId] = user;
  console.log(`Created user: ${userId}`);
  console.log({ user });
  callback(null, user);
}

// Implements the GetUser method
function getUser(call, callback) {
  const user = users[call.request.id];
  if (user) {
    console.log(`Retrieved user: ${call.request.id}`);
    callback(null, user);
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      details: "User not found",
    });
  }
}

// Main function to start the gRPC server
function main() {
  const server = new grpc.Server();
  server.addService(userProto.UserService.service, {
    CreateUser: createUser,
    GetUser: getUser,
  });

  // Specify the port explicitly in bindAsync
  server.bindAsync(
    `0.0.0.0:${process.env.USER_SERVICE_PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.error(`Server error: ${error.message}`);
        return;
      }
      // Removed server.start() as per the deprecation warning
      console.log(
        `USER SERVICE Server running on port ${process.env.USER_SERVICE_PORT}`,
      );
    },
  );
}

main();
