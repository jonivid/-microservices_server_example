const ErrorCodes = require("./errorCodes");
const logger = require("../tools/logger");

const errorMiddleware = (error, req, res, next) => {
  console.log("debug error",error);
  const errorCode = ErrorCodes[error.type] || ErrorCodes.INTERNAL_SERVER_ERROR;
  logger.error(
    `${errorCode.httpCode} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
  );

  res.status(errorCode.httpCode).send({
    error: true,
    statusCode: errorCode.httpCode,
    errorCode: errorCode.customCode || "GENERIC",
    message: error.message || errorCode.message,
  });
};

module.exports = { errorMiddleware };
