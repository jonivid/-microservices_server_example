const winston = require("winston");
const path = require("path");
const fs = require("fs");

// Define the logs directory path
const logsDir = path.join(__dirname, "..", "logs");

// Create the logs directory if it does not exist
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Create a logger instance
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
  ),
  transports: [
    // Console transport
    new winston.transports.Console({
      level: "info", // Console will output all logs of level 'info' and below (info, warn, error)
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
    // Info file transport
    new winston.transports.File({
      filename: path.join(logsDir, "info.log"),
      level: "info", // This transport will output only 'info' level logs
    }),
    // Warn file transport
    new winston.transports.File({
      filename: path.join(logsDir, "warn.log"),
      level: "warn", // This transport will output 'warn' and 'error' level logs
    }),
    // Error file transport
    new winston.transports.File({
      filename: path.join(logsDir, "error.log"),
      level: "error", // This transport will output only 'error' level logs
    }),
  ],
});

module.exports = logger;
