const ErrorCodes = {
  // Common HTTP error status codes
  BAD_REQUEST: {
    httpCode: 400,
    message: "Bad request. The request cannot be fulfilled due to bad syntax.",
  },
  UNAUTHORIZED: {
    httpCode: 401,
    message:
      "Unauthorized. Authentication is required and has failed or has not yet been provided.",
  },
  FORBIDDEN: {
    httpCode: 403,
    message:
      "Forbidden. The request was a valid request, but the server is refusing to respond to it.",
  },
  NOT_FOUND: {
    httpCode: 404,
    message:
      "Not found. The requested resource could not be found but may be available again in the future.",
  },
  METHOD_NOT_ALLOWED: {
    httpCode: 405,
    message:
      "Method Not Allowed. A request was made of a resource using a request method not supported by that resource.",
  },
  NOT_ACCEPTABLE: {
    httpCode: 406,
    message:
      "Not Acceptable. The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.",
  },
  CONFLICT: {
    httpCode: 409,
    message:
      "Conflict. The request could not be processed because of conflict in the request.",
  },
  INTERNAL_SERVER_ERROR: {
    httpCode: 500,
    message:
      "Internal Server Error. A generic error message, given when no more specific message is suitable.",
  },

  // Custom application-specific error codes
  USER_NOT_FOUND: {
    httpCode: 404,
    customCode: "USER_404",
    message: "User not found.",
  },
  INVALID_USER_INPUT: {
    httpCode: 400,
    customCode: "USER_400",
    message: "Invalid input provided by user.",
  },
  DATABASE_ERROR: {
    httpCode: 500,
    customCode: "DB_500",
    message: "Database operation failed.",
  },
  AUTHENTICATION_TIMEOUT: {
    httpCode: 401,
    customCode: "AUTH_408",
    message: "Authentication token has expired.",
  },
  PERMISSION_DENIED: {
    httpCode: 403,
    customCode: "PERM_403",
    message: "You do not have permission to perform this action.",
  },
};

module.exports = ErrorCodes;
