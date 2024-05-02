require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || "default_username",
    password: process.env.DB_PASSWORD || "default_password",
    database: process.env.DB_NAME || "default_database",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: process.env.DB_USERNAME || "default_username",
    password: process.env.DB_PASSWORD || "default_password",
    database: process.env.DB_NAME || "default_database",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USERNAME || "default_username",
    password: process.env.DB_PASSWORD || "default_password",
    database: process.env.DB_NAME || "default_database",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Note: This option will skip SSL verification, consider a more secure setup in production
      },
    },
  },
};
